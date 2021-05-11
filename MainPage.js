const baseUrl = "https://slikskabdata.azurewebsites.net/api/reading"
Vue.createApp({
    data() {
        //var image = yourString.substring(2, yourString.length-1);
        return {
            searchDay: 4,
            searchMonth: 4,
            searchYear: 2021,
            readings: [],
            filtered: [],
            oldLength: -1
        }
    },
    methods: {
        getReadings() {
            this.oldLength = this.readings.length;
            alert(this.oldLength);
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
                }

                this.filtered = this.readings.slice();
                if(this.readings.length > this.oldLength){
                    alert("new")
                    this.sendNotification("New Readings Available")
                }
            }.bind(this))
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
        }
    },

    created: function () {
        this.getReadings()
        this.interval = setInterval(() => this.getReadings(), 10000);
    }
}).mount("#app")