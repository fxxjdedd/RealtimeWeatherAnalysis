var express = require('express');
var router = express.Router();
var redis   = require('redis');

const redisIp = '101.201.66.163';
const redisPort = '6379';
const redisListName = "weather";

const {promisify} = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get', async(request, response, next)=>{
   
    var client;
    var errCode = 0;
    try {
        response.writeHead(200, { "Content-Type": "application/json" });

        let index = parseInt( request.query.index );
        let num = parseInt( request.query.num );
    
        if (isNaN(index) || isNaN(num))
        {
           errCode = 1;
           throw "index or num args error";
        }

        client = redis.createClient(redisPort,redisIp);

        const lrangeAsync = promisify(client.lrange).bind(client);
        const selectAsync = promisify(client.select).bind(client);
 
        const error = await selectAsync("1");

        if(error != "OK")   
        {
            errCode = 2;
            throw error;
        }
        var queryRes = await lrangeAsync(redisListName,index,index + num -1); 

        if(!queryRes)
        {
            errCode = 3;
            throw "lrange err:"+queryRes;
        }

        var dataArray = [];

        for(var i in queryRes)
        {
            var dataString = queryRes[i];
            dataArray.push(JSON.parse(dataString));
        }
        
        response.end(JSON.stringify({
            code: errCode,
            message: "invoke ok!",
            data:dataArray
        }));

    }catch(e)
    {
        response.end(JSON.stringify({
            code: errCode,
            message: e.toString()
        }));
    }
    finally
    {
        // πÿ±’¡¥Ω”
        if(client)
            client.quit();
    }
    
   
});

module.exports = router;
