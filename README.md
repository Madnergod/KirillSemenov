# KirillSemenov
# Trellis
A Trello Clone - Built with React, Redux, Express, and MongoDB. 

## ⚡ Features
- Create, Modify and Delete boards
- Create, Modify and Delete cards
- Create, Modify and Delete lists
- Move card items within lists
- Move card items across lists
- Ordering of list items
- Activity log with active timestamps for each user events
- Customize background images or color for individual boards
- User Authentication

## Installing
1. Clone the repository
```
git clone https://gitlab.com/vladislaw.E/trello-clone-react.git
cd trello-clone-react
```
2. Install dependencies if you have **node_modules** not needed
```
npm i && cd client && npm i
```
3. Create **.env** file in **client** folder
```
REACT_APP_CLIENT_KEY="YOUR RANDOM API KEY"
```
4. Create **dev.env** in **config** folder
```
PORT=8080
DATABASE_URL="MongoDB Connection String"
JWT_SECRET="YOUR JWT TOKEN"
NODE_ENV=development
```
5. Go into **client/package.json** and replace **proxy** with your server port 
```
"proxy": "http://localhost:8080"
```
6. you needed create your mongodb in "https://cloud.mongodb.com/"
```
Clusters -> Connect -> Connect your application. copy your address and past in file dev.env line "DATABASE_URL="
```
7. Run the project
```
npm run trello
```
## ER Diagram
[Trello-ERD](../master/ERD.png)

#### Frontend 
- [React](https://reactjs.org/) -  A JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - State management
- [Material UI](https://material-ui.com/) - UI
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - Accessible drag and drop for lists
- [React Router](https://reactrouter.com/) - Routing library for react
- [Moment](https://momentjs.com/) - Library for manipulating dates and time 
- [lodash](https://lodash.com/) - JavaScript utility library for modularity, performance, etc.
#### Backend 
- [NodeJs](https://nodejs.org/en/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js
- [Express](https://expressjs.com/) -  Node.js web application framework
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Jsonwebtoken](https://jwt.io/) - Decode, verify and generate JWT.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing algorithm library
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP APIs Testing library
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [sinon](https://sinonjs.org/) - Standalone test fakes, spies, stubs and mocks library
