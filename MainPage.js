const baseUrl = "https://slikskabdata.azurewebsites.net/api/reading"
Vue.createApp({
    data() {
        //var image = yourString.substring(2, yourString.length-1);
        return {
            searchDay: 4,
            searchMonth: 4,
            searchYear: 2021,
            readings: [],
            filtered: []
        }
    },
    methods: {
        getReadings() {
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

        sendNotification() {
            alert(Notification.permission)
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            alert(Notification.permission)
            }

            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification("Hi there!");
            alert(Notification.permission)
            }

            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        setInterval(() => new Notification("Hi there!"), 1000);
                    }
                });
            }

            // At last, if the user has denied notifications, and you
            // want to be respectful there is no need to bother them any more.
        }
    },

    created: function () {
        this.getReadings()
        this.sendNotification();
        //this.interval = setInterval(() => this.sendNotification(), 5000);
    }
}).mount("#app")