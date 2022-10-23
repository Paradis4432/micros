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

app.get("/encontrar", (req, res) => {
    res.sendFile("./encontrar.html", { root: __dirname })
})

const FSDB = require("file-system-db");
const db = new FSDB("./db.json", false);

app.post("/register", (req, res) => {
    let nombre = (req.body.nombre).replaceAll(".", "=")
    let dni = (req.body.dni).replaceAll(".", "=")
    let tel = (req.body.tel).replaceAll(".", "=")
    let mpmail = (req.body.mpmail).replaceAll(".", "=")
    // add check for existing mail 
    db.set("registros." + mpmail, { "nombre": nombre, "dni": dni, "tel": tel })

    res.sendFile("./gracias.html", { root: __dirname })
})

app.post("/encontrar", (req, res) => {

    // get dni
    // search registros for any
    // if match : search pay in payments 
    // return dni , nombre, mpmail, amount payed,

    let dni = (req.body.dni).replaceAll(".", "=")
    var keys = Object.keys(db.get("registros"))
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if(g(key, "dni") == dni){
            res.send("se encontro dni registrado con mail: " + key.replaceAll("=", ".") + " nombre: " + g(key, "nombre") + " telefono: " + g(key, "tel") + " monto pagado: " + db.get("payments." + key))
            return
        }
    }
    res.send("no se encontro")
})

function g(key, a){
    return db.get("registros." + key + "." + a)
}
app.listen(80, () => console.log("server started in port 80"))