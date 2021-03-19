const db = require('./src/database/ConnectDb.js')
const express = require('express')
const runner = require('./utils/routeRunner')
const app = express()
//Aqui onde tudo  se inicia.
//só to fznd em js pq n sei fzr site em go. k


async function Main(){
    console.clear()
    const  routes  =  await require("./utils/routeHandler")()
    //Aki carregar o arquivo .env
    const env = require('dotenv').config()
    //  console.log("Conecting to database ...");
    //  await db.connectDB();

    runner(app,routes);
    


    app.use(express.static('public'));
    app.listen(env.parsed.PORT, () => {
    console.log(`desafio academia saturno 00 running on port: ${env.parsed.PORT}`)
  })
}
Main();