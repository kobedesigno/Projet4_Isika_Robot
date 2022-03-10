const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
  date: Date,
  data: Object
}
);

module.exports = mongoose.model("Crypto", cryptoSchema);