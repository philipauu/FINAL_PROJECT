var router = require('express').Router();
var ADDRESSCLASS = require('../../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);
router.get('/locations', do_locations);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('pages/index');
}

function do_locations(req, res) {
    console.log('doing locations');
    res.render('pages/locations');
}

//---------------------API-------------------------
router.get('/api/read', do_read);
router.post('/api/create', do_create);
router.put('/api/update', do_update);
router.delete('/api/delete/:_id', do_delete);
//-------------------------------------------------

function do_read(req, res) {
    console.log('getting all data');

    ADDRESSCLASS.find()
        .then(function (addresses) {
            console.log(addresses);
            res.json(addresses);
        })
}

function do_create(req, res) {
    console.log('creating address');
    console.log(req.body);

    if (req.body.name == '' || req.body.name == null) {
        res.json({
            error: 'no name of address'
        });
    }

    var data = {

        name: req.body.name,
        building: req.body.buildingName,
        street: req.body.streetName,
        number: req.body.buildingNo,
        floor: req.body.floor,
        area: req.body.subDistrict,
        district: req.body.dcDistrict,
        region: req.body.region,
        contact: req.body.contactNo,
        website: req.body.website,
        hours: req.body.openingHours,
        facilities: req.body.facilities,
        payment: req.body.paymentMethods
    }

    var address = new ADDRESSCLASS(data);
    user.save().then(function (result) {
        console.log(result);
        res.json({
            message: 'backend created address'
        });
    });
}

function do_update(req, res) {
    console.log('updating address');
    console.log(req.body);
    var update = {

        $set: {
            _id: req.body._id,
            name: req.body.name,
            building: req.body.buildingName,
            street: req.body.streetName,
            number: req.body.buildingNo,
            floor: req.body.floor,
            area: req.body.subDistrict,
            district: req.body.dcDistrict,
            region: req.body.region,
            contact: req.body.contactNo,
            website: req.body.website,
            hours: req.body.openingHours,
            facilities: req.body.facilities,
            payment: req.body.paymentMethods
        }
    };

    ADDRESSCLASS.findByIdAndUpdate(req.body._id, update)
        .then(function (result) {
            console.log('address updated');
            console.log(result);
            res.json({
                message: 'backend updated address'
            });
        });
}

function do_delete(req, res) {
    console.log('deleting address');
    console.log(req.params._id);

    ADDRESSCLASS.findByIdAndRemove(req.params._id)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend deleted address'
            });
        });
}



// module.exports = function (app, passport) {
//     console.log('loading routes');


//     // show the home page (will also have our login links)
//     app.get('/', function (req, res) {
//         res.render('pages/index.ejs');
//     });

//     // PROFILE SECTION =========================
//     app.get('/profile', isLoggedIn, function (req, res) {
//         res.render('pages/profile.ejs', {
//             user: req.user
//         });
//     });

//     // LOGOUT ==============================
//     app.get('/logout', function (req, res) {
//         req.logout();
//         res.redirect('/');
//     });

//     var local_routes = require('./local_routes');
//     local_routes(app, passport);

//     var fb_routes = require('./fb_routes');
//     fb_routes(app, passport);

//     var google_routes = require('./google_routes');
//     google_routes(app, passport);

// };

// // route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/');
// }