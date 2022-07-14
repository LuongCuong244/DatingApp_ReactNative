import HomeTownIcon from '../../assets/vectors/hometown-icon.svg';
import CakeIcon from '../../assets/vectors/cake-icon.svg';
import HobbyIcon from '../../assets/vectors/hobby-icon.svg';
import WeightIcon from '../../assets/vectors/weight-icon.svg';
import HeightIcon from '../../assets/vectors/height-icon.svg';

import Moment from 'moment';

const Sample = [
    {
        key: 'hometown',
        title: "Quê hương",
        value: null,
        icon: HomeTownIcon,
    },
    {
        key: 'dateOfBirth',
        title: "Ngày sinh",
        value: null,
        icon: CakeIcon,
    },
    {
        key: 'hobby',
        title: "Sở thích",
        value: ["Nghe nhạc", "Xem phim", "Thêm"],
        icon: HobbyIcon,
    },
    {
        key: 'height',
        title: "Chiều cao",
        value: null,
        icon: HeightIcon,
        suffixes: " ( cm ) ",
    },
    {
        key: 'weight',
        title: "Cân nặng",
        value: null,
        icon: WeightIcon,
        suffixes: " ( kg ) ",
    },
]

const inforFiltering = (user) => {
    let clonedSample = [...Sample];

    return clonedSample.map((item) => {

        switch(item.key){
            case "dateOfBirth":{
                item.value = Moment(user[item.key]).format("DD/MM/YYYY");
                break;
            }
            default: {
                item.value = user[item.key];
                break;
            }
        }
        return item;
    })
}

module.exports = {
    inforFiltering,
};