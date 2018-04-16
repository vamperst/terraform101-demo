console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {

    var totalAcess = 0;

    event.Records.forEach(function(record) {

        console.log(record.dynamodb['NewImage'])
        var votedForHash = record.dynamodb['NewImage']['VotedFor']['S'];
        var numVotes = record.dynamodb['NewImage']['Votes']['N'];

        // Determine the color on which to add the vote
        if (votedForHash.indexOf("ACCESS") > -1) {
            votedFor = "ACCESS";
            totalAcess += parseInt(numVotes);
        } else {
            console.log("Invalid vote: ", votedForHash);
        }
    });

    // Update the aggregation table with the total of RED, GREEN, and BLUE
    // votes received from this series of updates

    var aggregatesTable = 'VoteAppAggregates';
    if (totalAcess > 0) updateAggregateForColor("ACCESS", totalAcess);
    console.log('Updating Aggregates Table', totalAcess);

    function updateAggregateForColor(votedFor, numVotes) {
        console.log("Updating Aggregate Color ", votedFor);
        console.log("For NumVotes: ", numVotes);

        dynamodb.updateItem({
            'TableName': aggregatesTable,
            'Key': { 'VotedFor' : { 'S': votedFor }},
            'UpdateExpression': 'add #vote :x',
            'ExpressionAttributeNames': {'#vote' : 'Vote'},
            'ExpressionAttributeValues': { ':x' : { "N" : numVotes.toString() } }
        }, function(err, data) {
            if (err) {
                console.log(err);
                context.fail("Error updating Aggregates table: ", err)
            } else {
                console.log("Vote received for %s", votedFor);
                context.succeed("Successfully processed " + event.Records.length + " records.");
            }
        });
    }
};
