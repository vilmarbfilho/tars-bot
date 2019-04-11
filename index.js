const robots = {
    trendings: require('./robots/trendings.js')
}

async function start() {
    await robots.trendings()
}

start()
