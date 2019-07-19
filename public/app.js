$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {

     $("#articles").append(
      "<div class='col-sm-4' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' href='" + data[i].link +"'><h5>" + data[i].title + "</h5></a><hr><p class='card-text'>" + data[i].snippet + "</p><button data-id='" + data[i]._id + "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#myModal' style='margin-right:10px;'>Note</button><button id='btn-save' data-id='" + data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>"
    );
}

  console.log(data);
});


// On click Fetch button
$(document).on("click", ".btn-fetch", function() {
  alert('Articles up-to-date!');

  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .done(function(data) {
      location.reload();
    });
});

// On click Note button
$(document).on("click", ".btn-note", function() {
  
  $(".modal-title").empty();
  $(".input").empty();

  // Save the id  - .btn-note
  var saveId = $(this).attr("data-id");
  console.log(saveId);

  $.ajax({
    method: "GET",
    url: "/articles/" + saveId
  })
    // Adding information to the page
    .done(function(data) {
      console.log(data);

      $(".modal-title").append("<h5>" + data.title + "</h5>");
      $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
      $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");

  
      if (data.note) {
        $("#bodyinput").val(data.note.body);
      }
    });
});

// On click Save Note button
$(document).on("click", "#savenote", function() {

  var saveId = $(this).attr("data-id");
  console.log(saveId);


  $.ajax({
    method: "POST",
    url: "/articles/" + saveId,
    data: {

      body: $("#bodyinput").val()
    }
  })
  
    .done(function(data) {

      console.log(data);

    });

  $("#bodyinput").val("");
});

// On click Save Article button
$(document).on("click", "#btn-save", function() {
  $(this).addClass("disabled");
  var saveId = $(this).attr("data-id");
  console.log(saveId);

  $.ajax({
    method: "PUT",
    url: "/saved/" + saveId,
   
  })
  
  .done(function(data) {
      console.log(data);
  });
});
