import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('VoteAppAggregates')

def getItemByHashKey(hashKey,hashKeyValue):
        response = table.get_item(
            Key={
              hashKey:hashKeyValue
            }
        )
        item = response['Item']
        return item

def sendSuccessMessage(message):
    statusCode = 200
    response = {
        "statusCode": statusCode,
        "body": message,
        'headers': {
            "Content-Type": "application/json",
            "X-Requested-With": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
    }
    return response

def handler(event, context):
    print("Received event {}".format(json.dumps(event)))
    item = getItemByHashKey('VotedFor','ACCESS')
    print(item['Vote'])
    value = int(round(item['Vote']))
    return sendSuccessMessage(json.dumps({'vote': value}))
    