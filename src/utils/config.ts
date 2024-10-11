const configuration = {
    clientID: '0df2f7b0-a75a-4989-860d-69e24e07af6f', // process.env.REACT_APP_CLIENT_ID_PURE_CLOUD,

    redirectUri: 'https://adminovalo.github.io/custom-analytics/',// process.env.REACT_APP_REDIRECT_URL, 
    // redirectUri: 'http://localhost:5173',// process.env.REACT_APP_REDIRECT_URL, 

    genesysCloud: {
        region: 'mypurecloud.de'//process.env.REACT_APP_REGION_URL_PURE_CLOUD
    },
}

export default configuration