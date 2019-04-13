const robots = {
    trendings: require('./robots/trendings.js'),
    tweets: require('./robots/tweets.js')
}

async function start() {
    await robots.trendings()
    await robots.tweets()
}

start()
