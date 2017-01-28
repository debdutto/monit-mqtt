let _recentTopics = Symbol()
let _totalConnections = Symbol()
let _totalMessages = Symbol()

class Data {

    constructor() {
        this[_recentTopics] = []
        this[_totalConnections] = 0
        this[_totalMessages] = 0
    }

    incrementTotalConnections(increment) {
        this[_totalConnections]++
    }

    decrementTotalConnections(decrement) {
        this[_totalConnections]--
    }

    incrementTotalMessages(increment) {
        this[_totalMessages]++
    }

    addToRecentTopics(topic) {
        if (topic) {
        	if(this[_recentTopics].indexOf(topic) < 0) {
	            this[_recentTopics].push(topic)
	            if(this[_recentTopics].length > 10) {
	            	this[_recentTopics].shift()
	            }
	        }
        }
    }

    set totalConnections(connections) {
    	this[_totalConnections] = connections
    }

    get recentTopics() {
        return this[_recentTopics]
    }

    get totalConnections() {
        return this[_totalConnections]
    }

    get totalMessages() {
        return this[_totalMessages]
    }
}

module.exports = Data