const fs = require("fs")


fs.readdir("./", (err, files) => {
    console.log(files.length)
    let FLS = (files.length).toString()
    fs.writeFile("test"+FLS+".txt", (files.length).toString(), (err) => {
        if(err) throw err
    })
})