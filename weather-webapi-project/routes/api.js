var express = require('express');
var router = express.Router();
var redis = require('redis');
var moment = require('moment');

const ml = require("ml-regression");
const SLR = ml.SLR; // 线性回归
const redisIp = '101.201.66.163';
const redisPort = '6379';


const { promisify } = require('util');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * @author chengqian
 * @description 插值查找
 * @argument value 目标值
 * @argument isAllowRight 如果为true时，并且这个值在整个区间的右边的话，则返回0
 * @argument isAllowLeft  如果为true时，并且这个值在整个区间的左边的话，则返回区间最后一个Index
 * @argument lindexAsync  根据下标获取值的异步函数
 * @argument redisKeyName redis key name
 * @argument count 当前列表的count
 */
let insertValueSearch = async (value, isAllowRight, isAllowLeft, lindexAsync, redisKeyName, count) => {

    var startIndex = 0;
    var endIndex = count - 1;
    var findIndex = -1;
    let partition;
    try {

        //使用插值查找

        //前四次使用插值查找，后面使用二分
        let count = 4;

        while (1) {

            if (startIndex > endIndex) {
                
                break;
            }

            let startData = await lindexAsync(redisKeyName, startIndex);
            let endData = await lindexAsync(redisKeyName, endIndex);
            if (!startData || !endData)
                break;
``
            startData = JSON.parse(startData);
            endData = JSON.parse(endData);

            let dataStartTime = parseInt(startData.date);
            let dataEndTime = parseInt(endData.date);

            if (dataStartTime == dataEndTime) {
                if (dataStartTime != value)
                    break;
            }

            if (isAllowLeft && value < dataStartTime) {
                findIndex = 0;
                break;
            }
            if (isAllowRight && value > dataEndTime) {
                findIndex = count - 1;
                break;
            }
            isAllowLeft = false;
            isAllowRight = false;

            //let
            if(count >= 0)
                partition = startIndex + parseInt((value - dataStartTime) * (endIndex - startIndex + 1) / (dataEndTime - dataStartTime));
            else
                partition = startIndex + parseInt( (endIndex - startIndex)*.5 );

            if (partition > endIndex)
                partition = endIndex;
            
            let partitionJson = JSON.parse(await lindexAsync(redisKeyName, partition));
            let partitionValue = parseInt(partitionJson.date);

            if (value < partitionValue) {
                endIndex = partition - 1;
            } else if (value > partitionValue) {
                startIndex = partition + 1;
            }
            else {
                findIndex = partition;
                break;
            }
            --count;
        }
    } catch (error) {

    }

    return findIndex;
}

/**
 * @author chengqian
 * @description 根据日期区间获取数据
 * @param {起始时间} startTime 
 * @param {结束时间} endTime
 * @returns 返回的数据集 
 */
var queryDataByRange = async (startTime, endTime, keyName, interval) => {
    var redisClient;
    var ret = [];
    try {
        client = redis.createClient(redisPort, redisIp);

        const lrangeAsync = promisify(client.lrange).bind(client);
        const selectAsync = promisify(client.select).bind(client);
        const llenAsync = promisify(client.llen).bind(client);
        const lindexAsync = promisify(client.lindex).bind(client);
        var res = await selectAsync("1");

        if (res != "OK") {
            throw res;
        }

        var count = await llenAsync(keyName);

        if (isNaN(count) || count <= 0) {
            throw "count == 0";
        }
 
        var startIndex = await insertValueSearch(startTime, false, true, lindexAsync, keyName, count);
        if (startIndex == -1)
            throw "no find start in the range";
   
        var endIndex = await insertValueSearch(endTime, true, false, lindexAsync, keyName, count);
        if (endIndex == -1)
            throw "no find end in the range";

        if (isNaN(interval)) {
            ret = await lrangeAsync(keyName, startIndex, endIndex);
        }
        else {

            for (let i = startIndex; i <= endIndex; i += interval) {
                let singleRes = await lindexAsync(keyName, i);
                ret.push(singleRes);
            }
        }


    } catch (error) {
        throw error;
    } finally {
        if (client)
            client.quit();
    }
    return ret;
}

var queryCityList = async (startTime, endTime) => {
    var ret = [];

    var client;
    try {
        client = redis.createClient(redisPort, redisIp);
        const selectAsync = promisify(client.select).bind(client);
        const keysAsync = promisify(client.keys).bind(client);
        const error = await selectAsync("1");

        if (error != "OK") {
            throw error;
        }
        ret = await keysAsync("*");
    }
    catch (error) {
        throw error;
    }
    finally {
        if (client)
            client.quit();
        return ret;
    }

}

/**
 * 根据下标返回数据
 * @param {城市} city 
 * @param {下标，为负表示从后面开始} index 
 * @param {数量} num 
 * @returns 返回的数据集
 */
var queryByIndex = async (city, index, num) => {
    var client;
    var errCode = 0;
    var redisListName = city;
    var dataArray = [];
    try {
        client = redis.createClient(redisPort, redisIp);

        const lrangeAsync = promisify(client.lrange).bind(client);
        const selectAsync = promisify(client.select).bind(client);

        const error = await selectAsync("1");

        if (error != "OK") {
            errCode = 2;
            throw error;
        }
        var queryRes;
        if (index >= 0) {
            queryRes = await lrangeAsync(redisListName, index, index + num - 1);
        }
        else {
            queryRes = await lrangeAsync(redisListName, index - num + 1, index);
        }

        if (!queryRes) {
            throw "lrange err:" + queryRes;
        }
        
        for (var i in queryRes) {
            var dataString = queryRes[i];
            dataArray.push(JSON.parse(dataString));
        }
        return dataArray;
    } catch (error) {
       throw error;
    }
    finally {
        // 关闭链接
        if (client)
            client.quit();
    }
}

var sendJson = async (response, code, message, data) => {
    response.writeHead(200, {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    });

    response.end(JSON.stringify({
        code: code,
        message: message,
        data: data
    }));
}


router.get('/get', async (request, response, next) => {

    var errCode = 0;

    try {
        let index = parseInt(request.query.index);
        let num = parseInt(request.query.num);
        let city = request.query.city;
        if(!city)
            city = "济南";

        if (isNaN(index) || isNaN(num)) {
            errCode = 1;
            throw "index or num args error";
        }
        sendJson(response, 0, "invoke ok!", await queryByIndex(city, index, num));
    } catch (e) {
        sendJson(response, 1, e, null);
    }
});

router.get('/query', async (request, response, next) => {
    //获取城市

    try {

        let city = request.query.city;

        if (!city) {
            city = "济南";
        }

        let startTime = parseInt(request.query.startTime);
        let endTime = parseInt(request.query.endTime);
        let interval = parseInt(request.query.interval);


        if (isNaN(startTime) || startTime < 0)
            throw "startTime isNull";
        if (isNaN(endTime))
            throw "endTime isNull";

        var dataArray = [];
        let queryRes = await queryDataByRange(startTime, endTime, city, interval)
        for (var i in queryRes) {
            var dataString = queryRes[i];
            dataArray.push(JSON.parse(dataString));
        }
        sendJson(response, 0, "invoke ok!", dataArray);
    } catch (error) {
        sendJson(response, 1, error, null);
    }



});

router.get('/cityList', async (request, response, next) => {
    try {
        sendJson(response, 0, "invoke ok!", await queryCityList());
    } catch (error) {
        sendJson(response, 1, error, null);
    }
});

router.get("/predict", async (request, response, next) => {

    let city = request.query.city;
    if (!city)
        city = "济南";

    let recentData = await queryByIndex(city, -1, 30);
    try {
        if (!recentData || recentData.length <= 0) {
            sendJson(response, 1, "nulldata", null);
            return;
        }

        var x = [];
        for (let i = 1; i <= recentData.length; ++i) {
            x.push(i);
        }

        var dataObj = recentData[0];

        var predictData = {};
        predictData["city"] = city;

        var lastTime = recentData[recentData.length - 1].date;

        let tomorrow = moment(lastTime, "YYYYMMDD").add(1, "days").format("YYYYMMDD");

        predictData["date"] = tomorrow;

        for (let key in dataObj) {
            if (key == "city" || key == "date")
                continue;
            let ys = [];
            recentData.forEach((row) => {
                ys.push(parseFloat(row[key]));
            });

            let regressionModel = new SLR(x, ys);
            predictData[key] = regressionModel.predict(recentData.length + 1);
        }

        var retData = [predictData];
        sendJson(response, 0, "invoke ok!", retData);
    } catch (error) {
        sendJson(response, 2, error, null);
    }

});

module.exports = router;
