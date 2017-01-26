let options = {
    port: 1884,
    host: '127.0.0.1',
    clientId: 'monitor',
    username: '81155427',
    clean: true,
    password: password,
    topics: {
        '$SYS/+/new/clients': 1,
        "#": 1
    }
}

function subscribe(client, topicsToSubscribe) {
    client.subscribe(topicsToSubscribe, function() {
        console.log("Subscribed to ", topicsToSubscribe);
    })
}

function message(client, topic, message, packet) {
    console.log('Message', message.toString())
    if (JSON.parse(message.toString()).isForMonitor) {
        this.data.incrementTotalMessages()
        this.data.addToRecentTopics(topic)
    }
}

let connect = require('./connect')
let DataClass = require('./data')
let data = new DataClass()
let defaultEventsClass = require('./defaults/events')
let defaultEvents = new defaultEventsClass(data)

startMonitoring()

function startMonitoring() {
    console.log("startMonitoring")
    defaultEvents.subscribe = subscribe
    defaultEvents.message = message
    connect(options, defaultEvents)
    setInterval(function() {
        console.log(data.totalMessages, data.recentTopics)
    }, 1000)
}
