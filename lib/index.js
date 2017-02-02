let readLine = require('readline')
let connect = require('./connect')
let DataClass = require('./data')
let data = new DataClass()
let defaultEventsClass = require('./defaults/events')
let defaultEvents = new defaultEventsClass(data)
let defaultOptions = require('./defaults/options')

startMonitoring()

function startMonitoring(userOptions, userEvents) {

    let myArgs = process.argv.slice(2);
    console.log('myArgs: ', myArgs);
    let startTime = Date.now()
    clear()
    let options = userOptions || defaultOptions
    if (!myArgs[0]) {
        options.host = 'test.mosquitto.org'
    }

    if (myArgs[0] === '1') {
        options.host = 'iot.eclipse.org'
    } else if (myArgs[0] === '2') {
        options.host = 'broker.hivemq.com'
    } else if (myArgs[0] === '3') {
        options.host = 'test.mosca.io'
    } else if (myArgs[0] === '4') {
        options.host = 'broker.mqttdashboard.com'
    }

    console.log(options.host)
    connect(options, {
        userEvents: userEvents,
        defaultEvents: defaultEvents
    })
    printInfo()
    setInterval(printInfo, 500)

    function printInfo() {
        clear()

        console.log('Server: ', options.host)
        console.log('Uptime: ', (Math.round(Math.ceil((Date.now() - startTime) / 1000)/60*100)/100), ' Minutes')
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
