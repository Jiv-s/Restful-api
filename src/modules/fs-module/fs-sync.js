import fs from 'node:fs'

//write file sync
fs.writeFileSync("text.txt","hello fs system")

//readfile async
const data = fs.readFileSync("text.txt","utf-8")
console.log(data)

//append file
fs.appendFileSync("text.txt","\nBye Bye")

//make dir
fs.mkdirSync("testfolder/t1")

// delete file and folder
fs.unlinkSync('text.txt')
fs.rmSync("testfolder",{recursive:true})

//rename
fs.renameSync('text.txt',test.txt)

//copy
fs.cpSync("test.txt","final.txt")