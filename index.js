const baseUrl = ""
Vue.createApp({
    data() {
        return {
        }
    },
    methods: {
        GoToMainPage(){
            window.location.href = "MainPage.html"
        }
    }

}).mount("#app")