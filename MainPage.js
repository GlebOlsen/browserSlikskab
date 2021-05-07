const baseUrl = "https://slikskabdata.azurewebsites.net/api/reading"
Vue.createApp({
    data() {
        //var image = yourString.substring(2, yourString.length-1);
        return {
            searchText: "",
            readings: [{ sensorId: 2, time: 23, isOpen: false, image: "" }]
        }
    },
    methods: {
        getReadings() {
            axios.get(baseUrl).then(function (response) {
                for(reading of response["data"]){
                    var image = reading.image
                    if(image == null){
                        image = "";
                    }
                    image = image.substring(2,image.length-2)
                    reading.image = image
                    this.readings.push(reading)
                }
            }.bind(this))
        }
    },

    created: function () {
        this.getReadings()
    }
}).mount("#app")