
$(document).ready(function () {
    $("#search").on("click", function (event) {
        $(".output").empty();
        event.preventDefault();
        var searchInput = $("#input").val().trim();
        if (searchInput === "") {
            return;
        }
        var queryURL = "https://api.seatgeek.com/2/events?geoip=true&performers.slug&q=" + searchInput + "&client_id=MTEwMzI0MzR8MTUyMjMzNDkxMy42MQ";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var response = response.events;

            for (var i = 0; i < response.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("col-md-12");

                var name = response[i].title;
                var address = response[i].venue.address;
                var city = response[i].venue.extended_address;
                var country = response[i].venue.country;
                var time = response[i].datetime_local;
                var aPrice = response[i].stats.average_price;
                var hPrice = response[i].stats.highest_price;
                var lPrice = response[i].stats.lowest_price;
                var url = response[i].url;


                var img = response[i].performers[0].images.huge;

                var title = $("<h2>").text(name);
                var addresS = $("<h4>").text(address + " " + city);
                var timE = $("<h4>").text(time);
                var avPrice = $("<h4>").text("Average price: $" + aPrice.toFixed(2));
                var hiPrice = $("<h4>").text("Highest price: $" + hPrice);
                var loPrice = $("<h4>").text("Lowest price: $" + lPrice);
                var tickets = $("<a>");

                newDiv.attr("id", "infoBox");
                tickets.attr("href", url);
                
                tickets.text("Buy Ticket");
                
                var showEvents = $("<button>");

                showEvents.append(tickets);

                showEvents.attr("id", "showEvents");
                
                var image = $("<img>");

                image.attr("src", img);

                newDiv.append(title, addresS, timE, avPrice, hiPrice, loPrice, showEvents, image);
                $(".output").append(newDiv);
            }
            
        });
      
    });
    // $('#myModal').on('shown.bs.modal', function () {
    //     $('#myInput').trigger('focus')
    //   })
    
    // }
});