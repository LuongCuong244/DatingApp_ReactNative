import axios from "axios";
import { API_URL } from './API_URL';

class Help_API {

    checkPhoneOrEmail(phoneOrEmail,callback) {
        axios.post("", {
            body: {
                phoneOrEmail
            }
        }).then((res) => {
            callback(res);
        })
        .catch(err => console.log(err));
    }

    checkAuthenticationCode(argument, callback) {
        axios.post("", {
            body: {
                ...argument,
            }
        }).then((res) => {
            callback(res);
        })
        .catch(err => console.log(err));
    }

    resetPassword(argument, callback){
        axios.post("", {
            body: {
                ...argument,
            }
        }).then((res) => {
            callback(res);
        })
        .catch(err => console.log(err));
    }
}

export default new Help_API;