const express = require('express')
const redis = require("redis");
const { promisify } = require('util');

// const client = redis.createClient();
const client = redis.createClient("redis");
const getAsync = promisify(client.get).bind(client);

//Redis connection
client.on("error", function (err) {
    console.log("Error " + err);
});
client.set("mykey", "1", redis.print);

//Express Server
const port = 3000
const app = express()
app.get('/', (req, res) => doSomething(req, res))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Business
async function doSomething(req, res) {

    const myValue = await getAsync("mykey");
    const myNumber = Number(myValue);

    console.log("result:" + myValue);
    client.set("mykey", myNumber + 1, redis.print);

    res.send('myvalue is now: ' + myValue)
    return "foo";
}