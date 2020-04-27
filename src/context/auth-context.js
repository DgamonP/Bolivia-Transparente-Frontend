import React from 'react';


export default React.createContext({
    token: null,
    /* userId: null,
    tokenExpiration: null,
    CI: null,
    CIExp: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    email: null,
    userType: null,
    event: null, */
    
    login: (token, 
            /* userId, 
            tokenExpiration,
            CI, 
            CIExp, 
            phoneNumber, 
            firstName, 
            lastName, 
            email */) => {},

    logout: () => {}
});