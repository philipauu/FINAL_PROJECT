var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27500/parking', {
    useMongoClient: true
});

var address = {
    buildingName : String,
    streetName: String,
    buildingNo: String,
    floor: Number,
    subDistrict: String,
    dcDistrict: String,
    region: String,
    contactNo: String
}

var address_schems = = new mongoose.Schema(address);

