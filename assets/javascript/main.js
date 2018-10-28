// This is an array of all available topics
var topics = ["cats", "startrek", "csgo", "rick and morty", "fortnite", "pubg"];

    // This loop iterates over the topics array and creates buttons for each
    for (i = 0; i < topics.length; i++){
        var gifButton = $("<button>")

        gifButton.attr("type", "button")
        gifButton.attr("class", "btn btn-dark generator")
        gifButton.text(topics[i])
        gifButton.attr("title", topics[i])
        $("#buttonWrapper").append(gifButton)
    } 
        
    
    
    // This is an event handler on all classes .btn that ajax calls the giphy api
    $(document).on("click", ".generator", function(){
        console.log($(this).attr("title"));
        var title = $(this).attr("title");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        title + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
              
              $("#gifWrapper").text("")
              // This for loop iterates over the 10 item response from the giphy api and prints all the images as stills
              for (var i = 0; i < results.length; i++) {
                var card = $("<div>");
                var cardBody = $("<div>");
                var cardTitle = $("<h5>");
                var cardText = $("<p>");


                console.log(results)
                var rating = results[i].rating;
      
                console.log(results[i].title)
                cardTitle.text(results[i].title)
                cardText.text("Rating: " + rating)
        

                card.addClass("card")
                card.attr("style", "width: 18rem;")
                cardBody.addClass("card-body")
                cardTitle.addClass("card-title")
                cardText.addClass("card-text")
                
                cardBody.append(cardTitle)
                cardBody.append(cardText)

                var rating = results[i].rating;
      
                var p = $("<p>").text("Rating: " + rating);
      
                var personImage = $("<img>");
                
                // This class is used to attach an event listener later in the code
                personImage.addClass("card-img-top");
                
                // The following attributes are used to switch between a still image and an animated gif
                personImage.attr("gifurl", results[i].images.fixed_height.url);
                personImage.attr("imgurl", results[i].images.fixed_height_still.url);
                personImage.attr("motion", "still");
               
                // This is the original still source img from giphy
                personImage.attr("src", results[i].images.fixed_height_still.url);

                
                card.append(personImage)
                card.append(cardBody)
      
                $("#gifWrapper").prepend(card);
              }
            });
    })


    // This event handler is attached to all img's and switches between an animated gif and a still image when clicked
    $(document).on("click", ".card-img-top", function(){
      if ($(this).attr("motion") === "still"){
        var gifurl = $(this).attr("gifurl");
        
        $(this).attr("motion", "moving");
        $(this).attr("src", gifurl);
      }

      else if ($(this).attr("motion") === "moving" ){
        var imgurl = $(this).attr("imgurl");

        $(this).attr("motion", "still");
        $(this).attr("src", imgurl);
      }

    });
    $("#submitButton").on("click", function(){
      
      var userInput = $("#userTopic").val().trim()
      topics.push(userInput)
      
      $("#buttonWrapper").text("")
      
      for (i = 0; i < topics.length; i++){
        var gifButton = $("<button>")

        gifButton.attr("type", "button")
        gifButton.attr("class", "btn btn-dark generator")
        gifButton.text(topics[i])
        gifButton.attr("title", topics[i])
        $("#buttonWrapper").append(gifButton)
    } 
    })