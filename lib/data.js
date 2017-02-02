let _recentTopics = Symbol()
let _totalConnections = Symbol()
let _totalMessages = Symbol()
let _topTopics = Symbol()

class Data {

    constructor() {
        this[_recentTopics] = []
        this[_totalConnections] = 0
        this[_totalMessages] = 0
        this[_topTopics] = {}
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
            if (this[_recentTopics].indexOf(topic) < 0) {
                this[_recentTopics].push(topic)
                if (this[_recentTopics].length > 10) {
                    this[_recentTopics].shift()
                }
            }
            this.addToTopTopics(topic)
        }
    }

    addToTopTopics(topic) {
        if (!this[_topTopics][topic]) {
            this[_topTopics][topic] = 1
        } else {
            this[_topTopics][topic]++
        }
    }

    set totalConnections(connections) {
        this[_totalConnections] = connections
    }

    get recentTopics() {
        return this[_recentTopics]
    }

    get topTopics() {
        if (Object.keys(this[_topTopics]).length <= 5) {
            return this[_topTopics]
        } else {
            let topTopicsObj = {}
            return this.findLargest(Object.assign({}, this[_topTopics]), topTopicsObj)
        }
    }

    findLargest(source, dest, count) {
        if (!count) {
            count = 1
        }

        let keys = Object.keys(source)
        let maxKey = keys[0]
        let maxNumber = source[maxKey]

        for (let iteration = 1; iteration < keys.length; iteration++) {
            if (source[keys[iteration]] > maxNumber) {
                maxNumber = source[keys[iteration]]
                maxKey = keys[iteration]
            }
        }
        dest[maxKey] = maxNumber
        source[maxKey] = undefined
        if (count > 4) {
            return dest
        } else {
            count++
            return this.findLargest(source, dest, count)
        }
    }

    get totalConnections() {
        return this[_totalConnections]
    }

    get totalMessages() {
        return this[_totalMessages]
    }
}

module.exports = Data
