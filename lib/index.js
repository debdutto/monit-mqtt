let readLine = require('readline')
let connect = require('./connect')
let DataClass = require('./data')
let data = new DataClass()
let defaultEventsClass = require('./defaults/events')
let defaultEvents = new defaultEventsClass(data)
let defaultOptions = require('./defaults/options')

// startMonitoring()

function startMonitoring(userOptions, userEvents) {

    let startTime = Date.now()

    let options = {}
    if (userOptions.isCustom) {
    	console.log('Custom')
        options = userOptions
    } else {
        options.port = userOptions.port || defaultOptions.port
        options.host = userOptions.host || defaultOptions.host
        options.clean = userOptions.clean || defaultOptions.clean
        options.clientId = userOptions.clientId || defaultOptions.clientId
        options.topics = userOptions.topics || defaultOptions.topics
    }

    connect(options, {
        userEvents: userEvents,
        defaultEvents: defaultEvents
    })
    printInfo()
    setInterval(printInfo, userOptions.interval || 1000)

    function printInfo() {
        if (data.isConnected) {
            clear()
        }

        console.log('Server: ', options.host)
        console.log('Status: ', data.isConnected ? 'Connected' : 'Not Connected')
        console.log('Uptime: ', (Math.round(Math.ceil((Date.now() - startTime) / 1000) / 60 * 100) / 100), ' Minutes')
        console.log('Total Messages: ', data.totalMessages)
        console.log('Total Connections: ', data.totalConnections)
        console.log('Recent Topics: \n', data.recentTopics)
        console.log('Top Topics: \n', data.topTopics)
    }
}

function clear(clear) {
    if (clear !== false) {
        process.stdout.write('\033[2J');
    }
    process.stdout.write('\033[0f');
}

module.exports = startMonitoring
