
AWS.config.update({
  "region": "us-east-1"
});

var dynamodb = new AWS.DynamoDB();

$(function() {
  /* Get the data every 3 seconds */
  setInterval(count, 3000);
});

function count() {
  var count = document.getElementById("count");
  var countAux = count.value
  count.value = parseInt(countAux) + 1
  // $(function () {
  //   $.ajax({
  //     type: "POST",
  //     crossDomain: true,
  //     url: "<api_para_fazer_o_count>",
  //     data: '{"Body": "1"}',
  //     dataType: 'json',
  //     success: function(responseData, textStatus, jqXHR) {
  //       var count = document.getElementById("count");
  //       count.value = responseData
  //      },
  //      error: function (responseData, textStatus, errorThrown) {
  //        console.log(responseData)
  //        console.log(textStatus)
  //      }
  //   });
  // });
 }

 $(function () {
   $.ajax({
     type: "POST",
     crossDomain: true,
     url: "<api_para_fazer_o_count>",
     data: '{"Body": "1"}',
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

/* Makes a scan of the DynamoDB table to set a data object for the chart */
function getData() {
  dynamodb.scan(params, function(err, data) {
    if (err) {
      console.log(err);
      return null;
    } else {

    }
  });
}
