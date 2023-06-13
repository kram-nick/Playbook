# Playbook

Run the following command to install the project dependencies:

- npm install

Once the dependencies are installed, you can start the development server by running the following command:

- npm start

The development server should now be running on http://localhost:3000. You can open this URL in your browser to see the project running.
Building the Project
When you're ready to build the project for production, you can run the following command:

- npm run build

This will create a production-ready build of the project in the build directory.

# Docker

Run the following command to build app Image:

- docker-compose build

Once Image will be created , you should run the following command to create app Container:

- docker-compose run app

After your container was created and stopped, you can run it again with command:

- docker-compose up

# UPDATES

- 11-Jun-2023 - Updates to Github Action and Docker file
