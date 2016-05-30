REST API for Manange Student Timing using NODE.js , Express.js and Mongo DB.:


--------------------------------------------------------------------
--Create applipcation
npm init
--Install modules
npm install express --save
npm install mongoose --save
npm install body-parser --save

npm config list
globally —- This drops modules in {prefix}/lib/node_modules
--npm install [npm-module] --global 
-- npm install [npm-module] -g
--npm list --global
locally —- This installs your package in the current working directory
npm list
npm install {npm-module}@{version_no}

Now install Express in the app directory and save it in the dependencies list. 
npm install express --save

Refer : https://nodejs.org/en/blog/npm/npm-1-0-global-vs-local-installation/

------------------------------------------------------------------------------

API : http://localhost:3000/api/student
GET - Returns student details for requested id
Sample:
http://localhost:3000/api/student?studentNo=$param
Response:
[
  {
    "_id": "57341a33ae78b9902a994c1e",
    "studentNo": "1232352524324",
    "day": "10",
    "night": "12",
    "__v": 0
  }
]

PUT - Create student details with provided
Sample:
http://localhost:3000/api/student?studentNo=$param
Response:
Created : 201 (New)
Accepted : 202 (Existing)

POST : Increment the student details with provided params
Sample:
http://localhost:3000/api/student?studentNo=$param&day=$param&night=$param
Response:
Status : 200

PATCH : Reset the student details with provided params
Sample:
http://localhost:3000/api/student?studentNo=$param&day=$param&night=$param
Response:
Status : 200

DELTED : Delete the student details with provided params
Sample:
http://localhost:3000/api/student?studentNo=$param
Response:
Status : 200
