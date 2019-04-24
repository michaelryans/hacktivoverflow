# hacktivoverflow

## API documentation

### Base Route

| Base Routes        | HTTP           | 
| ------------- |:-------------:|
| /questions | GET, POST, PATCH, DELETE  |
| /answers | GET, POST, PATCH, DELETE | 
| /users | POST | 

## User route
### User Register
```sh
POST /users
```
* Headers : none
* Body    : {email, password, name}
* Description: User register
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example
```
input:
let registration_obj = {
                email: "michael@yahoo.com",
                password: "hahaha",
                name: "michael ryan"
            }

output: 
{
    "_id":"5cbc7e98a793a11ef83eaf8b",
    "email":"michael@yahoo.com
    "password":"$2a$10$1c15SqkyH1BHf10t0J6WHefJ4UJ91nvzCKWNF.5IqclC4ZDiO0NBS",
    "name":"michael",
    "__v":0
}
```

### User Login

```
GET /products/login
```
* Headers : none
* Body    : {email, password}
* Description: Login with user credentials
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example
```
input:
let registration_obj = {
                email: "michael@yahoo.com",
                password: "hahaha",
            }

output: 
{
    token: ...
}

```

## Answer Route
### Get all answer
```
GET /answers
```
* Headers : none
* Body    : 
* Description: 
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


### Get specific answer based on answer:id
```
GET /answers/:id
```
* Headers : none
* Body    : none   
* Description: answer:id required
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


### Get all answers for specific question's id
```
GET /answers/question/:id
```
* Headers : none
* Body    : none
* Description: Get all answer for specific questions
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


### Create new answer based on question:id
```
POST /answers/:id
```
* Headers : none
* Body    : {...requiredFields}
* Description: 
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example
```
input:
let base_answer = {
    answer: 'lalala',
    description: 'semangat yaaa',
    upvote: 0,
    downvote: 0,
    question: question_id,
}

```

### Update specific answer based on answer:id
```
PATCH /answers/:id
```
* Headers : {token}
* Body    : {...updatedField}
* Description: 
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


### Delete specific answer based on answer:id
```
DELETE /answers/:id
```
* Headers : {token}
* Body    : none
* Description: delete question
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


## Question Route
### Get all question
```
GET /questions
```
* Headers : none
* Body    : none
* Description: Get all questions to be shown on home page
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

### Get specific question based on question:id
```
GET /questions/:id
```
* Headers : none
* Body    : none
* Description: Get specific question for view question page
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}

### Ask new question
```
POST /questions
```
* Headers : {token}
* Body    : {question, description, upvote, downvote, user}
* Description: Create new question
* Success : Status:201, dataTypes:{}
* Error : Status:500 , dataTypes:{}

Example
```
input:
 let base_question = {
    question: "hacktiv-overflow?",
    description: "portofolio week 3",
    upvote: 0,
    downvote: 0,
}
```

### Update specific question based on question:id
```
PATCH /questions/:id
```
* Headers : {token}
* Body    : {user:objectID, ...updatedFields}
* Description: Update specific question
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}


### Delete specific question based on question:id
```
DELETE /questions/:id
```
* Headers : {token}
* Body    : none
* Description: delete question
* Success : Status:200, dataTypes:{}
* Error : Status:500 , dataTypes:{}



