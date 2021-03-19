const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../src/database/db')
module.exports = {
    name:"Register",
    route:"/api/register",
    type:"post",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.response} res 
     */
    run: async (req,res) =>{

        const body = req.body
       
        if (!body['name'] || !body['password']) {
           return res.status(400).send(JSON.stringify({
               code:"MISS_UP",
               resp:"Missing username or password."
           }))
        }
        const username = body['name'],
            password = body['password']
        if (username.length >= 30){
            return res.status(400).send(JSON.stringify({
                code:"NAME_ERR_TOO_BIG",
                resp:"The name is too big."
            }))
        }
        if (password.length <= 8){ 
            return res.status(400).send(JSON.stringify({
                code:"PASSWORD_ERR_TOO_SMALL",
                resp:"The password is too small."
            }))
        }
        const users = db.Client.db("APPI").collection("Users")
        const x = await users.findOne({
            name:username,
        })
        if (x){
            return res.status(400).send(JSON.stringify({
                code:"USER_EXISTS",
                resp:"This user exists."
            }))
        }
        const SafeCode =  Math.round(Math.random() * 99999999999999)
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                await users.insertOne({
                    name:username,
                    password: hash,
                    SafeCode: SafeCode,
                }).then(() =>{
                
                    return res.status(200).send(JSON.stringify({
                        code:"OK",
                        resp:"User has been registed.",
                        SafeCode:SafeCode
                    }));
                });
            });
        });
       
        
    }
}
