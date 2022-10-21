
const request = require('request');
const fs = require("fs")

var options = {
    url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&access_token=APP_USR-1818826746292191-101710-33ff8190051418b5967d8e7e0f4f0d63-321320472&status=approved&offset=0&limit=10',
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
        console.log(obj)
    }
}

request(options, callback);