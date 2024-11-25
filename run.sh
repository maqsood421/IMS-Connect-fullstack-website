#!/bin/bash

# Run start command for the backend folder
cd backend
npm start &

#Run start command for the web-socket 
cd ../backend
node ws.js &

# Run start command for the frontend folder
cd ../frontend
npm run dev & 

