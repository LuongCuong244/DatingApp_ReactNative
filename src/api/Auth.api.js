import axios from "axios";
import { API_URL } from './API_URL';

const PATH = {
    sign_in: API_URL + "/api/auth/signin",
    sign_up: API_URL + "/api/auth/signup"
}

class Auth_API {

    signIn(callback) {

        axios.post(PATH.sign_in, {
            headers: {
                'x-access-token': "token",
            },
        }).then((res) => {

        })
            .catch(err => console.log(err));
    }

    signUp(userInfor, callback) {
        axios.post(PATH.sign_up, {
            body: {
                userInfor,
            }
        }).then((res) => {
            callback(res.data.messages, res.data.infor);
        })
        .catch(err => console.log(err));
    }

    signOut(callback) {
        
    }

    signInWithPhone(numberPhone, callback) {
        axios.post("", {
            body: {
                numberPhone
            }
        }).then((res) => {
            callback(res);
        })
        .catch(err => console.log(err));
    }
}

export default new Auth_API;