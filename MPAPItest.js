
const request = require('request');
const fs = require("fs")
const FSDB = require("file-system-db");
const db = new FSDB("./db.json", false);

var options = {
    url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&access_token=APP_USR-1818826746292191-101710-33ff8190051418b5967d8e7e0f4f0d63-321320472&status=approved&offset=0&limit=60',
    headers: { 'accept': 'application/json' }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        fs.readdir("./payments", (err, files) => {
            let FLS = (files.length).toString()
            fs.writeFile("./payments/payment" + FLS + ".txt", body, (err) => {
                if (err) throw err
            })
        })

        const obj = JSON.parse(body)
        for (let i = 0; i < obj["results"].length; i++) {
            if(obj["results"][i].payer === undefined) continue
            if(obj["results"][i].payer.email === undefined) continue
            let mpmail = obj["results"][i].payer.email
            let amount = obj["results"][i].transaction_amount

            console.log(obj["results"][i].payer.email)
            console.log(obj["results"][i].transaction_amount)
            db.set("payments." + mpmail.replaceAll(".", "="), Math.round(amount))
        }
    }
}

function del(){
    db.deleteAll()
}

function a(){
    let data = db.all()
    for(let i = 0; i < data.length; i++){
        console.log("--")
        console.log(data[i]["data"])
        var key = Object.keys(data[i]["data"])
        console.log(key)
    }
}
del()
request(options, callback);
