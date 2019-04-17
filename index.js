const robots = {
    trendings: require('./robots/trendings.js'),
    tweets: require('./robots/tweets.js'),
    sentiments: require('./robots/sentiments.js')
}

async function start() {
    const start = new Date().getTime();

    await robots.trendings()
    await robots.tweets()
    await robots.sentiments()

    const end = new Date().getTime();

    console.log(`### finish on : ${end - start}ms`)
}

start()
