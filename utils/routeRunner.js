const express = require('express');
module.exports = (app,routes) =>{
    app.use(express.json())
    routes.forEach(route =>{
        if (route.type == "post"){
          app.post(route.route,(req,res) =>{
            route.run(req,res);
          })
        } else if (route.type == "get"){
          app.get(route.route,(req,res) =>{
            route.run(req,res);
          })
        } else if(route.type == "set"){
          app.set(route.route,(req,res) =>{
            route.run(req,res);
          })
        }
      })
}