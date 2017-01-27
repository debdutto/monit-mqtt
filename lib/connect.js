let mqtt = require('mqtt')
let defaultOpts = require('./defaults/options')

function connectClient(opts, eventHandlers) {

    if (!opts) {
        opts = defaultOpts
    } else if (!opts.topics) {
        opts.topics = defaultOpts.topics
    }

    let client = mqtt.connect(opts)

    if (!eventHandlers) {
        eventHandlers = defaultEventHandlers
    } else {
        eventHandlers.connect = eventHandlers.connect || defaultEventHandlers.connect
        eventHandlers.message = eventHandlers.message || defaultEventHandlers.message
        eventHandlers.reconnect = eventHandlers.reconnect || defaultEventHandlers.reconnect
        eventHandlers.error = eventHandlers.error || defaultEventHandlers.error
    }

    client.on('connect', function(connack) {
        eventHandlers.connect.call(eventHandlers, client, opts.topics, connack)
    })

    client.on('message', function(topic, message, packet) {
        eventHandlers.message.call(eventHandlers, client, topic, message, packet)
    })

    client.on('reconnect', function() {
        eventHandlers.reconnect.call(eventHandlers, client)
    })

    client.on('error', function(error) {
        eventHandlers.error.call(eventHandlers, client, error)
    })
}

module.exports = connectClient
