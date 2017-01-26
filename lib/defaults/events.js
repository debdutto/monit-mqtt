class defaultEvents {

    constructor(data) {
        this.data = data
    }

    connect(client, topicsToSubscribe, connack) {
        console.log('Connected');
        this.subscribe(client, topicsToSubscribe)
    }

    subscribe(client, topicsToSubscribe) {
        client.subscribe(topicsToSubscribe, function() {
            console.log("Subscribed to ", topicsToSubscribe);
        })
    }

    message(client, topic, message, packet) {

        console.log('Message')
        this.data.incrementTotalMessages()
        this.data.addToRecentTopics(topic)
    }

    reconnect() {
        console.log('Reconnecting');
    }

    error(client, error) {
        console.log('Errored: ', error);
    }
}

module.exports = defaultEvents