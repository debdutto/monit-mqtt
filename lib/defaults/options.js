module.exports = {
    port: 1883,
    // host: 'broker.hivemq.com',
    // host: 'test.mosquitto.org',
    host: 'iot.eclipse.org',
    // host: '127.0.0.1',
    clean: true,
    clientId: 'defaultClient',
    topics: {
    	'\$SYS/broker/clients/connected': 1,
    	'#': 1
    }
}