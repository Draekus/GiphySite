var topics = ["cats", "startrek", "csgo", "rick and morty", "fortnite", "pubg"];

    for (i = 0; i < topics.length; i++){
        var gifButton = $("<button>")

        gifButton.attr("type", "button")
        gifButton.attr("class", "btn btn-dark")
        gifButton.text(topics[i])
        gifButton.attr("title", topics[i])
        $("#buttonWrapper").append(gifButton)
    } 
        
    
    
    
    $(document).on("click", ".btn", function(){
        console.log($(this).attr("title"))
        var title = $(this).attr("title");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        title + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
      
              for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
      
                var rating = results[i].rating;
      
                var p = $("<p>").text("Rating: " + rating);
      
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
      
                gifDiv.prepend(p);
                gifDiv.prepend(personImage);
      
                $("#gifWrapper").prepend(gifDiv);
              }
            });
    })

$("button").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });