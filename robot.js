const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
  date: Date,
  data: Object
});
var CryptoSchema = mongoose.model('crypto', cryptoSchema);

const cron = require("node-cron");
const axios = require("axios");
//const { CryptoModel } = require("../models/cryptoModel");

const api = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,LTC,BNB,EOS,TRX,NEO,ADA,XRP&tsyms=EUR";
const key = "process.env.KEY_API";


// var mongoose = require('mongoose');
const uri = "process.env.DATABASE_URL";
try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));
} catch (error) { 
    console.log("could not connect");    
}

let i = 0;
console.log("hello");
cron.schedule("*/2 * * * *", function () {
    console.log("Hello, running job API Request ! count : " + ++i);
  
      let request = api + key;
      let dateNow = Date.now();
  
      axios
        .get(request)
        .then((resp) => {
          console.log("Get crypto data successfull for " + dateNow);
  
          var cryptoData = new CryptoSchema({
            date: dateNow,
            data: resp.data,
          });
  
          cryptoData.save(function (err, doc) {
            if (err) return console.error(err);
            else
              return console.log("Save crypto data successfully for " + Date.now());
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  });

// "0 */1 * * *"