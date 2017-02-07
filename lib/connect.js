'use strict'

let mqtt = require('mqtt')


function connectClient(opts, eventHandlers) {

    let client = mqtt.connect(opts)
    let events = prepareEventHandlers(eventHandlers)

    client.on('connect', function(connack) {
        events.connect.call(events, client, opts.topics, connack)
    })

    client.on('message', function(topic, message, packet) {
        events.message.call(events, client, topic, message, packet)
    })

    client.on('reconnect', function() {
        events.reconnect.call(events, client)
    })

    client.on('error', function(error) {
        events.error.call(events, client, error)
    })
}


function prepareEventHandlers(events) {
    if (!events.userEvents) {
        return events.defaultEvents
    } else {
        let eventHandlers = {
            connect: events.userEvents.connect || events.defaultEvents.connect,
            message: events.userEvents.message || events.defaultEvents.message,
            reconnect: events.userEvents.reconnect || events.defaultEvents.reconnect,
            error: events.userEvents.error || events.defaultEvents.error
        }
        return eventHandlers
    }
}

module.exports = connectClient
