//import React from 'react';
import axios from 'axios';
//import mgql from 'graphql-tag';
import state from '../model/state'

var url = 'http://localhost:3002/graphql';

const axiosGitHubGraphQL = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${
      state.token
    }`
  },
});

function listUsers(){
  const LIST_USERS = `
  query{
    users{
      _id,
      email
    }
  }
`;
  console.log("Listing...");
  console.log(LIST_USERS);
  axiosGitHubGraphQL
  .post('', { query: LIST_USERS })
  .then(result => {console.log("Query result 3");console.log(result)}).catch(console.log("Error"));
}

async function signIn(email, password){
  console.log("Requesting token:");
  console.log(state.token);
  let myResult;
  const SIGNIN = `
  query{
    login(email:"${email}",password:"${password}"){
      token,
      userId,
      firstName,
      lastName1
    }
  }
`;
  console.log("Signin...");
  console.log(SIGNIN);
  await axiosGitHubGraphQL
  .post('', { query: SIGNIN})
  .then(result => {console.log("Signing in result");
                    console.log(result);
                    myResult = result
                    console.log("New token:");
                    let token = myResult.data.data.login.token;
                    state.token = token;
                    state.firstName = myResult.data.data.login.firstName;
                    state.lastName = myResult.data.data.login.lastName;
                    console.log(token);
                    console.log("New State token:");
                    console.log(state.token);
                    console.log("New State");
                    console.log(state);
                    })
  .catch(error => {
    console.log("Error in login");
    console.log(error.message);
    throw error.message; 
  });
  
  return myResult
}


// Android example:
// {"query": "mutation { createEvent(eventInput: {title: \"Vic\", date: \"2020-04-02T06:13:56.335094\", description: \"Hugo\", videoPath: [\"\"], imagePath: [\"https://firebasestorage.googleapis.com/v0/b/ministerio-gob-app.appspot.com/o/images%2FIMG_20200331_205535.jpg%7D?alt=media&token=bb4dfb0c-c06f-4176-9a19-a4f80d42e44d\", \"https://firebasestorage.googleapis.com/v0/b/ministerio-gob-app.appspot.com/o/images%2FIMG_20200331_102425.jpg%7D?alt=media&token=838f8af2-37d9-463a-ab1d-f6c5e508f6a0\"], placeName: \"Bue\", latitude: \"-16.4897\", longitude: \"-68.1193\", platform: \"Android\", status: \"PENDING\"}) { ticketId } } ", "variables": { "ticketId" : 1 } }

//[\\"${imagesUrl.join("\\\", \\\"")}\\"]


async function createReport(title, description, literalLocation, date, time, latitude, longitude, imagesUrl, videosUrl){
  const CREATE_EVENT = `
    mutation{
      createEvent(eventInput:{title:"${title}",description:"${description}",date:"${date}",placeName:"${literalLocation}",latitude:"${latitude}",longitude:"${longitude}",imagePath:["${imagesUrl.join("\",\"")}"],videoPath:["${videosUrl.join("\",\"")}"],platform:"Web",status:"PENDING"}){
        _id,
        title,
        date
      }
    }
  `;
  console.log("Create event...");
  console.log(CREATE_EVENT);
  await axios.post(
    url,
    { query: CREATE_EVENT},
    { headers: { Authorization: `Bearer ${state.token}` }},
  ).then(result=>{console.log(result);})
  .catch((error)=>{
                    console.log(error);
                    throw error;});
  //return myResult;
}

async function createUser(emailIn, firstNameIn, lastName1In, lastName2In, age, phoneNumberIn, CIIn, CIExpIn, genderIn, passwordIn) {
  let myResult;
  const ADD_USER = `
  mutation{
    createUserEmail(userInput:{email:"${emailIn}",firstName:"${firstNameIn}",lastName1:"${lastName1In}",lastName2:"${lastName2In}",age:${age},phoneNumber:"${phoneNumberIn}",CI:"${CIIn}",CIExp:"${CIExpIn}",gender:"${genderIn}",password:"${passwordIn}"}){
      _id,
      email,
      firstName
    }
  }
`;

  console.log("Create user...");
  console.log(ADD_USER);

  await axiosGitHubGraphQL
  .post('', { query: ADD_USER})
  .then(result => {console.log("Create user result:");
                    myResult = result;
                    console.log(myResult);
                    })
  .catch(error => {
    console.log("Error in add user");
    console.error(error.message);
  });
  return myResult;
}

export {listUsers, createUser, signIn, createReport};