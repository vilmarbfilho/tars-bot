const client = require('./client/twitter-client.js')

async function robot(state) {
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