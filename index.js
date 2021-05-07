const baseUrl = ""
Vue.createApp({
    data() {
        return {
        }
    },
    methods: {
        GoToMainPage(){
            window.location.href = "MainPage.html"
        },
         Validate(){
            var username = document.getElementById("name").value;
            var password = document.getElementById("pass").value;
            if ( username == "admin" && password == "1234"){
            window.location = "MainPage.html"; // Redirecting to other page.
            return false;
            }
            else{
                //alert("login failed");
                }
            }
    }

}).mount("#app")