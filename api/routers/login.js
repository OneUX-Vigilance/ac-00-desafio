const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../src/database/db')
module.exports = {
    name:"Login",
    route:"/api/login",
    type:"post",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.response} res 
     */
    run: async (req,res) =>{
        const body = req.body;
        const username = body['name'];
        const password = body['password']
        if (!username || !password){
            return res.status(400).send(JSON.stringify({
                code:"MISS_UP",
                resp:"Missing username or password."
            }))
        }           
        const userdb = await db.Client.db("APPI").collection("Users")
        const account = await userdb.findOne({
            name:username
        });
       
        if (!account){
            return res.status(400).send(JSON.stringify({
                code:"USER_404",
                resp:"USER not found."
            }))
        }
        const pw = account.password;
        bcrypt.compare(password, pw, function(err, result) {
            if (err){
                return res.status(503).send(err);
            }
            if (!result){
                return res.status(401).send(JSON.stringify({
                    code:"PWD_ERR",
                    resp:"password don't match"
                }))
            } else{
                return res.status(200).send(JSON.stringify({
                    code:"OK",
                    resp:account.SafeCode
                }))
            }
        });
  
    }
}
