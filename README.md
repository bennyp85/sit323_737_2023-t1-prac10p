# sit323_737_2023-t1-prac10p

Overview
The app is a simple calculator with a web-based interface. It can perform basic arithmetic operations and is able to create, read, update, and delete entries in the database.

The app is broken down into two microservices:

Frontend: This microservice serves the calculator's user interface.
Backend: This microservice handles the calculations and interacts with the MongoDB database.
While these services can be deployed individually, both need to be running for the full functionality of the app.

Features
Basic Arithmetic Operations: The app supports addition, subtraction, multiplication, and division.
CRUD Operations: The app allows for creating, reading, updating, and deleting entries in the database.
Database ID: Each entry in the database is assigned a unique ID. This ID is used for updating or deleting the corresponding entry.
Non-Dynamic Page Updates: While the page does not update dynamically at the moment, a refresh view button is available to manually update the page after deleting or updating an entry.
Deployment
The app is currently deployed on Google Kubernetes Engine (GKE) with an exposed external endpoint. To assist with development, scaffold.yaml files are included in the repository.
