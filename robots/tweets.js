const Twit = require('twit')
const state = require('./state.js')

const twitterCredentials = require('../credentials/twitter.json')

const client = new Twit({
	consumer_key: twitterCredentials.consumer_key,
	consumer_secret: twitterCredentials.consumer_secret,
	access_token: twitterCredentials.access_key,
	access_token_secret: twitterCredentials.access_token_secret,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true
});

const COUNT_MAX_TWEETS = 10 

async function robot() {

    async function getTweetsByTrending(trending) {
        client.get('search/tweets', { q: trending, count: COUNT_MAX_TWEETS }, function(error, data, response) {
			if (error) throw error
			
			console.log('tweets received!')
		})
    }
}

module.exports = robot