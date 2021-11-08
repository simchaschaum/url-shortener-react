const HandleError = (code) => {
    let message;
    switch(code){
        case 1:
        case 2:
            message = "Please enter enter a valid URL";
            break;
        case 3: 
            message = "Sorry! Rate limit reached. Please wait a second and try again";
            break;
        case 4: 
            message = `Sorry! The IP-Address has been blocked because of violating Shrtco's terms of service`;
            break;
        default: 
            message = "Sorry! Something went wrong."
    }
  return message;
}


export default HandleError