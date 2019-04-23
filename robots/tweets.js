const client = require('./client/twitter-client.js')

const COUNT_MAX_TWEETS = 10

async function robot(state) {
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
			client.get('search/tweets', { q: trend, count: COUNT_MAX_TWEETS, lang: 'pt' }, function(error, data, response) {
				if (error) throw error
				
				resolve(data)
			})
		})
	}

	function getOnlyTweetText(tweets) {
		const arrText = []

		for (const tweet of tweets) {
			const sanitized = {
				text : tweet.text
			}

			arrText.push(sanitized)
		}

		return arrText
	}
}

module.exports = robot