const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const cryptoSchema = new mongoose.Schema({
  date: Date,
  data: Object
});
var Crypto = mongoose.model('Crypto', cryptoSchema);


const axios = require("axios");

const api = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,LTC,BNB,EOS,TRX,NEO,ADA,XRP&tsyms=EUR";
const key = process.env.KEY_API;

let request = api + key;
let dateNow = Date.now();

axios
  .get(request)
  .then((resp) => {
    console.log("Get crypto data successfull for " + dateNow);

    var cryptoDataToSave = new Crypto({
      date: dateNow,
      data: resp.data,
    });

    cryptoDataToSave.save(function (err, doc) {
      if (err) return console.error(err);
      else
        return console.log("Save crypto data successfully for " + Date.now());
    });
  })
  .catch(function (error) {
    console.log(error);
  });


