var express = require('express');
var router = express.Router();
var redis = require('redis');

const redisIp = '101.201.66.163';
const redisPort = '6379';
const redisListName = "weather";

const { promisify } = require('util');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/**
 * @author chengqian
 * @description 根据日期区间获取数据
 * @param {起始时间} startTime 
 * @param {结束时间} endTime
 * @returns 返回的数据集 
 */
var queryDataByRange = async (startTime, endTime) => {
    var redisClient;

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

        var count = await llenAsync("weather");

        if (isNaN(count) || count <= 0) {
            throw "count == 0";
        }

        var startIndex = 0;
        var endIndex = count - 1;
        var findIndex = -1;
        //使用插值查找
        while (1) {

            if (startIndex < endIndex) {
                break;
            }

            var startData = await lindexAsync("weather", startIndex);
            var endData = await lindexAsync("weather", endIndex);

            if (!startData || !endData)
                throw "startData==null || endData ==null";

            startData = JSON.parse(startData);
            endData = JSON.parse(endData);

            //let

        }


    } catch (error) {
        throw error;
    } finally {
        if (client)
            client.quit();
    }



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


var sendJson = async (response, code, message, data) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
        code: code,
        message: message,
        data: data
    }));
}


router.get('/get', async (request, response, next) => {

    var client;
    var errCode = 0;
    try {
        response.writeHead(200, { "Content-Type": "application/json" });

        let index = parseInt(request.query.index);
        let num = parseInt(request.query.num);

        if (isNaN(index) || isNaN(num)) {
            errCode = 1;
            throw "index or num args error";
        }

        client = redis.createClient(redisPort, redisIp);

        const lrangeAsync = promisify(client.lrange).bind(client);
        const selectAsync = promisify(client.select).bind(client);

        const error = await selectAsync("1");

        if (error != "OK") {
            errCode = 2;
            throw error;
        }
        var queryRes = await lrangeAsync(redisListName, index, index + num - 1);

        if (!queryRes) {
            errCode = 3;
            throw "lrange err:" + queryRes;
        }

        var dataArray = [];

        for (var i in queryRes) {
            var dataString = queryRes[i];
            dataArray.push(JSON.parse(dataString));
        }

        response.end(JSON.stringify({
            code: errCode,
            message: "invoke ok!",
            data: dataArray
        }));

    } catch (e) {
        response.end(JSON.stringify({
            code: errCode,
            message: e.toString()
        }));
    }
    finally {
        // 关闭链接
        if (client)
            client.quit();
    }


});

router.get('/query', async (request, response, next) => {
    //获取城市

    try {

        let city = request.query.city;

        if (!city) {
            city = "济南";
        }

        let startTime = request.query.startTime;
        let endTime = request.query.endTime;

        if (isNaN(startTime) || startTime < 0)
            startTime = 0;
        if (isNaN(endTime))
            endTime = new Date().getTime();

        sendJson(response, 0, "invoke ok!", await queryDataByRange(startTime, endTime));
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

module.exports = router;
