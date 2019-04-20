const state = require('./state.js')

const robots = {
    trendings: require('./robots/trendings.js'),
    tweets: require('./robots/tweets.js'),
    sentiments: require('./robots/sentiments.js'),
    share: require('./robots/share.js')
}

async function start() {
    const date = new Date()
    const start = date.getTime();

    // define name of content file
    const nameFile = `log_analyze_${date.toDateString()}_${date.toLocaleTimeString()}`.replace(/\s/g, "_")
    state.defineName(nameFile)

    await robots.trendings(state)
    await robots.tweets(state)
    await robots.sentiments(state)
    await robots.share(state)

    const end = new Date().getTime();

    console.log(`### finish on : ${end - start}ms`)
}

start()
