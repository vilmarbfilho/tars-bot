const Twitter = require('twitter');

const twitterCredentials = require('../credentials/twitter.json')

const WOEID_ID = '30' // Brasil

const client = new Twitter({
  consumer_key: twitterCredentials.consumer_key,
  consumer_secret: twitterCredentials.consumer_secret,
  access_token_key: twitterCredentials.access_token_key,
  access_token_secret: twitterCredentials.access_token_secret
});

const params = {screen_name: 'nodejs'}

async function robot() {

	async function getTrendingTopicsTwitter() {
		client.get(`trends/place.json?id=${WOEID_ID}`, params, (error, response) => {
			if(!error) {
				console.log(response)
			}
		})
	}

}

module.exports = robot
