const Twit = require('twit')

const twitterCredentials = require('../credentials/twitter.json')

const LIMIT_TRENDS = 3 // 0 = all trends downloaded

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

async function robot(state) {
	let content = await getTrendingTopicsTwitter()
	content = limitMaximumTrends(content)
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
				query : trend.query,
				url: trend.url
			}

			arrTrends.push(sanitizeTrend)
		}
		
		return arrTrends
	}

	function limitMaximumTrends(content) {
		return LIMIT_TRENDS 
			? content.slice(0, LIMIT_TRENDS) 
			: content
	}
}

module.exports = robot
