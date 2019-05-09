const { 
    REACT_APP_API_PROTOCOL,
    REACT_APP_API_DOMAIN,
    REACT_APP_API_PORT,
    REACT_APP_API_FB_APPID
} = process.env;


export default {
    url: `${REACT_APP_API_PROTOCOL}://${REACT_APP_API_DOMAIN}:${REACT_APP_API_PORT}`,
    facebook : {
        appId : REACT_APP_API_FB_APPID,        provider: "facebook"
    }
}