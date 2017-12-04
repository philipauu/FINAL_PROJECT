module.exports = {

    'facebookAuth': {
        'clientID': '1468630653254648', // your App ID
        'clientSecret': 'd1f6830be2cfb0b814f73fe0a3cc3ca7', // your App Secret
        'callbackURL': 'http://localhost:3500/auth/facebook/callback',
        'profileFields': ["email", "displayName", "name", "photos"]
    },

    'googleAuth': {
        'clientID': '843045556936-rreh3n9vgmenkmlj0ev6l3624k7nldnd.apps.googleusercontent.com',
        'clientSecret': 'dMcsEqtS9pMB7ULfe_8PLNna',
        'callbackURL': 'http://localhost:3500/auth/google/callback'
    }
};