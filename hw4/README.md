# Web Programming Hw4 Messenger Clone
Hi, please notice that there are two main folders in my hw4, which are server and web. The structure and set up is quite similar to simple-chat-room clone.

## Set up guide
-First, install the package for both folders, run the commands below:
```bash
cd ../server
yarn
cd ./web
yarn
```

-In server folder, it is an express project, you should create an `./server/.env` file (you can refer to the env.example file in the server folder) and add the following lines:
```text
PORT=4000
```
-In web folder, it is an next.js project with postresql, you should create an `./web/.env.local` file (you can refer to the env.example file in the web folder) and add the following lines:
```text
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/messenger
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```
remember to update the NEXT_PUBLIC_SOCKET_URL if you modify the PORT in the server!

-Next you should set up the drizzle and docker part in the web folder, no need to modify anything in  `./web/docker-compose.yml`, you can refer to the twitter clone set up.

-Finally, run the project with the following commands:
```bash
cd ../server
yarn dev
cd ./web
docker compose up -d
yarn migrate
yarn dev
```
click on the link to open the web.
-Important!!If you want to review the socket part, you should open two windows but not in the same window with two tabs. 



## Implementation for perfect
I've done the detect link and auto scroll(open two window to review auto scroll). 
  
If there's any question about my hw3, please contact hankwu1222@gmail.com, thanks.
