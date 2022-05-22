# TODO List API

Restful API created to serve the backend of a ToDo List application.

## Requirements
```
- Node >= 14.17
```

## Easy startup with Docker and docker-compose

### Starting:

1 - Copy the env.sample and make it standard, such as .env
```
cp .env.sample .env
```
2 - Run the docker-compose command to move up the application
```
docker-compose up -d
```
3 - If you run the ```docker ps``` command, you should see an instance of MongoDB and the application running.

## Observations

This application should be run in conjunction with its frontend, available at the link: [TODO List frontend](https://github.com/robertoakang/todo-list)
