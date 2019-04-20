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

async function robot() {
	const content = state.load()
	const date = new Date()

	await shareTweet(`That's the analyze sentiments about the ${content.length}o trends in ${date.toDateString()} ${date.toLocaleTimeString()}`)
	await shareAnalyzeAllTrends(content)

	async function shareAnalyzeAllTrends(trends) {
		for (let trendIndex = 0; trendIndex < trends.length; trendIndex++) {
			const trend = trends[trendIndex]
			const position = trendIndex + 1

			const tweet = `
				[${position}o Trend]
				${trend.name}	

				[Tweets feelings] 
				${trend.sentiment}
				
				[More] 
				${trend.url}
			`
			await shareTweet(tweet)
		}
	}

	async function shareTweet(tweet) {
		return new Promise((resolve, reject) => {
			client.post('statuses/update', { status: tweet }, function(err, data, response) {
				if (err) {
					reject(err)
				}

				console.log("tweet shared")

				resolve()
			})
		})
	}
}

module.exports = robot