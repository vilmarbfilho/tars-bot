const client = require('./client/twitter-client.js')

async function robot(state) {
	const content = state.load()
	const date = new Date()

	await shareTweet(`Essa é a análise de sentimentos dos ${content.length}o trends em ${date.toDateString()} ${date.toLocaleTimeString()}`)
	await shareAnalyzeAllTrends(content)

	async function shareAnalyzeAllTrends(trends) {
		for (let trendIndex = 0; trendIndex < trends.length; trendIndex++) {
			const trend = trends[trendIndex]
			const position = trendIndex + 1

			const tweet = `
				[${position}a Posição]
				${trend.name}	

				[Sentimento nos Tweets] 
				${trend.sentiment}
				
				[Mais] 
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