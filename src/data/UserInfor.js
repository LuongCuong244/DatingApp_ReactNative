// import IntroductoryIcon from '../../assets/vectors/introductory-icon.svg';
// import HomeTownIcon from '../../assets/vectors/hometown-icon.svg';
// import HobbyIcon from '../../assets/vectors/hobby-icon.svg';
// import WeightIcon from '../../assets/vectors/weight-icon.svg';
// import HeightIcon from '../../assets/vectors/height-icon.svg';
// import {listCountrys} from './Countrys';

// module.exports = {
//     userInfor: [
//         {
//             key: 'introductory',
//             title: "Giới thiệu đôi nét về bạn",
//             value: "Tôi là Cường. Kết bạn ib mình làm quen nhé. I love you",
//             icon: IntroductoryIcon,
//             format: {
//                 type: 'enter',
//                 attributeName: 'giới thiệu',
//                 attributeValue: "Tôi là Cường. Kết bạn ib mình làm quen nhé. I love you",
//                 listAtributes: null,
//                 description: "Viết gì đó hay ho để tạo ấn tượng tốt nha!"
//             }
//         },
//         {
//             key: 'hometown',
//             title: "Quê hương",
//             value: null,
//             icon: HomeTownIcon,
//             format: {
//                 type: 'select',
//                 attributeName: 'quê hương',
//                 attributeValue: null,
//                 listAtributes: listCountrys[0].citys, // chưa tốt
//                 description: null,
//             }
//         },
//         {
//             key: 'hobby',
//             title: "Sở thích",
//             value: ["Nghe nhạc", "Xem phim", "Thêm"],
//             icon: HobbyIcon,
//             format: {
//                 type: 'enter',
//                 attributeName: 'sở thích',
//                 attributeValue: "",
//                 listAtributes: null,
//                 description: "Thêm sở thích của bạn !",
//             }
//         },
//         {
//             key: 'height',
//             title: "Chiều cao",
//             value: null,
//             icon: HeightIcon,
//             suffixes: " (cm) ",
//             format: {
//                 type: 'enter',
//                 attributeName: 'chiều cao',
//                 attributeValue: "",
//                 listAtributes: null,
//                 description: "Bạn cao bao nhiêu (cm) ?",
//                 keyboardType: 'numeric',
//                 regex: /^[0-9]{0,6}$/,
//             }
//         },
//         {
//             key: 'weight',
//             title: "Cân nặng",
//             value: null,
//             icon: WeightIcon,
//             suffixes: " (kg) ",
//             format: {
//                 type: 'enter',
//                 attributeName: 'cân nặng',
//                 attributeValue: "",
//                 listAtributes: null,
//                 description: "Bạn nặng bao nhiêu (kg) ?",
//                 keyboardType: 'numeric',
//                 regex: /^[0-9]{0,6}$/,
//             }
//         },
//     ],
// }