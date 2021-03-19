const express = require('express');

module.exports = {
    name:"Test2",
    route:"/test2",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.response} res 
     */
    run: (req,res) =>{
        res.send("oi hihi")
    }
}
