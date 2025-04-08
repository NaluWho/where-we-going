import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = "us-west-2"; 

const dynamo = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(dynamo);

const TABLES = {
    TRIPS: "Trips",
    USERS: "Users",
    DESTINATION_VOTES: "DestinationVotes",
    START_DATE_VOTES: "StartDateVotes",
    END_DATE_VOTES: "EndDateVotes",
    LODGING_VOTES: "LodgingVotes",
  };
  
export { dynamo, docClient, TABLES };