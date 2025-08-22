# Freelancer Project Manager



## run in development
step 1: run:

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p yassfpm up  --build
```

step 2: navigate to https://localhost:5452

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


