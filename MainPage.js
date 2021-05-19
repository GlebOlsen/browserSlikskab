const baseUrl = "https://slikskabdata.azurewebsites.net/api/reading"

Vue.createApp({
    data() {
        //var image = yourString.substring(2, yourString.length-1);
        return {
            searchDay: null,
            searchMonth: null,
            searchYear: null,
            readings: [],
            filtered: [],
            oldLength: -1,
            sensors: [],
            isShutDown: false,
            sensorNames: []
        }
    },
    methods: {
        getReadings() {
            if (!this.isShutDown) {

                this.oldLength = this.readings.length;
                this.readings = [];
                axios.get(baseUrl).then(function (response) {
                    for (reading of response["data"]) {
                        var image = reading.image
                        if (image == null) {
                            image = "";
                        }
                        image = image.substring(2, image.length - 2)
                        reading.image = image
                        this.readings.push(reading)
                        if (!this.sensors.includes(reading.sensorId)) {
                            this.sensors.push(reading.sensorId);
                            if(this.sensorNames[reading.sensorId] == undefined || this.sensorNames[reading.sensorId] == reading.sensorId-1){
                                this.sensorNames[reading.sensorId-1] = reading.sensorId
                            }
                        }
                    }

                    this.filtered = this.readings.slice();
                    if (this.readings.length > this.oldLength) {
                        this.sendNotification("New Readings Available")
                    }

                }.bind(this))
            }
        },

        getName(index){
            return this.sensorNames[index]
        },

        saveName(id){
            var name = document.getElementById("nameInput" + id).value;
            $cookies.set(id.toString(), name);
            this.sensorNames[id-1] = name
            this.updateNames()
        },

        updateNames(){
            pairs = document.cookie.split(";")
            for(p of pairs)
            {
                var pieces = p.split("=");
                var index = parseInt(pieces[0])
                var name = pieces[1]
                this.sensorNames[index-1] = name
            }
        },

        statusShutOff() {
            var x = document.getElementById("statusCheck");
            return x.innerHTML = "Systemet er slukket"
        },
        statusShutOn() {
            var x = document.getElementById("statusCheck");
            return x.innerHTML = "Systemet er tændt"
        },

        shutdown() {
            this.isShutDown = true;
        },
        turnmeon() {
            this.isShutDown = false;
        },
        reset() {
            this.filtered = this.readings.slice();
        },

        filter() {
            this.reset();
            this.filtered = this.filtered.filter((item) => {
                var time = new Date(item.time * 1000);
                return (
                    time.getDay() + 2 == this.searchDay &&
                    time.getMonth() + 1 == this.searchMonth &&
                    time.getFullYear() == this.searchYear
                )
            })
        },

        sendNotification(msg) {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            }

            else if (Notification.permission === "granted") {
                var notification = new Notification(msg);
            }

            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        var notification = new Notification(msg);
                    }
                });
            }
        },

        describeBool(value) {
            if (value == true) {
                return "Ja"
            }
            else {
                return "Nej"
            }
        },

        imageClickUnlock(id) {
            var element = document.getElementById(id)
            element.src = 'Images/unlocked.gif'


        },
        imageClickLock(id) {
            var element = document.getElementById(id)
            element.src = 'Images/locked.gif'
        }
    },


    created: function () {
        this.getReadings()
        this.updateNames()
        this.interval = setInterval(() => this.getReadings(), 10000);
    }
}).mount("#app")