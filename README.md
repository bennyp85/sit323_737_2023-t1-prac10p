# Node.js Calculator Web App
This repository hosts a Calculator Web App, a cloud-native microservice-based application built with Node.js and Express. The app utilizes MongoDB as its database and is deployed on Google Kubernetes Engine (GKE).

## #Overview
The app is a simple calculator with a web-based interface. It can perform basic arithmetic operations and is able to create, read, update, and delete entries in the database.

The architecture of the app consists of three services:

Calculator Frontend: This LoadBalancer service serves the user interface of the calculator. It is responsible for routing user requests to the correct service.

Calculator Backend: This ClusterIP service handles the calculations and interacts with the MongoDB database.

MongoDB Database: This ClusterIP service is the database for the app. It stores all the calculation entries.

While these services can be deployed individually, all of them need to be running for the full functionality of the app.

## Application Flow
The application follows a logical flow:

User requests first hit the Calculator Frontend service.
The Frontend service then routes the request to the Calculator Backend service.
The Backend service performs the calculation or database operation and communicates with the MongoDB Database service as needed.
The response then follows the same path back to the user.

## Features
### Basic Arithmetic Operations: The app supports addition, subtraction, multiplication, and division.
### CRUD Operations: The app allows for creating, reading, updating, and deleting entries in the database.
### Database ID: Each entry in the database is assigned a unique ID. This ID is used for updating or deleting the corresponding entry.
### Non-Dynamic Page Updates: While the page does not update dynamically at the moment, a refresh view button is available to manually update the page after deleting or updating an entry.

## #Deployment
The app is currently deployed on Google Kubernetes Engine (GKE) with an exposed external endpoint. To assist with development, scaffold.yaml files are included in the repository.
