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

const COUNT_MAX_TWEETS = 5 

async function robot() {
	const content = state.load()

	await getTweetsOfAllTrending(content)

	state.save(content)

	console.log('>> tweets saved')

    async function getTweetsOfAllTrending(trends) {
		for (const trend of trends) {
			const dataTweets = await getTweetsByTrend(trend.query)

			trend.tweets = getOnlyTweetText(dataTweets.statuses)

        	console.log(`>>> tweets received of trend: ${trend.name}`)
		}
	}
	
	async function getTweetsByTrend(trend) {
		return new Promise((resolve, reject) => {
			client.get('search/tweets', { q: trend, count: COUNT_MAX_TWEETS }, function(error, data, response) {
				if (error) throw error
				
				resolve(data)
			})
		})
	}

	function getOnlyTweetText(tweets) {
		const arrText = []

		for (const tweet of tweets) {
			arrText.push(tweet.text)
		}

		return arrText
	}
}

module.exports = robot