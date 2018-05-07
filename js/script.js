//Adding functionality to the menu bar
$(".menu").on("click", function () {
    $(".dropdown-content").css("display", "block")
    $(".dropdown-content").on("mouseleave", function () {
        $(".dropdown-content").css("display", "none");
    })
});
//Green theme
$(".green").on("click", function () {
    $(".header").css("background-color", "green");
    $(".chatArea").css("background-color", "rgba(128, 128, 128, 0.4)");
})

$(".grey").on("click", function () {
    $(".header").css("background-color", "rgb(30, 30, 47)");
    $(".chatArea").css("background-color", "rgba(128, 128, 128, 0.7)");
})

$(".purple").on("click", function () {
    $(".header").css("background-color", "#31093b");
    $(".chatArea").css("background-color", "rgba(128, 128, 128, 0.8)");
})
//Activating the enter key to trigger send icon;
 $(".userText").keyup(function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        $(".sendIcon").click();
    }
 })


//API call
var api = "http://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "&appid=f19153986dcd0a4840ac3b7ab3f12a79";
var metric = "&units=metric";

var chatBox = $(".chatArea");
var regexp2 = /\b(in)\b/;

$(".sendIcon").on("click", function () {
    var userText = $(".userText").val();
    $(".userText").val("");
    if (userText != "" && regexp2.test(userText)) {
        var validInput = userText.slice(filterInput(userText), userText.length);
        chatBox.append("<div class='userMessage'>" + userText + "</div>");
        userText = validInput;
        displayResult(userText);
    } else if(userText != ""){
        chatBox.append("<div class='userMessage'>" + userText + "</div>");
        displayResult(userText);
    }


    function displayResult(text) {
        // chatBox.append("<div class='userMessage'>" + userText + "</div>");
        var url = api + userText + apiKey + metric;
        $.getJSON(url, function (data) {
            $(chatBox).append("<div class='botMessage'>" + "The temperature in " + userText + " is " + data.main.temp + " °C," + "<br>" + data.weather[0].description + " in " + userText);
        })
            .done(function () {
                $(chatBox).append("<div class='botMessage'>" + "I can also you give weather updates about other locations, just ask me");
            })
            .fail(function () {
                $(chatBox).append("<div class='botMessage'>" + "Something went wrong. Please check your connection or enter a valid question/location");
            })
            .always(function () {
                console.log("complete");

            });

        $(chatBox).append("<div class='botMessage'>" + "Please give me a moment")
    }

    function filterInput(rawtext) {
        var targetInput = rawtext.match(/\b(in)\b/)
        return targetInput.index += 3;
    }
});



