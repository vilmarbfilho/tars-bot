const client = require('./client/twitter-client.js')

const LIMIT_TRENDS = 3 // 0 = all trends downloaded

// Brasil
const params = {
	id: '23424768'
}

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
