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
                for(reading of response["data"]){
                    var image = reading.image
                    if(image == null){
                        image = "";
                    }
                    image = image.substring(2,image.length-2)
                    reading.image = image
                    this.readings.push(reading)
                }

                this.filtered = this.readings.slice();
            }.bind(this))
        },

        reset(){
            this.filtered = this.readings.slice();
        },

        filter(){
            this.reset();
            this.filtered = this.filtered.filter((item) => {
                var time = new Date(item.time*1000);
                return (
                    time.getDay()+2 == this.searchDay &&
                    time.getMonth()+1 == this.searchMonth &&
                    time.getFullYear() == this.searchYear
                )
            })
        }
    },

    created: function () {
        this.getReadings()
    }
}).mount("#app")