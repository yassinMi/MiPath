# Path - project managment and productivity tool for solo freelancers

## Live Demo
Check it out here: [mipath.yassinmi.com](https://mipath.yassinmi.com) 

## run in development
step 1: run:

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p mipath up  --build
```

step 2: navigate to http://localhost:5451 or https://localhost:5452 (https requires configuring developer cert)

note: the api project will serve the frontend in this case

note: swagger UI available at /swagger/index.html 

## run in development (visual studio)
alternatively you can debug using vite server and visual studio:

step1: open the solution in Visual Studio and click "Start", this will run docker compose.

step2: run vite server
```
cd mipath.client
npm run dev
```
step3: navigate to the url displayed in the vite server command prompt


## Features
- [ ] manage projects:
  - [x] create
  - [ ] edit (description, title, estimate value, etc)
  - [x] delete
- [ ] manage child tasks in projects
  - [x] create
  - [ ] edit (description, title, plannedStart, estimateDuration)
  - [x] move to state InProgree, Done, ToDo
  - [ ] Delete
- [ ] overview pages:
  - [x] today:
    - [x] kanban board
    - [ ] roadmap
  - [ ] this week
    - [ ] kanban board
    - [ ] roadmap
- [ ] filter/sort projects and tasks by status, priority and custom tags
- [x] main dashboard 
- [ ] clock-in/clock-out, tracking hours per project
 
