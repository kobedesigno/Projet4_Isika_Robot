const axios = require("axios");

const api = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,LTC,BNB,EOS,TRX,NEO,ADA,XRP,BCH&tsyms=EUR";
const key = process.env.KEY_API;

let request = api + key;
let dateNow = Date.now();

axios
  .get(request)
  .then((resp) => {
        console.log("Get crypto data successfull for " + dateNow);
				let respValue = resp.data;
        //console.log(respValue);
					//refresh database values:
					let newRaw = respValue.RAW;
					//console.log("newRaw="+JSON.stringify(newRaw));
					for(cryptoKey in newRaw){
						//console.log(cryptoKey);
						let crypto = { name : cryptoKey};
            let objetCryptoAPI = newRaw[cryptoKey];
            //console.log(JSON.stringify(objetCryptoAPI));
            let objetCryptoAPICurrency = objetCryptoAPI["EUR"];
            //console.log(JSON.stringify(objetCryptoAPICurrency));
            //console.log(JSON.stringify(objetCryptoAPICurrency["TYPE"]))
						switch(cryptoKey){
							case "BTC" : crypto.name = "Bitcoin"; break;
							case "ETH" : crypto.name = "Etherum"; break;
							case "BNB" : crypto.name = "Binance_Coin"; break;
							case "LTC" : crypto.name = "Litecoin"; break;
							case "EOS" : crypto.name = "Eos"; break;
							case "TRX" : crypto.name = "Tron"; break;
							case "NEO" : crypto.name = "Neo_Etherum_Chinois"; break;
							case "ADA" : crypto.name = "Cardano"; break;
							case "XRP" : crypto.name = "XRP"; break;
							case "BCH" : crypto.name = "Bitcoin_Cash"; break;
							default : devise = null;
						}
            // le currency est toujours le même avec cette requête API
            let currency = 'EUR';

            var cryptoDataToSave = new Crypto({
              date: dateNow,
              cryptoName : cryptoKey,
              cryptoCurrency : currency,

              type : objetCryptoAPICurrency["TYPE"],
              market : objetCryptoAPICurrency["MARKET"],
              fromSymbol: objetCryptoAPICurrency["FROMSYMBOL"],
              toSymbol : objetCryptoAPICurrency["TOSYMBOL"],
              flags : objetCryptoAPICurrency["FLAGS"],
              price : objetCryptoAPICurrency["PRICE"],
              lastUpdatde : objetCryptoAPICurrency["LASTUPDATE"],
              median : objetCryptoAPICurrency["MEDIAN"],
              lastVolume: objetCryptoAPICurrency["LASTVOLUME"],
              lastVolumeto : objetCryptoAPICurrency["LASTVOLUMETO"],
              lastTradedid : objetCryptoAPICurrency["LASTTRADEID"],
              volumeDay : objetCryptoAPICurrency["VOLUMEDAY"],
              volumeDayTo : objetCryptoAPICurrency["VOLUMEDAYTO"],
              volume24Hour : objetCryptoAPICurrency["VOLUME24HOUR"],
              volume24HourTo : objetCryptoAPICurrency["VOLUME24HOURTO"],
              openDay : objetCryptoAPICurrency["OPENDAY"],
              highDay : objetCryptoAPICurrency["HIGHDAY"],
              lowDay : objetCryptoAPICurrency["LOWDAY"],
              open24Hour : objetCryptoAPICurrency["OPEN24HOUR"],
              high24Hour : objetCryptoAPICurrency["HIGH24HOUR"],
              low24Hour : objetCryptoAPICurrency["LOW24HOUR"],
              lastMarket : objetCryptoAPICurrency["LASTMARKET"],
              volumeHour: objetCryptoAPICurrency["VOLUMEHOUR"],
              volumeHourTo : objetCryptoAPICurrency["VOLUMEHOURTO"],
              openHour : objetCryptoAPICurrency["OPENHOUR"],
              highHour : objetCryptoAPICurrency["HIGHHOUR"],
              lowHour : objetCryptoAPICurrency["LOWHOUR"],
              topTierVolume24Hour : objetCryptoAPICurrency["TOPTIERVOLUME24HOUR"],
              topTierVolume24HourTo : objetCryptoAPICurrency["TOPTIERVOLUME24HOURTO"],
              change24Hour : objetCryptoAPICurrency["CHANGE24HOUR"],
              change24PCT24Hour : objetCryptoAPICurrency["CHANGEPCT24HOUR"],
              changeDay : objetCryptoAPICurrency["CHANGEDAY"],
              changePCTDay : objetCryptoAPICurrency["CHANGEPCTDAY"],
              changeHour : objetCryptoAPICurrency["CHANGEHOUR"],
              changePCTHour : objetCryptoAPICurrency["CHANGEPCTHOUR"],
              conversionType : objetCryptoAPICurrency["CONVERSIONTYPE"],
              conversionSymbol : objetCryptoAPICurrency["CONVERSIONSYMBOL"],
              supply : objetCryptoAPICurrency["SUPPLY"],
              MKTCAP : objetCryptoAPICurrency["MKTCAP"],
              MKTCAPPenalty : objetCryptoAPICurrency["MKTCAPPENALTY"],
              circulationSupply : objetCryptoAPICurrency["CIRCULATINGSUPPLY"],
              circulationSupplyMKTCAP : objetCryptoAPICurrency["CIRCULATINGSUPPLYMKTCAP"],
              totalVolume24H : objetCryptoAPICurrency["TOTALVOLUME24H"],
              totalVolume24HTo : objetCryptoAPICurrency["TOTALVOLUME24HTO"],
              totalToptierVolume24H: objetCryptoAPICurrency["TOTALTOPTIERVOLUME24H"],
              totalToptierVolume24HTo : objetCryptoAPICurrency["TOTALTOPTIERVOLUME24HTO"],
              imageUrl : objetCryptoAPICurrency["IMAGEURL"]
            });
            //console.log(JSON.stringify(cryptoDataToSave));
            cryptoDataToSave.save(function (err, doc) {
              if (err) return console.error(err);
              else
                return console.log("Save crypto data successfully for " + Date.now());
            });
      }
  })
  .catch(function (error) {
    console.log(error);
  });
