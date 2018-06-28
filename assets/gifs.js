var apikey;
var hero;
var queryURL;
var heroImage;
var topics = ["Superman","Batman","Spider-Man","Thor","Ironman","Wonder Woman","Captain America","Green Lantern","Hulk","Aquaman","Cyborg","The Flash",];
var state;


function renderButtons() {

  for (var i = 0; i < topics.length; i++) { 
  var a = $("<button>");
  a.addClass("hero");
  a.attr("data-hero", topics[i]);
  a.text(topics[i]);
  $("#buttons").append(a);
  $(".hero").on("click", function() {
    console.log("hero")
      apikey = "88vunix81VzCUwqrja9EFkIwD3OhnJ4G";
        hero = $(this).attr("data-hero");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=" + apikey + "&limit=10";
        console.log(hero);
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
  
            for (var k = 0; k < results.length; k++) {
              var gifDiv = $("<div class='item'>");
  
              var rating = results[k].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              heroImage = $("<img>");
              heroImage.addClass("heroImage");
              heroImage.attr("src", results[k].images.fixed_height_still.url);
              heroImage.attr("data-state", "still");
              heroImage.attr("data-still", results[k].images.fixed_height_still.url);
              heroImage.attr("data-animate", results[k].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(heroImage);
  
              $("#gifs").prepend(gifDiv);
              
              $(".heroImage").on("click", function(){
              
              if ($(this).attr("data-state")== "still"){
               console.log("animate");
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              }
              else{
                console.log("still");
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            
            })
            }
            
       
          });
      });
}
}
renderButtons();

$("#add-hero").on("click", function(event) {
  event.preventDefault();
  var newHero = $("#hero-input").val();
  topics.push(newHero);
  $("#buttons").html("");
  renderButtons();
});


    

