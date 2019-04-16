const robots = {
    trendings: require('./robots/trendings.js'),
    tweets: require('./robots/tweets.js'),
    sentiments: require('./robots/sentiments.js')
}

async function start() {
    await robots.trendings()
    await robots.tweets()
    await robots.sentiments()
}

start()
