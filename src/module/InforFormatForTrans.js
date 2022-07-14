import IntroductoryIcon from '../../assets/vectors/introductory-icon.svg';
import HomeTownIcon from '../../assets/vectors/hometown-icon.svg';
import HobbyIcon from '../../assets/vectors/hobby-icon.svg';
import WeightIcon from '../../assets/vectors/weight-icon.svg';
import HeightIcon from '../../assets/vectors/height-icon.svg';
import {listCountrys} from '../data/Countrys';

const Sample = [
    {
        key: 'introductory',
        title: "Giới thiệu đôi nét về bạn",
        value: "Tôi là Cường. Kết bạn ib mình làm quen nhé. I love you",
        icon: IntroductoryIcon,
        format: {
            type: 'enter',
            attributeName: 'giới thiệu',
            attributeValue: "Tôi là Cường. Kết bạn ib mình làm quen nhé. I love you",
            listAtributes: null,
            description: "Viết gì đó hay ho để tạo ấn tượng tốt nha!"
        }
    },
    {
        key: 'userName',
        title: "Tên",
        value: "Lương Cường",
        icon: IntroductoryIcon,
        format: {
            type: 'enter',
            attributeName: 'tên',
            attributeValue: "Lương Cường",
            listAtributes: null,
            description: "Tên của bạn là gì ?"
        }
    },
    {
        key: 'gender',
        title: "Giới tính",
        value: "Name",
        icon: IntroductoryIcon,
        format: {
            type: 'select',
            attributeName: 'giới tính',
            attributeValue: "Nam",
            listAtributes: ["Nam","Nữ","LGBT"],
            description: null
        }
    },
    {
        key: 'hometown',
        title: "Quê hương",
        value: null,
        icon: HomeTownIcon,
        format: {
            type: 'select',
            attributeName: 'quê hương',
            attributeValue: null,
            listAtributes: listCountrys[0].citys, // chưa tốt
            description: null,
        }
    },
    {
        key: 'hobby',
        title: "Sở thích",
        value: ["Nghe nhạc", "Xem phim", "Thêm"],
        icon: HobbyIcon,
        format: {
            type: 'enter',
            attributeName: 'sở thích',
            attributeValue: "",
            listAtributes: null,
            description: "Thêm sở thích của bạn !",
        }
    },
    {
        key: 'height',
        title: "Chiều cao",
        value: null,
        icon: HeightIcon,
        suffixes: " ( cm ) ",
        format: {
            type: 'enter',
            attributeName: 'chiều cao',
            attributeValue: "",
            listAtributes: null,
            description: "Bạn cao bao nhiêu (cm) ?",
            keyboardType: 'numeric',
            regex: "^[0-9]{0,4}$",
        }
    },
    {
        key: 'weight',
        title: "Cân nặng",
        value: null,
        icon: WeightIcon,
        suffixes: " ( kg ) ",
        format: {
            type: 'enter',
            attributeName: 'cân nặng',
            attributeValue: "",
            listAtributes: null,
            description: "Bạn nặng bao nhiêu (kg) ?",
            keyboardType: 'numeric',
            regex: "^[0-9]{0,4}$",
        }
    },
];

const formDataUser = {
    userId: null,
    userName: null,
    gender: null,
    address: null,
    age: null,
    introductory: null,
    avatar: null,
    listPhotos: [
        '',
        '',
        '',
        '',
        '',
        '',
    ],
    dateOfBirth: null,
    hometown: null,
    hobby: [],
    height: null,
    weight: null,
    verify: false,
}

const inforFormatForTrans = (user) => {

    if(!user){
        user = {...formDataUser};
    }

    let result = [...Sample]; // copy array
    return result.map((item) => {
        if(item.key !== 'hobby'){
            item.value = user[item.key];
            item.format.attributeValue = user[item.key];
        }else{
            item.value = [...user[item.key]];
            item.value.push("Thêm");
        }
        return item;
    })
}

module.exports = {
    inforFormatForTrans,
};