import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image, Text, LogBox, Dimensions, Modal, Pressable, ScrollView } from "react-native";
import { GiftedChat, Avatar, Bubble, Send, InputToolbar, Actions, Composer, Day } from "react-native-gifted-chat/";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from "react-native-image-crop-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-controls';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment, { duration } from "moment";
import DocumentPicker from 'react-native-document-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SoundPlayer from 'react-native-sound-player';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Chat_API from '../api/Chat.api';
import DisplayImageFullScreen from '../components/DisplayImageFullScreen';

LogBox.ignoreLogs(['Animated.event now requires a second argument for options']);

const widthScreen = Dimensions.get('window').width;

let playingAudioProcess;

export default class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guest: null,
            messages: [],
            video: null,
            file: null,
            audio: null,
            videoToShowFullScreen: null,
            imageToShowFullScreen: null,
            widthImageShowFullScreen: null,
            heightImageShowFullScreen: null,
            showExitFullScreen: true,
            isPlayingAudio: false,
            audioPlaying_ID: null,
            timeRemaining: null,
        }
        this.renderActions = this.renderActions.bind(this);
        this.renderMessageVideo = this.renderMessageVideo.bind(this);
        this.renderMessageImage = this.renderMessageImage.bind(this);
        this.renderSend = this.renderSend.bind(this);
        this.renderChatFooter = this.renderChatFooter.bind(this);
        this._onSend = this._onSend.bind(this);
        this.goBack = this.goBack.bind(this);
        this.showProfile = this.showProfile.bind(this);
        this.onBackVideoPlayer = this.onBackVideoPlayer.bind(this);
        this.onExitImageFullScreen = this.onExitImageFullScreen.bind(this);
    }

    componentDidMount() {
        const id = this.props.route.params.userID;
        Chat_API.getMessagesAndGuestInfor((messages, infor) => {
            this.setState({
                message: messages,
                guest: {
                    ...infor,
                    userName: this.props.route.params.userName, // có thể xóa
                    avatar: this.props.route.params.avatar, // có thể xóa
                },
            })
        }, id);
    }

    async componentWillUnmount() {
        if (playingAudioProcess) {
            clearInterval(playingAudioProcess);
        }
        let infor = await SoundPlayer.getInfo();
        if (infor) {
            SoundPlayer.stop();
        }
    }

    _onSend(message = []) {
        if (this.state.file) {
            message[0].image = this.state.file;
            this.setState({
                file: null,
            })
        }
        if (this.state.video) {
            message[0].video = this.state.video;
            this.setState({
                video: null,
            })
        }

        message[0].sent = false;
        message[0].received = false;
        message[0].pending = true;

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message[0]),
        }));

        //Chat_API.sendMessage(this.updateMesssages,message[0]);
    }

    renderAvatar(props) {
        return (
            <Avatar
                {...props}
                imageStyle={{
                    left: {
                        height: 35,
                        width: 35,
                        borderRadius: 25
                    }
                }}
            ></Avatar>
        )
    }

    renderBubble(props) {
        const { image, video, audio, file } = props.currentMessage;
        let border = image || video || audio || file;
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: border ? {
                        backgroundColor: '#2e64e5', // màu background tin nhắn
                        borderTopRightRadius: 15,
                    } : {
                        backgroundColor: '#2e64e5', // màu background tin nhắn
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff', // màu chữ tin nhắn
                    },
                }}
                usernameStyle={{ color: '#009688' }}
            ></Bubble>
        )
    }

    renderSend(props) {
        const { text, messageIdGenerator, user, onSend } = props;

        const onPress = async () => {
            onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true);
        }

        return (
            <Send
                {...props}
                disabled={!props.text}
                containerStyle={{
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {
                    !props.text && (this.state.audio || this.state.video || this.state.file) ?
                        <Pressable
                            onPress={onPress}
                        >
                            <Ionicons name="send" size={25} color={'#3979f7'} ></Ionicons>
                        </Pressable>
                        :
                        <Ionicons name="send" size={25} color={'#3979f7'} ></Ionicons>
                }
            </Send>
        );
    }

    renderChatFooter(props) {

        let colorFileBackground = "#979797";

        if (this.state.file && this.state.file.type !== "image") {
            let fileType = this.state.file.type || " ";
            let green = fileType.endsWith('vnd.ms-excel') || fileType.endsWith('vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            let blue = fileType.endsWith('msword') || fileType.endsWith('vnd.openxmlformats-officedocument.wordprocessingml.document');
            let red = fileType.endsWith('vnd.ms-powerpoint') || fileType.endsWith('vnd.openxmlformats-officedocument.presentationml.presentation') || fileType.endsWith('pdf');

            if (green) {
                colorFileBackground = '#007d02';
            } else if (blue) {
                colorFileBackground = '#1857b8';
            } else if (red) {
                colorFileBackground = '#e94732';
            }
        }

        const onClosed = () => {
            this.setState({
                file: null,
                video: null,
            })
        }

        return (
            (this.state.file && this.state.file.type === 'image') || this.state.video ? (
                <View style={{ width: '100%', height: 120, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderTopColor: 'white', borderTopWidth: 2 }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ width: '100%', flex: 1, backgroundColor: '#e9eaee', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ImageBackground
                            style={{
                                height: 100,
                                width: 100,
                                marginTop: 10,
                                marginHorizontal: 15,
                                flexDirection: 'row-reverse'
                            }}
                            imageStyle={{ borderRadius: 15 }}
                            source={{ uri: this.state.video || this.state.file.path }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{ width: 25, height: 25, borderRadius: 20, backgroundColor: 'white', bottom: '10%', right: '12%', justifyContent: 'center', alignItems: 'center' }}
                                onPress={onClosed}
                            >
                                <AntDesign size={25} name="closecircle" color={'#e92121'} />
                            </TouchableOpacity>
                            {
                                this.state.video ? (
                                    <AntDesign size={37} name="playcircleo" color={'white'} style={{ top: '30%', left: '5%' }} />
                                ) : null
                            }
                        </ImageBackground>
                    </ScrollView>
                </View>
            ) : this.state.file ? (
                <View style={{ width: '100%', height: 80, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ width: '100%', flex: 1, backgroundColor: '#e1e2e5', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <View style={{ width: 170, height: 50, borderRadius: 5, flexDirection: 'row', marginTop: 10, backgroundColor: 'white', alignItems: 'center' }}>
                            <View style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: colorFileBackground, borderRadius: 50, marginHorizontal: 10 }}>
                                <FontAwesome size={17} color={'white'} name={'file-text'} />
                            </View>
                            <View style={{ flex: 1, height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        width: '100%',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: 'rgb(50,50,50)',
                                        padding: 0
                                    }}
                                    numberOfLines={2}
                                >{this.state.file.name}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{ width: 22, height: 22, borderRadius: 20, backgroundColor: 'white', bottom: '15%', left: '20%', justifyContent: 'center', alignItems: 'center' }}
                                onPress={onClosed}
                            >
                                <AntDesign size={22} name="closecircle" color={'#f93d6d'} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            ) : null
        )
    }

    renderComposer(props) {
        return (
            <View
                style={{
                    flex: 1,
                    borderRadius: 100,
                    backgroundColor: '#ebeaea',
                    height: 35,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >

                <Composer
                    {...props}
                    textInputStyle={{
                        flex: 1,
                        padding: 0,
                        height: '100%',
                    }}
                />
            </View>
        )
    }

    renderInputToolbar(props) {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    width: '100%',
                    height: 44,
                    backgroundColor: '#fafafa',
                    alignItems: 'center',
                    flexDirection: 'column-reverse',
                    borderTopWidth: 1.5,
                    borderTopColor: 'rgba(170,170,170,0.7)'
                }}
                primaryStyle={{ alignItems: 'center' }}
            />
        );
    }

    renderActions(props) {
        return (
            <Actions
                {...props}
                containerStyle={{
                    width: 40,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 4,
                    marginRight: 4,
                    marginBottom: 0,
                }}
                options={{
                    ['Đính kèm ảnh hoặc video']: async (props) => {
                        try {
                            ImagePicker.openPicker({
                                multiple: false,
                            }).then(res => {
                                if (res.mime.startsWith('image')) {
                                    this.setState({
                                        file: {
                                            type: 'image',
                                            path: res.path,
                                            widthImage: res.width,
                                            heightImage: res.height,
                                        },
                                    })
                                }
                                if (res.mime.startsWith('video')) {
                                    this.setState({
                                        video: res.path,
                                    })
                                }
                            }).catch(e => console.log(e))
                        } catch (e) {
                            console.log("User cancelled! " + e)
                        }
                    },
                    ['Đính kèm file ( âm thanh, văn bản,... )']: async (props) => {
                        try {
                            DocumentPicker.pickSingle({
                                type: [ // tất cả các loại trừ hình ảnh và audio
                                    DocumentPicker.types.plainText,
                                    DocumentPicker.types.audio,
                                    DocumentPicker.types.pdf,
                                    DocumentPicker.types.zip,
                                    DocumentPicker.types.csv,
                                    DocumentPicker.types.doc,
                                    DocumentPicker.types.docx,
                                    DocumentPicker.types.ppt,
                                    DocumentPicker.types.pptx,
                                    DocumentPicker.types.xls,
                                    DocumentPicker.types.xlsx,
                                ],
                            })
                                .then(async (res) => {

                                    if (res.type.startsWith('audio')) {
                                        await this.setState({
                                            isPlayingAudio: false,
                                            audioPlaying_ID: null,
                                            timeRemaining: null,
                                        }, async () => {
                                            await SoundPlayer.loadUrl(res.uri);  // chỗ này có thể gây dừng âm thanh đột ngột
                                        })
                                        let infor = await SoundPlayer.getInfo();
                                        if (playingAudioProcess) {
                                            clearInterval(playingAudioProcess);
                                        }
                                        this.setState({
                                            file: {
                                                type: res.type,
                                                size: res.size,
                                                path: res.uri,
                                                name: res.name,
                                                duration: Math.floor(infor.duration),
                                                isPlaying: false,
                                                timeRemaining: Math.floor(infor.duration),
                                            }
                                        })
                                        return;
                                    }

                                    this.setState({
                                        file: {
                                            type: res.type,
                                            size: res.size,
                                            path: res.uri,
                                            name: res.name,
                                        }
                                    })
                                })
                                .catch(e => console.log(e))
                        } catch (e) {
                            console.log("User cancelled! " + e)
                        }
                    },
                    Cancel: (props) => { }
                }}
                icon={() => (
                    <AntDesign
                        name={'pluscircle'}
                        size={28}
                        color={'#3979f7'}
                    />
                )}
                optionTintColor="#222B45"
                onSend={args => console.log(args)}
            />
        )
    };

    renderMessageImage(props) {
        if (!props.currentMessage.image) {
            return null;
        }
        if (props.currentMessage.image.type === 'image') {
            const width = (props.currentMessage.image.heightImage / props.currentMessage.image.widthImage > 1.5) ? widthScreen * 0.4 : widthScreen * 0.7
            const height = (props.currentMessage.image.heightImage / props.currentMessage.image.widthImage) * width;

            const onPress = () => {
                this.setState({
                    imageToShowFullScreen: {
                        uri: props.currentMessage.image.path,
                        width: props.currentMessage.image.widthImage,
                        height: props.currentMessage.image.heightImage,
                    }
                })
            }

            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ width: width, height: height, borderRadius: 15, marginBottom: 5, }}
                    onPress={onPress}
                >
                    <Image
                        imageProps
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 15,
                        }}
                        source={{ uri: props.currentMessage.image.path }}
                    ></Image>
                </TouchableOpacity>
            )
        }

        if (props.currentMessage.image.type.startsWith('audio')) {

            if (this.state.audioPlaying_ID !== props.currentMessage._id) { // không phải tin nhắn này đang chạy âm thanh
                props.currentMessage.image.isPlaying = false;
                props.currentMessage.image.timeRemaining = props.currentMessage.image.duration;
            }

            const onPlayAudio = () => {
                this.playAudio(props.currentMessage);
            }

            const onValuesChangeFinish = (value) => {
                props.currentMessage.image.timeRemaining = props.currentMessage.image.duration - value[0];
                props.currentMessage.image.isPlaying = true;
                this.setState({
                    timeRemaining: props.currentMessage.image.duration - value[0],
                    audioPlaying_ID: props.currentMessage._id,
                    isPlayingAudio: true,
                })
                SoundPlayer.playUrl(props.currentMessage.image.path);
                SoundPlayer.seek(value[0]);
                this.startProcess(props.currentMessage);
            }

            return (
                <View
                    style={{
                        width: widthScreen * 0.6,
                        maxHeight: 100,
                        borderRadius: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: '#2e64e5'
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onPlayAudio}
                    >
                        <Ionicons size={30} name={props.currentMessage.image.isPlaying ? 'pause' : 'play'} color={'white'} />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginHorizontal: 10,
                        }}
                    >
                        <MultiSlider
                            sliderLength={widthScreen * 0.6 - 50 - 65}
                            values={this.state.audioPlaying_ID === props.currentMessage._id ? [props.currentMessage.image.duration - this.state.timeRemaining] : [props.currentMessage.image.duration - props.currentMessage.image.timeRemaining]}
                            min={0}
                            max={props.currentMessage.image.duration}
                            selectedStyle={{
                                backgroundColor: '#f44a62'
                            }}
                            markerStyle={{
                                backgroundColor: '#f44a62'
                            }}
                            onValuesChangeFinish={onValuesChangeFinish}
                        />
                    </View>
                    <Text style={{
                        width: 50,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>{this.formatTime(props.currentMessage.image.timeRemaining)}</Text>
                </View>
            )
        }

        let fileType = props.currentMessage.image.type || " ";
        let green = fileType.endsWith('vnd.ms-excel') || fileType.endsWith('vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        let blue = fileType.endsWith('msword') || fileType.endsWith('vnd.openxmlformats-officedocument.wordprocessingml.document');
        let red = fileType.endsWith('vnd.ms-powerpoint') || fileType.endsWith('vnd.openxmlformats-officedocument.presentationml.presentation') || fileType.endsWith('pdf');

        let colorFileBackground;
        if (green) {
            colorFileBackground = '#007d02';
        } else if (blue) {
            colorFileBackground = '#1857b8';
        } else if (red) {
            colorFileBackground = '#e94732';
        } else {
            colorFileBackground = '#979797';
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    width: widthScreen * 0.6,
                    maxHeight: 80,
                    borderRadius: 15,
                    flexDirection: 'row',
                    padding: 10,
                    marginBottom: 5,
                    borderColor: 'rgb(220,220,220)',
                    borderWidth: 2,
                    backgroundColor: 'white',
                }}
                onPress={() => {
                    console.log(" Nhấn");
                }}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colorFileBackground,
                        borderRadius: 50,
                        marginRight: 10,
                    }}>
                    <FontAwesome size={17} color={'white'} name={'file-text'} />
                </View>
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            maxHeight: 40,
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'rgb(50,50,50)',
                        }}
                        numberOfLines={2}
                    >{props.currentMessage.image.name}</Text>

                    <Text
                        style={{
                            width: '100%',
                            fontSize: 15,
                            color: '#b3abaf',
                            marginTop: 3,
                            fontWeight: '500'
                        }}
                    >{this.formatFileSize(props.currentMessage.image.size)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderMessageVideo(props) {

        const onEnterFullscreen = () => {
            this.setState({
                videoToShowFullScreen: {
                    uri: props.currentMessage.video
                },
            })
        }

        const onExitFullscreen = () => {
            this.setState({
                videoToShowFullScreen: {
                    uri: props.currentMessage.video
                },
            })
        }

        return <View style={{ height: widthScreen * 0.7, width: widthScreen * 0.7 }}>
            <VideoPlayer
                style={{
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '100%',
                    borderRadius: 15,
                    marginBottom: 5,
                }}
                source={{
                    uri: props.currentMessage.video,
                }}
                tapAnywhereToPause={true}
                navigator={this.props.navigator}
                controlTimeout={5000}
                disableBack={true}
                onEnterFullscreen={onEnterFullscreen}
                onExitFullscreen={onExitFullscreen}
            ></VideoPlayer>
        </View>
    }

    renderTime(props) {
        if (props.currentMessage && props.currentMessage.createdAt) {
            let date = moment(props.currentMessage.createdAt).utcOffset('+0700').format("HH:mm"); // format theo múi giờ VN ( sau này có lẽ cần đổi )
            return (
                <Text style={{ fontSize: 10.5, color: 'white', marginHorizontal: 10, marginBottom: 6, bottom: 1, letterSpacing: 0.3 }}>{date}</Text>
            )
        }
        return null;
    }

    renderDay(props) {
        return (
            <Day
                {...props}
                dateFormat={"DD/MM/YYYY"}
                textStyle={{
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: 15,
                }}
            />
        )
    }

    renderTicks(currentMessage) {

        if (!currentMessage) {
            return null;
        }
        return (
            currentMessage.received ? (
                <Ionicons name="ios-eye-outline" size={17} color={'white'} style={{ bottom: 2, right: 5 }} />
            ) : currentMessage.sent ? (
                <Text
                    style={{
                        bottom: 5,
                        right: 5,
                        color: 'white'
                    }}
                >✓</Text>
            ) : currentMessage.pending ? (
                <MaterialIcons name="panorama-fish-eye" size={15} color={'white'} style={{ bottom: 2, right: 5 }} />
            ) : null

        )
    }

    formatFileSize(size) {
        if (size < 1024) {
            return size + " bytes";
        }
        size = size / 1024;
        if (size < 1024) {
            return Math.round(size) + " KB";
        }
        size = size / 1024;
        if (size <= 500) {
            return size.toFixed(2) + " MB";
        }
        return "File lớn hơn 500MB"
    }

    formatTime(time) {
        let res = "";
        if (time < 3600) { // nhỏ hơn 1 giờ
            if (Math.floor(time / 60) < 10) {
                res += "0" + Math.floor(time / 60) + ":";
            }
            time = time % 60;
            if (time < 10) {
                res += "0";
            }
            res += time;
        } else {
            if (Math.floor(time / 60) < 10) {
                res += "0" + Math.floor(time / 60) + ":";
            }
            time = time % 60;
            if (Math.floor(time / 60) < 10) {
                res += "0" + Math.floor(time / 60) + ":";
            }
            time = time % 60;
            if (time < 10) {
                res += "0";
            }
            res += time;
        }
        return res;
    }

    async playAudio(currentMessage) {
        console.log("Phát audio");
        if (currentMessage.image.isPlaying == false) {
            let infor = await SoundPlayer.getInfo();
            if (infor == null) { // chưa có âm thanh nào trong bộ đệm
                await SoundPlayer.playUrl(currentMessage.image.path);
                await this.setState({
                    audioPlaying_ID: currentMessage._id,
                    timeRemaining: currentMessage.image.timeRemaining,
                })
            } else {
                if (this.state.audioPlaying_ID == currentMessage._id) {
                    await SoundPlayer.resume();
                } else {
                    await SoundPlayer.playUrl(currentMessage.image.path);
                    await this.setState({
                        audioPlaying_ID: currentMessage._id,
                        timeRemaining: currentMessage.image.timeRemaining,
                    })
                }
            }
            this.startProcess(currentMessage);
        } else {
            if (playingAudioProcess) {
                console.log("clear");
                clearInterval(playingAudioProcess);
            }
            SoundPlayer.pause();
        }
        currentMessage.image.isPlaying = !currentMessage.image.isPlaying;
        this.setState({
            isPlayingAudio: !this.state.isPlayingAudio
        })
    }

    startProcess(currentMessage) {

        if (playingAudioProcess) {
            console.log("clear");
            clearInterval(playingAudioProcess);
        }

        playingAudioProcess = setInterval(async () => {
            let infor = await SoundPlayer.getInfo();
            currentMessage.image.timeRemaining = Math.floor(infor.duration - infor.currentTime);
            if (currentMessage.image.timeRemaining <= 0) {
                clearInterval(playingAudioProcess);
                currentMessage.image.isPlaying = false;
                SoundPlayer.stop();
            }
            this.setState({
                timeRemaining: currentMessage.image.timeRemaining,
            })
        }, 700);
    }

    updateMesssages = (messages) => {
        this.setState({
            messages: messages,
        })
    }

    goBack(){
        this.props.navigation.goBack();
    }

    showProfile(){
        this.props.navigation.navigate("UserProfile", {
            likedMe: false,
            isNavigate: true,
        });
    }

    onBackVideoPlayer(){
        this.setState({
            videoToShowFullScreen: null,
        })
    }

    onExitImageFullScreen(){
        this.setState({
            imageToShowFullScreen: null,
        })
    }

    render() {

        const { guest } = this.state;

        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/002/188/833/non_2x/chat-wallpaper-social-media-message-background-copy-space-for-a-text-vector.jpg' }}
            >
                {
                    this.state.guest != null ? (
                        <View style={{ flex: 1 }} >
                            <View View style={styles.header} >
                                <TouchableOpacity
                                    style={styles.backButtonStyle}
                                    activeOpacity={0.7}
                                    onPress={this.goBack}
                                >
                                    <Ionicons name="ios-chevron-back" color={'#e75854'} size={35} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{ flex: 1 }}
                                    onPress={this.showProfile}
                                >
                                    <View
                                        style={styles.inforButton}
                                    >
                                        <Image
                                            style={{ width: 35, height: 35, borderRadius: 20 }}
                                            source={{ uri: this.state.guest.avatar }}
                                        ></Image>

                                        <View style={{ flex: 1, height: '100%', marginLeft: 10, justifyContent: 'center' }} >
                                            <Text
                                                style={styles.userNameStyle}
                                            >{this.state.guest.userName}</Text>
                                            <Text
                                                style={styles.active}
                                            >{this.state.guest.lastActivity}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <GiftedChat
                                messages={this.state.messages}
                                user={{
                                    _id: guest.userID,
                                    name: guest.userName,
                                    avatar: guest.avatar,
                                }}
                                onSend={this._onSend}
                                renderActions={this.renderActions}
                                renderAvatar={this.renderAvatar}
                                renderBubble={this.renderBubble}
                                renderSend={this.renderSend}
                                renderChatFooter={this.renderChatFooter}
                                renderComposer={this.renderComposer}
                                renderInputToolbar={this.renderInputToolbar}
                                renderMessageVideo={this.renderMessageVideo}
                                renderMessageImage={this.renderMessageImage}
                                renderTicks={this.renderTicks}
                                renderTime={this.renderTime}
                                renderDay={this.renderDay}
                                placeholder='Gửi tin nhắn'
                                renderUsernameOnMessage={true}
                                showAvatarForEveryMessage={false}
                                alwaysShowSend={true}
                            />
                        </View>
                    ) : null
                }

                {
                    this.state.videoToShowFullScreen ? (
                        <Modal
                            visible={this.state.videoToShowFullScreen ? true : false}
                            animationType={'slide'}
                        >
                            <VideoPlayer
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                source={{
                                    uri: this.state.videoToShowFullScreen.uri,
                                }}
                                toggleResizeModeOnFullscreen={false}
                                tapAnywhereToPause={true}
                                navigator={this.props.navigator}
                                controlTimeout={5000}
                                disableFullscreen={true}
                                onBack={this.onBackVideoPlayer}
                            ></VideoPlayer>
                        </Modal>
                    ) : null
                }

                {
                    this.state.imageToShowFullScreen ? (
                        <Modal
                            visible={this.state.imageToShowFullScreen ? true : false}
                            animationType={'slide'}
                        >
                            <DisplayImageFullScreen
                                image={this.state.imageToShowFullScreen}
                                onExit={this.onExitImageFullScreen}
                            />
                        </Modal>
                    ) : null
                }
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    backButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    inforButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userNameStyle: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d2d2d'
    },
    active: {
        width: '100%',
        fontSize: 13,
        color: 'gray'
    }
})