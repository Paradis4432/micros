const dotenv = require("dotenv")
var bodyParser = require('body-parser')

dotenv.config()

const express = require("express")
const nodemailer = require("nodemailer")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile("./home.html", { root: __dirname })
})

app.get("/encontrar", (req,res) => {
    res.sendFile("./encontrar.html", {root: __dirname})
})

const FSDB = require("file-system-db");
const db = new FSDB("./db.json", false); 

app.post("/register", (req, res) => {
    let nombre = req.body.nombre
    let dni = req.body.dni
    let mail = req.body.mail
    let mpmail = req.body.mpmail
    db.set(req.body.dni, {"nombre": nombre, "mail" : mail, "mpmail": mpmail})

    res.sendFile("./gracias.html",{ root: __dirname})
})

app.post("/encontrar", (req,res) => {
    if(db.has(req.body.dni)) res.send("se encontro con nombre: " + db.get(req.body.dni + ".nombre"))
    else req.send("no se encontro")
})

app.listen(80, () => console.log("server started in port 80"))