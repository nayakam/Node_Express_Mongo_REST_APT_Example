# REST API with NODE.js, Express.js and Mongo DB

### Create application
Generate package.json with other npm parameters

    npm init

#### Install modules

##### Locally
This drops the modules / packages in a node_modules folder in project parent directory.

    npm list
    npm install {npm-module}@{version_no}
    npm install express
    npm install mongoose
    npm install body-parser
	
	--With no args in package dir to install the dependecis for app from package.json
	npm install
	
    npm list

###### Options
Use --save flag to update package.json with the installed version and package name.

    npm install express --save
    npm install mongoose --save
    npm install body-parser --save

Use --save-dev flag to update package.json with the installed version and package name into the devDependencies section.

        npm install express --save-dev
        npm install mongoose --save-dev
        npm install body-parser --save-dev    

##### Globally
This drops modules/ modules in {prefix}/lib/node_modules

    npm config get prefix
    npm install [npm-module] --global
    npm install [npm-module] -g
    npm list --global
    npm list -g --depth=1


##### Commands
Useful Commands

    -- Commnd details
    npm help ${command}

    node -v or node --version
    npm -v or npm --version
    -- all configuration    
    npm config ls -l
    --Show all the config settings.
    npm config list

    npm bin	

### REST API Details

Test the API

    http://localhost:3000/api/student

#### GET

Returns student details for requested id  
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

#### PUT
Create student details with provided  
Sample:

    http://localhost:3000/api/student?studentNo=$param

Response:  

    Created : 201 (New)
    Accepted : 202 (Existing)

#### POST
Increment the student details with provided params
Sample:

    http://localhost:3000/api/student?studentNo=$param&day=$param&night=$param

Response:

    Status : 200

#### PATCH
Reset the student details with provided params  
Sample:

    http://localhost:3000/api/student?studentNo=$param&day=$param&night=$param

Response:

    Status : 200

#### DELETED
Delete the student details with provided params
Sample:

    http://localhost:3000/api/student?studentNo=$param

Response:

    Status : 200

##Reference

 - https://docs.npmjs.com/all
 - http://browsenpm.org/help
 - https://docs.npmjs.com/getting-started/using-a-package.json
 - http://expressjs.com/en/starter/installing.html
