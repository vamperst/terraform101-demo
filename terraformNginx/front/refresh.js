
AWS.config.update({
  "region": "us-east-1"
});

$(function() {
  /* Get the data every 3 seconds */
  setInterval(count, 3000);
});

function count() {
  $(function () {
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: "api-to-refresh-access",
      dataType: 'json',
      success: function(responseData, textStatus, jqXHR) {
        var count = document.getElementById("count");
        count.value = responseData['vote']
       },
       error: function (responseData, textStatus, errorThrown) {
         console.log(responseData)
         console.log(textStatus)
       }
    });
  });
 }

 $(function () {
   $.ajax({
     type: "POST",
     crossDomain: true,
     url: "<api-to-send-acess>",
     data: '{"Body": "ACCESS"}',
     dataType: 'json',
     success: function(responseData, textStatus, jqXHR) {
       console.log(responseData);
       console.log(textStatus);
      },
      error: function (responseData, textStatus, errorThrown) {
        console.log(responseData)
        console.log(textStatus)
      }
   });
 });