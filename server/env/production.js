/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "TWITTER": {
        "consumerKey": process.env.TWITTER_CONSUMER_KEY,
        "consumerSecret": process.env.TWITTER_CONSUMER_SECRET,
        "callbackUrl": process.env.TWITTER_CALLBACK
    },
    // "FACEBOOK": {
    //     "clientID": process.env.FACEBOOK_APP_ID,
    //     "clientSecret": process.env.FACEBOOK_CLIENT_SECRET,
    //     "callbackURL": process.env.FACEBOOK_CALLBACK_URL
    // },
    // "GOOGLE": {
    //     "clientID": process.env.GOOGLE_CLIENT_ID,
    //     "clientSecret": process.env.GOOGLE_CLIENT_SECRET,
    //     "callbackURL": process.env.CALLBACK_URL
    // }
    "FACEBOOK": {
      "clientID": "1665535007027020",
      "clientSecret": "cc5840d92026656fccaf5b656de19adb",
      "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
    },
    "GOOGLE": {
      "clientID": "43115196891-hk2oio696aov7o5d39p9sv8ftec7sgec.apps.googleusercontent.com",
      "clientSecret": "nG85XkIDrSApHUeFDT1U9kY2",
      "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
    },
    "MANDRILL": {
      "key": "2Ro09IFqZGQ4zXfrAeC0Gw"
    }
};