let readLine = require('readline')
let connect = require('./connect')
let DataClass = require('./data')
let data = new DataClass()
let defaultEventsClass = require('./defaults/events')
let defaultEvents = new defaultEventsClass(data)
let defaultOptions = require('./defaults/options')

startMonitoring()

function startMonitoring(userOptions, userEvents) {
	clear()
	let options = userOptions || defaultOptions
    connect(options, {
    	userEvents: userEvents,
        defaultEvents: defaultEvents
    })
    setInterval(function() {
    	// clear()
        console.log('Total Messages: ', data.totalMessages)
        console.log('Total Connections: ', data.totalConnections)
        console.log('Recent Topics: ', data.recentTopics)
    }, 500)
}

function clear(clear) {
  if (clear !== false) {
    process.stdout.write('\033[2J');
  }
  process.stdout.write('\033[0f');
}