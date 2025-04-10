const { dynamoClient } = require('../db');
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const {
            creatorID,
            title,
            pollCloseDateTime,
            locationOptions,
            startDateOptions,
            endDateOptions,
            lodgingOptions
          } = body;

    // Validate required fields
    if (!creatorID || !title || !pollCloseDateTime) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing required fields." }),
        };
    }
    
    const tripID = uuidv4(); // Unique identifier for the trip

    const newTrip = {
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

    await dynamoClient.put({
        TableName: 'Trips',
        Item: newTrip,
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({ tripID }),
    };

    } catch (error) {
        console.error("Error creating trip:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." }),
        };
    }
};