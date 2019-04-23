const Twit = require('twit')

const twitterCredentials = require('../../credentials/twitter.json')

const twitterClient = new Twit({
	consumer_key: twitterCredentials.consumer_key,
	consumer_secret: twitterCredentials.consumer_secret,
	access_token: twitterCredentials.access_key,
	access_token_secret: twitterCredentials.access_token_secret,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true
});

module.exports = twitterClient