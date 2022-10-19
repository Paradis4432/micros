const dotenv = require("dotenv")
dotenv.config()

const express = require("express")

const app = express()

app.get("/end1", (req,res,next) => {
    res.status(200).json({
        success: true,
        data: {
            message: "hello world!"
        }
    })
})
app.get("/end2", (req,res,next) => {
    res.status(200).json({
        success: true,
        data: {
            message: "hello world from endpoint 2!"
        }
    })
})

const PORT = process.nextTick.PORT || 5001;
app.listen(PORT, () => console.log("server started in port " + PORT))