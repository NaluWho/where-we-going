# WhereWeGoing

WhereWeGoing is a **group trip planning tool** that allows trip organizers to plan and coordinate trips with friends or family. The platform enables group members to vote on various trip details such as location, start/end dates, and lodging options. Once the votes are collected, the most popular options are automatically displayed, helping the group make decisions efficiently.

**Work in Progress: This project is currently under development. New features and updates will be added regularly.**

---

## Features

- **Trip Creation**: Organizers can create a trip and specify details like location, dates, and lodging options.
- **Group Voting**: Participants can vote on options for each aspect of the trip, including locations, dates, and lodging.
- **Automated Results**: Once voting ends, the most popular choices are automatically displayed in the itinerary.
- **User Notifications**: Participants are notified when the poll closes and can see the final trip details.
- **Easy Invitations**: Organizers can invite others to join the trip via a link.

---

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js (Serverless architecture)
- **Database**: AWS DynamoDB
- **Hosting**: AWS (via Lambda and other serverless components)
- **Version Control**: GitHub

---

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (for running the backend)
- [AWS CLI](https://aws.amazon.com/cli/) (for managing DynamoDB and serverless resources)
- [AWS Account](https://aws.amazon.com/) (for setting up DynamoDB and Lambda)