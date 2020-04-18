//import React from 'react';
// import axios from 'axios';
//import mgql from 'graphql-tag';
import state from '../model/state'

var url = 'http://localhost:3002/graphql';

async function fetchToJson(callQuery, currentToken, order= "request"){
  // This function takes a query and a token and the excecute order and returns the response object from the backend
  // call query must be in the same form of a graphiql query
  // current token can be "" in case of Un authenticated cal
  // order is used to decode the final string that uses to come in the form result.data.<order>, seems to be the same as the graphql order, be careful detecting this one

  //console.log("Comment", order);
  let momentResult;
  try{
    let result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ query: callQuery}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${
          currentToken
        }`
      }
    });
    let jsonResult = await result.json();
    //console.log("Decoded json result:", jsonResult);
    if(jsonResult.errors){
      //console.log("Throwing backend error: ", jsonResult.errors[0].message);
      throw Error(jsonResult.errors[0].message);
    }
    else{
      if(!jsonResult.data){
        throw Error("Empty results received");
      }
      momentResult = jsonResult.data[order];
    }
  }
  catch(error){
    //console.log(error)
    throw error;
  }; 
  console.log("Fetch result", momentResult);
  return momentResult;
}

async function signIn(email, password){
  console.log("Requesting token:");
  console.log(state.token);
  const SIGNIN = `
  query{
    login(email:"${email}",password:"${password}"){
      token,
      userId,
      firstName,
      lastName1,
      lastName2
    }
  }
`;
  console.log("Signin...");
  console.log(SIGNIN);

  let result = await fetchToJson(SIGNIN, "", "login")
  console.log("Signing in result");
  console.log(result);
  let token = result.token;
  state.token = token;
  state.firstName = result.firstName;
  state.lastName1 = result.lastName1;
  state.lastName2 = result.lastName2;
  console.log("New State:");
  console.log(state);
  
  return result
}


// Android example:
// {"query": "mutation { createEvent(eventInput: {title: \"Vic\", date: \"2020-04-02T06:13:56.335094\", description: \"Hugo\", videoPath: [\"\"], imagePath: [\"https://firebasestorage.googleapis.com/v0/b/ministerio-gob-app.appspot.com/o/images%2FIMG_20200331_205535.jpg%7D?alt=media&token=bb4dfb0c-c06f-4176-9a19-a4f80d42e44d\", \"https://firebasestorage.googleapis.com/v0/b/ministerio-gob-app.appspot.com/o/images%2FIMG_20200331_102425.jpg%7D?alt=media&token=838f8af2-37d9-463a-ab1d-f6c5e508f6a0\"], placeName: \"Bue\", latitude: \"-16.4897\", longitude: \"-68.1193\", platform: \"Android\", status: \"PENDING\"}) { ticketId } } ", "variables": { "ticketId" : 1 } }

//[\\"${imagesUrl.join("\\\", \\\"")}\\"]


async function createReport(date,
                            time,
                            title,
                            description, 
                            category, 
                            country, 
                            mystate, 
                            city, 
                            municipio, 
                            literalLocation, 
                            latitude,
                            longitude, 
                            entity, 
                            denounced, 
                            denouncedCharge, 
                            denouncedDescription, 
                            imagesUrl, 
                            videosUrl, 
                            audiosUrl){
  const CREATE_EVENT = `
    mutation{
      createEvent(eventInput:{date:"${date+"T"+time+":00.000Z"}",title:"${title}",description:"${description}",category:"${category}",country:"${country}",state:"${mystate}",city:"${city}",municipio:"${municipio}",placeName:"${literalLocation}",latitude:"${latitude}",longitude:"${longitude}",entity:"${entity}",denounced:"${denounced}",denouncedCharge:"${denouncedCharge}",denouncedDescription:"${denouncedDescription}",imagePath:["${imagesUrl.join("\",\"")}"],videoPath:["${videosUrl.join("\",\"")}"],audioPath:["${audiosUrl.join("\",\"")}"],platform:"Web",status:"PENDING"}){
        _id,
        title,
        date,
        folio
      }
    }
  `;
  console.log("Create event...");
  console.log(CREATE_EVENT);

  console.log("Recovered token: ",window.localStorage.getItem('token'));

  let event = await fetchToJson(CREATE_EVENT, window.localStorage.getItem('token'), "createEvent");
  console.log("Response event", event);
  return event;
}

async function getEvent(userId, folioCode){
  const GET_EVENT = `
    query{
      event(userId:"${userId}",eventFolio:"${folioCode}"){
        _id,
        folio
        date,
        title,
        description, 
        category, 
        country, 
        state, 
        city, 
        municipio, 
        placeName, 
        latitude,
        longitude, 
        entity, 
        denounced, 
        denouncedCharge, 
        denouncedDescription, 
        imagePath, 
        videoPath, 
        audioPath
      }
    }
  `
  console.log("Requesting folio: ",folioCode, " for user id: ", userId);
  console.log(GET_EVENT);

  let event = fetchToJson(GET_EVENT, window.localStorage.getItem('token'), "event");

  return event;
}

async function createUser(emailIn, firstNameIn, lastName1In, lastName2In, age, phoneNumberIn, CIIn, CIExpIn, genderIn, passwordIn) {
  const ADD_USER = `
  mutation{
    createUser(userInput:{email:"${emailIn}",firstName:"${firstNameIn}",lastName1:"${lastName1In}",lastName2:"${lastName2In}",age:"${age}",phoneNumber:"${phoneNumberIn}",CI:"${CIIn}",CIExp:"${CIExpIn}",gender:"${genderIn}",password:"${passwordIn}"}){
      _id,
      email,
      firstName
    }
  }
`;

  console.log("Create user...");
  console.log(ADD_USER);

  let createUserResult = await fetchToJson(ADD_USER, "", "createUser");

  return createUserResult;
}

export {createUser, getEvent, signIn, createReport};