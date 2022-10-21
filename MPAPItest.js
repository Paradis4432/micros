
const request = require('request');

var options = {
    url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&access_token=APP_USR-1818826746292191-101710-33ff8190051418b5967d8e7e0f4f0d63-321320472&status=approved&offset=0&limit=10',
    headers: {'accept': 'application/json'}
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);