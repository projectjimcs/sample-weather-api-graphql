# Weathering App

A simple web application in which a user can register and login to access getting the weather for their inputted city

## Description

Application includes basic registration, login and querying for weather information for an inputted city. JWT was used for the authentication logic. The backend is built with express and graphql while the frontend uses react. 

## Getting Started

* MySql required. [MySql Download](https://dev.mysql.com/downloads/mysql/) Once installed, Go into mysql on the command line (ex. `mysql -uroot -proot`). Then run `create database qlsample` and exit. 
* MySqL 8.0.27-arm64 was the version used on the development Mac. 8.0.18 was used for my older Mac on Mojave to ensure working.
* Open weather API key required. Can be obtained free at [Open Weather API](https://openweathermap.org/api)
* Node version 16.16.0+ required. An older version may work, but tested on 16.16.0 and 17.2.
* Go into mysql on the command line (ex. `mysql -uroot -proot`). Then run `create database qlsample` and exit. 

### Dependencies

* There are a number of dependencies and libraries which can all be found through `client/package.json` and `server/package.json`
* Library usage was kept to a minimum to get things working.
* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

* Step 1: Clone the repository: `git clone git@github.com:projectjimcs/sample-weather-api-graphql.git` or `git clone https://github.com/projectjimcs/sample-weather-api-graphql.git`
* Step 2: Go into the project directory: `cd sample-weather-api-graphql`
* Step 3: Go into the client folder (`cd client`) and run `npm install`
* Step 4: Go into the server folder (`cd server`) and run `npm install`
* Step 5: In the server folder, create a new env file (`touch .env`) and copy the contents of `.env.example` over to it
* Step 6: Open the env file and set the port to `8000`. The JWT_SECRET can be anything, DB_USER and DB_PASSWORD is whatever you inputted for your database and WEATHER_API_KEY is the key you got from the getting started section
* Step 7: Go into the server folder and run migrations: `node node_modules/db-migrate/bin/db-migrate up`


### Executing program

* Step 1: Open two terminal window, on one of them, go to the client folder and run `npm start`. On the second terminal window, go to the server folder and run `npm run dev`
* Step 2: Go to localhost:3000 to see the application, though it should already automatically pop up after running `npm start`

## Help

* A common issue that you run may into goes along the lines of `Client does not support authentication protocol requested by server` if this occurs, run the following in mysql: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';` where root as your user localhost as your URL and password as your password. Then run `flush privileges;`

## Authors

Created By: Jim Lin

**Images Used (All credits to the owners)**
* https://www.freepik.com/vectors/play-school
* https://www.freepik.com/vectors/hot-cold
* https://www.freepik.com/vectors/family-activity
* https://favicon.io/emoji-favicons/sun/


## Version History

* 0.1
    * Initial Release

## License

Copyright 2022 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Screenshots

!['Screenshot 1'](https://user-images.githubusercontent.com/61166862/180325462-b75449c2-cbb4-4317-9fc6-3f55ad8066ec.png)
!['Screenshot 2'](https://user-images.githubusercontent.com/61166862/180325553-ab4a6a05-21fe-4024-a8ca-faca5dea54fb.png)
!['Screenshot 3'](https://user-images.githubusercontent.com/61166862/180325584-8d73193a-55e8-43f1-85cd-3809b0d4a45c.png)
!['Screenshot 4'](https://user-images.githubusercontent.com/61166862/180325622-3e950019-536d-4778-b2b1-79fac0f20424.png)
