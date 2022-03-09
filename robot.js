const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
  date: Date,
  data: Object
});
var CryptoSchema = mongoose.model('cryptoModel', cryptoSchema);

const cron = require("node-cron");
const axios = require("axios");
//const { CryptoModel } = require("../models/cryptoModel");

const api = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,LTC,BNB,EOS,TRX,NEO,ADA,XRP&tsyms=EUR";
const key = "&api_key=643badbf338390bc81ebcac550fa40768eade020515eadbbd13569c250e28b25";

// Import all cities locations
//const { tabCity } = require("../city-potision/location");

// var mongoose = require('mongoose');
const uri = "mongodb+srv://admin:123456AA@cluster0.nib1l.mongodb.net/test?authSource=admin&replicaSet=atlas-137cah-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
} catch (error) { 
    console.log("could not connect");    
}

let i = 0;
cron.schedule("0 */1 * * *", function () {
    console.log("Hello, running job API Request ! count : " + ++i);
  
      //Creating Get request for data API by location
      let request = api + key;
      let dateNow = Date.now();
  
      // Start Get Request and Save  in mongo
      axios
        .get(request)
        .then((resp) => {
          console.log("Get crypto data successfull for " + dateNow);
  
          // Data treatment model
          var cryptoData = new CryptoSchema({
            date: dateNow,
            data: resp.data,
          });
  
          // Save air treated data
          cryptoData.save(function (err, doc) {
            if (err) return console.error(err);
            else
              return console.log("Save crypto data successfully for " + Date.now());
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    // Drop old data in collection
    cryptoModel.collection.drop();
  });

