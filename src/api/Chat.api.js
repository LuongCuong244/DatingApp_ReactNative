import axios from "axios";
import { API_URL } from './API_URL';

class Chat_API {

    getMessageRows(callback) {

        let messageRowsTest = [
            {
                userID: '3',
                avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                userName: 'Lương Cường',
                message: 'Hihi chào eHihi chào emHihi chào emHihi chào emHihi chào emHihi chào emHihi chào emHihi chào emm',
                time: '15:03',
                activate: true,
                newMessage: true,
            },
            {
                userID: '2',
                avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                userName: 'Lương Cường',
                message: 'Xin chào',
                time: 'CN',
                activate: false,
                newMessage: false,
            },
            {
                userID: '5',
                avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                userName: 'Lương Cường',
                message: 'a',
                time: 'T2',
                activate: true,
                newMessage: false,
            },
        ];
        callback(messageRowsTest);
        return;

        axios.post(API_URL + "/chat/get-message-rows", {
            headers: {
                'x-access-token': "token",
            },
        }).then((res) => {
            callback(res.data.messageRows);
        })
            .catch(err => console.log(err));
    }

    getMessagesAndGuestInfor(callback, guestID) {

        let messagesTest = [];
        let inforTest = {
            userID: 1,
            avatar: 'https://images.pexels.com/photos/789303/pexels-photo-789303.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            userName: 'Hoa Phượng',
            lastActivity: "Đang hoạt động",
        }
        callback(messagesTest, inforTest);
        return;

        axios.post(API + "/chat/get-messages", {
            headers: {
                'x-access-token': "token",
            },
            body: {
                guestID: guestID
            }
        }).then((res) => {
            callback(res.data.messages, res.data.infor);
        })
            .catch(err => console.log(err));
    }

    sendMessage(callback, message) {
        
        return;

        axios.post(API_URL + "/chat/send-message", {
            headers: {
                'x-access-token': "token",
            },
            body: {
                message: message,
            }
        }).then((res) => {
            callback(res.data.messages);
        })
            .catch(err => console.log(err));
    }
}

export default new Chat_API;