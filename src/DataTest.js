const configUserInforTest = [
    {
        key: 'name', // tên key lưu trên database
        title: 'Họ và tên',
        currentValue: "Lương Cường",
        style: 'input',
        allowHide: false,
        isOn: true,
        possibleValues: [],
    }, {
        key: 'gender',
        title: 'Giới tính',
        currentValue: "Nam",
        style: 'select',
        allowHide: false,
        isOn: true,
        possibleValues: ['Nam', 'Nữ', 'Đồng tính nam', 'Đồng tính nữ'],
    }, {
        key: 'dateOfBirth',
        title: 'Ngày sinh',
        currentValue: "10/11/2002",
        style: 'date',
        allowHide: false,
        isOn: true,
        possibleValues: [],
    }, {
        key: 'school',
        title: 'Trường học',
        currentValue: "THPT Thạch Thất",
        style: 'input',
        allowHide: true,
        isOn: true,
        possibleValues: [],
    }
]

const dataUserTest = [
    {
        userID: 1,
        name: 'Lương Cường',
        introduce: 'Tôi đã yêu bạn từ giây phút này',
        age: 20,
        address: 'Hà Nội',
        avatar: 'https://1.bp.blogspot.com/-ussdmBPJN00/X3f2xUi8v9I/AAAAAAAAAsE/pfqSHD88MrEBJaSlVRWdmN-vswQOp8C6wCLcBGAsYHQ/s1286/beautiful%2Bgirls.jpg',
        listImages: [
            'https://hinhanhdephd.com/wp-content/uploads/2017/06/anh-nguoi-dep-hinh-nguoi-mau-de-thuong-nhat-qua-dat-17.jpg',
            'https://i.pinimg.com/474x/d5/f3/53/d5f35325a030ad5ab9af33e411b1d9f1.jpg',
            'https://anhdep123.com/wp-content/uploads/2021/03/Tong-hop-nhung-hinh-anh-sieu-mau-nam-dep-2.jpg',
            'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg',
            'https://luv.vn/wp-content/uploads/2021/09/hinh-anh-nguoi-mau-lam-hinh-nen-dien-thoai-47.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAYqmbd0s2Zrw81YI3mlLgc0IC2dLg2dGGk5G_-b2rQmVOH886lJfWOVCR2IMYiRI21M&usqp=CAU',
            'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/kimoanh-857-1620472406149.jpeg',
        ],
        imageIndexDisplay: 0
    },
    {
        userID: 2,
        name: 'Tại Sao',
        introduce: 'Tôi đã yêu bạn từ giây phút này',
        age: 17,
        address: 'Cà Mau',
        avatar: 'https://1.bp.blogspot.com/-ussdmBPJN00/X3f2xUi8v9I/AAAAAAAAAsE/pfqSHD88MrEBJaSlVRWdmN-vswQOp8C6wCLcBGAsYHQ/s1286/beautiful%2Bgirls.jpg',
        listImages: [
            'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg',
            'https://i.pinimg.com/474x/d5/f3/53/d5f35325a030ad5ab9af33e411b1d9f1.jpg',
            'https://anhdep123.com/wp-content/uploads/2021/03/Tong-hop-nhung-hinh-anh-sieu-mau-nam-dep-2.jpg',
            'https://luv.vn/wp-content/uploads/2021/09/hinh-anh-nguoi-mau-lam-hinh-nen-dien-thoai-47.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAYqmbd0s2Zrw81YI3mlLgc0IC2dLg2dGGk5G_-b2rQmVOH886lJfWOVCR2IMYiRI21M&usqp=CAU',
            'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/kimoanh-857-1620472406149.jpeg',
            'https://hinhanhdephd.com/wp-content/uploads/2017/06/anh-nguoi-dep-hinh-nguoi-mau-de-thuong-nhat-qua-dat-17.jpg',
        ],
        imageIndexDisplay: 0
    },
    {
        userID: 3,
        name: 'Mỹ Duyên',
        introduce: 'Tôi đã yêu bạn từ giây phút này',
        age: 27,
        address: 'Lạng Sơn',
        avatar: 'https://1.bp.blogspot.com/-ussdmBPJN00/X3f2xUi8v9I/AAAAAAAAAsE/pfqSHD88MrEBJaSlVRWdmN-vswQOp8C6wCLcBGAsYHQ/s1286/beautiful%2Bgirls.jpg',
        listImages: [
            'https://i.pinimg.com/474x/d5/f3/53/d5f35325a030ad5ab9af33e411b1d9f1.jpg',
            'https://hinhanhdephd.com/wp-content/uploads/2017/06/anh-nguoi-dep-hinh-nguoi-mau-de-thuong-nhat-qua-dat-17.jpg',
            'https://anhdep123.com/wp-content/uploads/2021/03/Tong-hop-nhung-hinh-anh-sieu-mau-nam-dep-2.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAYqmbd0s2Zrw81YI3mlLgc0IC2dLg2dGGk5G_-b2rQmVOH886lJfWOVCR2IMYiRI21M&usqp=CAU',
            'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg',
            'https://luv.vn/wp-content/uploads/2021/09/hinh-anh-nguoi-mau-lam-hinh-nen-dien-thoai-47.jpg',
            'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/kimoanh-857-1620472406149.jpeg',
        ],
        imageIndexDisplay: 0
    },
]

const ListUsersLikedMe = [
    {
        userID: 1,
        name: 'Phương My',
        age: 18,
        gender: 'Female',
        address: 'Hà Nội',
        photo: 'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 2,
        name: 'Mỹ Lệ',
        age: 28,
        gender: 'Female',
        address: 'Cần Thơ',
        photo: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 3,
        name: 'Thành Nam',
        age: 23,
        gender: 'Male',
        address: 'TP. Hồ Chí Minh',
        photo: 'https://images.pexels.com/photos/8450454/pexels-photo-8450454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 4,
        name: 'Thảo Chi',
        age: 18,
        gender: 'Female',
        address: 'Hà Nội',
        photo: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 5,
        name: 'Đỗ Huy',
        age: 19,
        gender: 'Male',
        address: 'Bắc Giang',
        photo: 'https://images.pexels.com/photos/2915216/pexels-photo-2915216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 6,
        name: 'Thảo Linh',
        age: 32,
        gender: 'Female',
        address: 'Hà Nội',
        photo: 'https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 7,
        name: 'Cẩm Ly',
        age: 27,
        gender: 'Female',
        address: 'Cao Bằng',
        photo: 'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg'
    }
]

const ListUsersLikedByMe = [
    {
        userID: 1,
        name: 'Bùi Thảo',
        age: 18,
        gender: 'Female',
        address: 'Ninh Bình',
        photo: 'https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        userID: 2,
        name: 'Minh Hiếu',
        age: 28,
        gender: 'Male',
        address: 'Quảng Trị',
        photo: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 3,
        name: 'Dỗ Tuấn',
        age: 23,
        gender: 'Male',
        address: 'TP. Vinh',
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 4,
        name: 'Nguyễn Phương',
        age: 25,
        gender: 'Female',
        address: 'Hà Nội',
        photo: 'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 5,
        name: 'Hoa Huệ',
        age: 43,
        gender: 'Female',
        address: 'Đà Nẵng',
        photo: 'https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 6,
        name: 'Thanh Bình',
        age: 23,
        gender: 'Female',
        address: 'Lạng Sơn',
        photo: 'https://images.pexels.com/photos/1322129/pexels-photo-1322129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }
]

const ChatListData = [
    {
        userID: 1,
        userName: "Lương Cường",
        message: "Cho anh làm quen nhé",
        time: new Date(2022, 2, 30, 21, 52, 30, 0),
        isNewMessage: false,
        userIsActive: true,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
        userID: 2,
        userName: "Võ Mai Trang",
        message: "Nắng mang em đi rồi, không còn những ngày đó nữa",
        time: new Date(2022, 2, 29, 9, 55, 30, 0),
        isNewMessage: false,
        userIsActive: true,
        userIsSendMes: true,
        avatar: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 3,
        userName: "Huyền My",
        message: "Sao không rep tin nhắn",
        time: new Date(2022, 2, 29, 10, 33, 30, 0),
        isNewMessage: true,
        userIsActive: false,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 4,
        userName: "Hứa Thành Đạt",
        message: "Có lẽ nào là thế không nhỉ :))",
        time: new Date(2022, 2, 28, 10, 33, 30, 0),
        isNewMessage: false,
        userIsActive: false,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 5,
        userName: "Đỗ Tuyết Mai",
        message: "Đã gửi một ảnh",
        time: new Date(2022, 2, 25, 10, 33, 30, 0),
        isNewMessage: true,
        userIsActive: true,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/1322129/pexels-photo-1322129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 6,
        userName: "Trai Họ Lương",
        message: "Đã gửi một file đính kèm",
        time: new Date(2022, 2, 15, 10, 33, 30, 0),
        isNewMessage: false,
        userIsActive: false,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 7,
        userName: "Quan Văn Vũ",
        message: "Tại sao người lại lặng im",
        time: new Date(2022, 2, 15, 10, 33, 30, 0),
        isNewMessage: false,
        userIsActive: false,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 8,
        userName: "Mai Ngọc",
        message: "Hello my friend",
        time: new Date(2022, 2, 14, 21, 52, 30, 0),
        isNewMessage: true,
        userIsActive: true,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/1362724/pexels-photo-1362724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
        userID: 9,
        userName: "Minh Trang",
        message: "Cho mk làm quen bạn được hông",
        time: new Date(2022, 2, 14, 9, 55, 30, 0),
        isNewMessage: false,
        userIsActive: true,
        userIsSendMes: true,
        avatar: 'https://images.pexels.com/photos/1279903/pexels-photo-1279903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 10,
        userName: "Đỗ Ngọc",
        message: "Haha",
        time: new Date(2022, 2, 14, 10, 33, 30, 0),
        isNewMessage: false,
        userIsActive: false,
        userIsSendMes: true,
        avatar: 'https://images.pexels.com/photos/245388/pexels-photo-245388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 11,
        userName: "Văn Cao",
        message: "Sao lại như thế đc",
        time: new Date(2022, 2, 10, 10, 33, 30, 0),
        isNewMessage: true,
        userIsActive: false,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/761115/pexels-photo-761115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 12,
        userName: "Thảo Mai",
        message: "Nhà cậu ở đoạn nào thế",
        time: new Date(2022, 2, 10, 10, 33, 30, 0),
        isNewMessage: false,
        userIsActive: true,
        userIsSendMes: true,
        avatar: 'https://images.pexels.com/photos/1372134/pexels-photo-1372134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 13,
        userName: "Phạm Quân",
        message: "Thật ra hôm trước tớ thấy cái này hay lắm, cậu có muốn xem không",
        time: new Date(2022, 2, 9, 10, 33, 30, 0),
        isNewMessage: true,
        userIsActive: true,
        userIsSendMes: false,
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
]

const ListUserNearMe = [
    {
        userID: 1,
        name: 'Phương My',
        age: 18,
        gender: 'Female',
        address: 'Hà Nội',
        latitude: 37.421071,
        longitude: -122.085137,
        photo: 'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
        userID: 2,
        name: 'Mỹ Lệ',
        age: 28,
        gender: 'Female',
        address: 'Cần Thơ',
        latitude: 37.68,
        longitude: -122.3,
        photo: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 3,
        name: 'Thành Nam',
        age: 23,
        gender: 'Male',
        address: 'TP. Hồ Chí Minh',
        latitude: 37.4219537,
        longitude: -122.2,
        photo: 'https://images.pexels.com/photos/8450454/pexels-photo-8450454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 4,
        name: 'Thảo Chi',
        age: 18,
        gender: 'Female',
        address: 'Hà Nội',
        latitude: 37.10,
        longitude: -122.0840252,
        photo: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 5,
        name: 'Đỗ Huy',
        age: 19,
        gender: 'Male',
        address: 'Bắc Giang',
        latitude: 37.32,
        longitude: -122.2,
        photo: 'https://images.pexels.com/photos/2915216/pexels-photo-2915216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 6,
        name: 'Thảo Linh',
        age: 32,
        gender: 'Female',
        address: 'Hà Nội',
        latitude: 37.45,
        longitude: -122.095,
        photo: 'https://images.pexels.com/photos/1319911/pexels-photo-1319911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 7,
        name: 'Cẩm Ly',
        age: 27,
        gender: 'Female',
        address: 'Cao Bằng',
        latitude: 37.429,
        longitude: -122.0899,
        photo: 'https://nhansusaigon.com/upload/activation/cosplay/model/thue-model-chuyen-nghiep-hcm-09.jpg'
    },
    {
        userID: 1,
        name: 'Bùi Thảo',
        age: 18,
        gender: 'Female',
        address: 'Ninh Bình',
        latitude: 37.44,
        longitude: -122.056,
        photo: 'https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        userID: 2,
        name: 'Minh Hiếu',
        age: 28,
        gender: 'Male',
        address: 'Quảng Trị',
        latitude: 37.425,
        longitude: -122.0849,
        photo: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 3,
        name: 'Dỗ Tuấn',
        age: 23,
        gender: 'Male',
        address: 'TP. Vinh',
        latitude: 37.44,
        longitude: -122.1,
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 4,
        name: 'Nguyễn Phương',
        age: 25,
        gender: 'Female',
        address: 'Hà Nội',
        latitude: 37.420,
        longitude: -122.06,
        photo: 'https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 5,
        name: 'Hoa Huệ',
        age: 43,
        gender: 'Female',
        address: 'Đà Nẵng',
        latitude: 37.425,
        longitude: -122.089,
        photo: 'https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        userID: 6,
        name: 'Thanh Bình',
        age: 23,
        gender: 'Female',
        address: 'Lạng Sơn',
        latitude: 37.5,
        longitude: -122.1,
        photo: 'https://images.pexels.com/photos/1322129/pexels-photo-1322129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }
]

module.exports = {
    configUserInforTest,
    dataUserTest,
    ListUsersLikedByMe,
    ListUsersLikedMe,
    ChatListData,
    ListUserNearMe
}