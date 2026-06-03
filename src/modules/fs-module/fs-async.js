import { error } from "node:console"
import fs from "node:fs"

//write file async
fs.writeFile("text.txt","hello fs async system",(error)=>{
    if(error) console.log(error)
    console.log("file written successuflly")
})

//readfile async
fs.readFile("text.txt","utf-8",(error,data)=>{
    if(error) {console.log(error)}
    console.log("read:",data)
})
// console.log(data)

//note with all async we need to give a cb function

//promises are used to avoid callback hells 

//import fs from "node:fs/promises"
//data = await fs.readFile("text.txt",utf-8)
//c.log(data)