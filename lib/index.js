let connect = require('./connect')
let DataClass = require('./data')
let data = new DataClass()
let defaultEventsClass = require('./defaults/events')
let defaultEvents = new defaultEventsClass(data)

startMonitoring()

function startMonitoring(options, params) {
    console.log("startMonitoring")

    let params = {
    	events: params.events || defaultEvents
    }

    connect(options, params)
    setInterval(function() {
    	process.stdout.clearLine()
        console.log(data.totalMessages, data.recentTopics)
    }, 1000)
}
