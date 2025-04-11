import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { docClient, TABLES } from "../db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// TripInput is what client sends
interface TripInput {
    creatorID: string;
    title: string;
    pollCloseDateTime: string;
    locationOptions?: string[];
    startDateOptions?: string[];
    endDateOptions?: string[];
    lodgingOptions?: string[];
}

// TripItem is what we send to DynamoDB
interface TripItem {
    TripID: string;
    CreatedAt: string;
    CreatorID: string;
    Title: string;
    PollCloseDateTime: string;
    LocationOptions?: string[];
    StartDateOptions?: string[];
    EndDateOptions?: string[];
    LodgingOptions?: string[];
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let body: TripInput;
    try {
        body = JSON.parse(event.body || "{}");
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid JSON format." }),
        };
    }

    try {
        const {
            creatorID,
            title,
            pollCloseDateTime,
            locationOptions,
            startDateOptions,
            endDateOptions,
            lodgingOptions,
        } = body;

        // Check if required fields are present
        if (!creatorID || !title || !pollCloseDateTime) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields." }),
            };
        }

        // Create a new TripItem object to save to DynamoDB
        const tripID = uuidv4();
        const newTrip: TripItem = {
            TripID: tripID,
            CreatorID: creatorID,
            CreatedAt: new Date().toISOString(),
            Title: title,
            LocationOptions: locationOptions,
            StartDateOptions: startDateOptions,
            EndDateOptions: endDateOptions,
            LodgingOptions: lodgingOptions,
            PollCloseDateTime: pollCloseDateTime,
        };

        // Set up parameters for DynamoDB PutCommand
        const putParams = {
            TableName: TABLES.TRIPS,
            Item: newTrip,
        };

        await docClient.send(new PutCommand(putParams));

        // Return a success response if everything went well
        return {
            statusCode: 201,
            body: JSON.stringify({ tripID }),
        };
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "object") {
            try {
                errorMessage = JSON.stringify(error);
            } catch {
                errorMessage = "Unserializable error object";
            }
        } else {
            errorMessage = String(error);
        }
    
        console.error("Error creating trip:", errorMessage);
    
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." }),
        };
    }
    
};