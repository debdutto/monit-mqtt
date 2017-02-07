#!/usr/bin/env node

var path = require('path')
var argv = require('minimist')(process.argv.slice(2), {
    string: ['options', 'events', 'host', 'port', 'clean', 'clientid', 'topics', 'qos', 'interval'],
    alias: {
        options: ['opts', 'opt', 'o'],
        events: ['evts', 'evt', 'e'],
        host: ['h'],
        port: ['p'],
        clean: ['cln', 'c'],
        clientid: ['clid', 'id', 'i'],
        topics: ['t', 'topic'],
        qos: ['q'],
        interval: ['int', 'i']
    },
    unknown: () => {
        return false
    }
})

var startMonitoring = require('./lib')

parseArguments()

function parseArguments() {
    let options
    let events

    console.log(argv)
    if (argv.options) {
        argv.options = path.resolve(argv.options)
        options = require(argv.options)
        options.isCustom = true
    } else {
        options = {}
        options.isCustom = false
        if (argv.host) {
            options.host = argv.host
        }

        if (argv.port) {
            options.port = argv.port
        }

        if (argv.clean) {
            options.clean = argv.clean
        }

        if (argv.clientid) {
            options.clientId = argv.clientid
        }

        try {
            argv.qos = parseInt(argv.qos)
        } catch (e) {
            console.log('Invalid QOS Value')
        }

        if (isNaN(argv.qos) || !(argv.qos || (argv.qos >= 0 && argv.qos <= 2))) {
            options.qos = 1
        } else {
            options.qos = argv.qos
        }

        if (argv.topics) {
            if (typeof argv.topics === typeof '') {
                options.topics = {}
                argv.topics = [argv.topics]
                createTopicsObject(options, argv)
            } else if (argv.topics.length && typeof argv.topics === typeof []) {
                options.topics = {}
                createTopicsObject(options, argv)
            } else {
                console.log('Invalid topic passed, using defaults')
            }
        }

        if (argv.interval) {
            try {
                options.interval = parseInt(argv.interval)
            } catch (e) {
                console.log('Invalid Interval Passed')
            }
        }
    }
    if (argv.events) {
        argv.events = path.resolve(argv.events)
        events = require(argv.events)
    }


    console.log(options)

    startMonitoring(options, events)

    function createTopicsObject(options, argv) {
        for (let iteration = 0; iteration < argv.topics.length; iteration++) {
            options.topics[argv.topics[iteration]] = argv.qos
        }
    }
}
