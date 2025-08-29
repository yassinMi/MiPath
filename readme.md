# Freelancer Project Manager

## Live Demo
Check it out here: [fpm.api.yassinmi.com](https://fpm.api.yassinmi.com) 

## run in development
step 1: run:

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p yassfpm up  --build
```

step 2: navigate to http://localhost:5452 or https://localhost:5452 (https requires configuring developer cert)

note: the api project will serve the frontend in this case

## run in development (visual studio)
alternatively you can debug using vite server and visual studio:

step1: open the solution in Visual Studio and click "Start", this will run docker compose.

step2: run vite server
```
cd freelancerprojectmanager.client
npm run dev
```
step3: navigate to the url displayed in the vite server command prompt


## Features
- manage projects
- manage child tasks in projects
- overview pages: this week and today
- filter/sort projects and tasks by status, priority and custom tags
