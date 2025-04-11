import { handler } from "../src/handlers/createTrip";
import { docClient } from "../src/db";

describe('createTrip Handler', () => {
    let sendSpy: jest.Mock<Promise<void>>;

    beforeEach(() => {
        // Manually mock the send method of docClient to return a resolved promise
        sendSpy = jest.fn().mockResolvedValue(Promise.resolve());
        (docClient as any).send = sendSpy;
    });
    
    afterEach(() => {
        sendSpy.mockRestore();
    });

    it('should return 201 when the trip is created successfully', async () => {
        // Mock the event object (simulating a POST request)
        const event = {
            body: JSON.stringify({
                creatorID: 'user-1',
                title: 'Summer Break 2025',
                pollCloseDateTime: '2025-05-31',
                locationOptions: ['Hawaii', 'Japan'],
                startDateOptions: ['2025-06-01', '2025-06-02'],
                endDateOptions: ['2025-06-15', '2025-06-16'],
                lodgingOptions: ['Hotel', 'Airbnb'],
            }),
        };

        const result = await handler(event as any);

        expect(result.statusCode).toBe(201);
        expect(result.body).toContain('tripID');
        expect(sendSpy).toHaveBeenCalledTimes(1);

        // Extract the actual input from the send spy call
        const sendCall = sendSpy.mock.calls[0][0];
        
        // Check if send was called with the correct parameters
        const expectedInput = {
            TableName: 'Trips',
            Item: expect.objectContaining({
                CreatorID: 'user-1',
                Title: 'Summer Break 2025',
                PollCloseDateTime: '2025-05-31',
            }),
        };
    
        expect(sendCall.input).toEqual(expect.objectContaining(expectedInput));
    });

    it('should return 400 if required fields are missing', async () => {
        const event = {
            body: JSON.stringify({
                CreatorID: 'user-1',
                Title: 'Summer Break 2025',
            }),
        };

        const result = await handler(event as any);

        expect(result.statusCode).toBe(400);
        expect(result.body).toContain('Missing required fields.');
    });

    it('should return 400 if the JSON body is invalid', async () => {
        const event = {
            body: "{ invalid json }",
        };

        const result = await handler(event as any);

        expect(result.statusCode).toBe(400);
        expect(result.body).toContain('Invalid JSON format.');
    });

    it('should return 500 if there is an internal server error', async () => {
        sendSpy.mockRejectedValue(new Error("Simulated failure for test"));

        const event = {
            body: JSON.stringify({
                creatorID: 'user-1',
                title: 'Summer Break 2025',
                pollCloseDateTime: '2025-05-31',
            }),
        };

        const result = await handler(event as any);

        expect(result.statusCode).toBe(500);
        expect(result.body).toContain('Internal server error.');
    });
});
