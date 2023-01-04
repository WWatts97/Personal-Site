//We will use the RAWG API to generate a tile for each video game returned in their data
//See docs at https://rawg.io/apidocs

//Create a function to consume the RAWG API and insert the
//games data into HTML elements in the gamesResults  <div>
$(function () {

    //The code below is an AJAX (Asynchronous JavaScript And XML) request.
    //In the request, we will specify where to make the request, the type
    //of request, and what to do if the request is successful.
    $.ajax({
        //Where to make the request:
        url: 'https://api.rawg.io/api/games?page_size=8&page=1&key=87c0eb62c1c746a3a212cdb582f0a38d',

        //Which type of request this is (GET - a.k.a. "Read" functionality)
        method: 'GET',

        //What to do if successful:
        success: function (data) {
            //log the results
            console.log(data);
            console.table(data.results);

            //Store the results in a variable
            var mtg = data.results;

            //Capture the gamesResults div
            var mtgResults = document.getElementById('mtgResults');

            //Use .map() to generate a tile for each game and insert it into the HTML element
            mtg.map(x => 
                mtgResults.innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-12 p-3">
                    <div class="image" style="background-image: url(${x.background_image}); background-size: cover;
                    background-position: center; position: relative;">
                        <div class="info">
                            <h3>${x.name}</h3>
                            <hr/>
                            <p>Genres: ${x.genres.map(genre => `${genre.name}`)}</p>
                            <p>Rating: ${x.rating}/${x.rating_top}</p>
                            <p>Release Date: ${x.released}</p>
                            <p>ESRB: ${x.esrb_rating.name}</p>
                        </div>
                    </div>
                </div>`  
            );

            //On mouseenter, toggle on the visible class for the info div
            $('.image').mouseenter(function () {
                $(this).children('.info').toggleClass('visible');
            });

            //On mouseleave, toggle off the visible class for the info div
            $('.image').mouseleave(function () {
                $(this).children('.info').toggleClass('visible');
            });
        }

    });

});