# monit-mqtt

Powered by: <img src="https://raw.githubusercontent.com/mqttjs/MQTT.js/137ee0e3940c1f01049a30248c70f24dc6e6f829/MQTT.js.png" width="50" alt="mqttjs">

## Installation: 

It is preferred you install it globally

```
npm install -g monit-mqtt
```

## Command line options:

Note: All values being passed here indicate defaults.

##### Options
> `--options | --opts | --opt | -o`

###### Usage:
```
monit-mqtt --options options.json
```

All options parameters accepted by MQTT.js are accepted here. For more details head [here](https://github.com/mqttjs/MQTT.js#client).

Note: If option is passed, all other command line options are disregarded. All missing but required options are replaced by defaults of [MQTT.js](https://github.com/mqttjs/MQTT.js)


##### Example
```
{
    "port": 1883,
    "host": "test.mosquitto.org",
    "clean": false,
    "clientId": "defaultClient",
    "topics": {
        "$SYS/broker/clients/connected": 1,
        "/#": 1
    }
}
```

##### Host
> `--host | -h`

###### Usage:
```
monit-mqtt --host test.mosquitto.org
```
##### Port
> `--port | -p`

###### Usage:
```
monit-mqtt --port 1883
```
##### Clean
> `--clean | --cln | -c`

###### Usage:
```
monit-mqtt --clean true
```
##### ClientId
> `--clientid | --clid | --id`

###### Usage:
```
monit-mqtt --clientid testClient
```
##### Topics
> `--topics | --topic | -t`

###### Usage:
```
monit-mqtt --topic '$SYS/broker/clients/connected' --topic '/#'
```
##### QOS
> `--qos | -q`

###### Usage:
```
monit-mqtt --qos 1
```
##### Log Interval
> `--interval | -i`

Interval in seconds after which stats should be logged.

###### Usage:
```
monit-mqtt --interval 1000
```


###### To Do

* [ ] Support ES5
* [ ] Add ability to pass custom event handlers
* [ ] Add ability to store stats
* [ ] Add ability to web interface plugin

Feedback, suggestions and everything else is always welcome. Email me at debduttoc@gmail.com