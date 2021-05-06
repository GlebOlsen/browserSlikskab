const baseUrl = "https://slikskabdata.azurewebsites.net/api/reading"
Vue.createApp({
    data() {
        return {
            searchText: "",
            readings: [{ sensorId: 2, time: 23, isOpen: false, image: "" }]
        }
    },
    methods: {
        getReadings() {
            axios.get(baseUrl).then(function (response) {
                this.readings = response["data"];
            }.bind(this))
        }
    },

    created: function () {
        this.getReadings()
    }
}).mount("#app")