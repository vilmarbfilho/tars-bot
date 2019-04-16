const Twit = require('twit')
const state = require('./state.js')

const twitterCredentials = require('../credentials/twitter.json')

// Brasil
const params = {
	id: '23424768'
}

const client = new Twit({
	consumer_key: twitterCredentials.consumer_key,
	consumer_secret: twitterCredentials.consumer_secret,
	access_token: twitterCredentials.access_key,
	access_token_secret: twitterCredentials.access_token_secret,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true
});

async function robot() {
	const content = await getTrendingTopicsTwitter()
	state.save(content)

	console.log('>> trendings topics saved')

	async function getTrendingTopicsTwitter() {
		return new Promise((resolve, reject) => {
			client.get('trends/place', params, function(error, data, response) {
				if (error) throw error
				
				const content = data[0]
				const sanitized = sanitizeTrends(content.trends)
			
				resolve(sanitized)
			})
		})
	}

	function sanitizeTrends(trends) {
		const arrTrends = []

		for (trend of trends) {
			const sanitizeTrend = {
				name : trend.name,
				query : trend.query
			}

			arrTrends.push(sanitizeTrend)
		}
		
		return arrTrends
	}
}

module.exports = robot
