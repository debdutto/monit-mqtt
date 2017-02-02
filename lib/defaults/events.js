class defaultEvents {

    constructor(data) {
        this.data = data
    }

    connect(client, topicsToSubscribe, connack) {
        console.log('Connected')
        this.subscribe(client, topicsToSubscribe)
    }

    subscribe(client, topicsToSubscribe) {
        client.subscribe(topicsToSubscribe, function() {
            console.log("Subscribed to ", topicsToSubscribe);
        })
    }

    message(client, topic, message, packet) {
        if(!(/\$SYS/.test(topic))) {
            this.data.incrementTotalMessages()
            this.data.addToRecentTopics(topic)
        } else {
            if(/\$SYS\/broker\/clients\/connected/.test(topic)) {
                try {
                    this.data.totalConnections = parseInt(message.toString())
                } catch(e) {
                    console.error('Bad data from broker')
                }
            }
        }
    }

    reconnect() {
        console.log('Reconnecting');
    }

    error(client, error) {
        console.log('Errored: ', error);
    }
}

module.exports = defaultEvents