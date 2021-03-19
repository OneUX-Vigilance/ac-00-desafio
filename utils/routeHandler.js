const fs = require('fs')

let rs = []

module.exports =  async ()  => {
    //aqui vai ler ler os arquivos na pasta api/routes
     const files = await  fs.readdirSync("./api/routers")
     files.forEach(file =>{
        const route = require(`../api/routers/${file}`)
        console.log(`Has loaded ${route.name} route.`)      
       
        rs.push(route)
     })
    
    return rs
}