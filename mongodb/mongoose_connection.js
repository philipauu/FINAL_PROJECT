var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27500/parking', {
    useMongoClient: true
});

var address = {
    name: String,
    buildingName : String,
    streetName: String,
    buildingNo: String,
    floor: Number,
    subDistrict: String,
    dcDistrict: String,
    region: String,
    contactNo: String,
    website: String,
    openingHours: String,
    facilities: String,
    paymentMethods: String,
}

var address_schema = new mongoose.Schema(address);

var ADDRESSCLASS = mongoose.model('address', address_schema);

module.exports = ADDRESSCLASS; 
