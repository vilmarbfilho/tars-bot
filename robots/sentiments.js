const watsonApiKey = require('../credentials/watson-nlu.json').apikey
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js')

const emojiStrip = require('emoji-strip')

const state = require('./state.js')

const nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    version: '2018-04-05',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
 })

async function robot() {
    const content = state.load()

    await analyzeSentimentsOfAllTreads(content)

    state.save(content)

    console.log('>> Analyze of sentiments finish and saved')

    async function analyzeSentimentsOfAllTreads(trends) {
        for (const trend of trends) {
            console.log(`>>> Analyze sentiments of: ${trend.name}`)
            await analyzeSentimentsOfAllTweets(trend.tweets)
        }
    }

    async function analyzeSentimentsOfAllTweets(tweets) {
        for (const tweet of tweets) {
            const sanitizedText = emojiStrip(tweet.text)
            try {
                tweet.sentiment = await analyzeSentence(sanitizedText)
            } catch (err) {
                console.log(`#### Error on analyze of tweet: ${sanitizedText}`)
            }
        }
    }

    async function analyzeSentence(sentence) {
        return new Promise((resolve, reject) => {
            nlu.analyze({
                text: sentence,
                features: {
                    sentiment: {}
                }
            }, (error, response) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(response.sentiment.document)
                }
            })
        })
    }
}

module.exports = robot