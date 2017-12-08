var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27500/parking', {
    useMongoClient: true
});

var address = {
    displayAddress: String,
    district: String,
    contactNo: String,
    website: String,
    facilities: String,
    paymentMethods: String,
}

var address_schema = new mongoose.Schema(address);

var ADDRESSCLASS = mongoose.model('address', address_schema);

module.exports = ADDRESSCLASS;