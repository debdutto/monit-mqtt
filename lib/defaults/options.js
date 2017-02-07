module.exports = {
    port: 1883,
    host: 'test.mosquitto.org',
    clean: false,
    clientId: 'defaultClient',
    topics: {
    	'\$SYS/broker/clients/connected': 1,
    	'/#': 1
    }
}