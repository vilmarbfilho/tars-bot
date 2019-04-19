const robots = {
    state: require('./robots/state.js'),
    trendings: require('./robots/trendings.js'),
    tweets: require('./robots/tweets.js'),
    sentiments: require('./robots/sentiments.js'),
    share: require('./robots/share.js')
}

async function start() {
    const date = new Date()
    const start = date.getTime();
    
    //console.log(`${date.toDateString()} ${date.toLocaleTimeString()}`)
    await robots.trendings()
    await robots.tweets()
    await robots.sentiments()
    await robots.share()

    const end = new Date().getTime();

    console.log(`### finish on : ${end - start}ms`)
}

start()
