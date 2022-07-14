import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions } from "react-native";

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default class DisplayImageFullScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            showExitFullScreen: true,
            widthImageShowFullScreen: null,
            heightImageShowFullScreen: null,
            image: props.image,
        }

        this.onSetDimension = this.onSetDimension.bind(this);
        this.onClickToChangeStatus = this.onClickToChangeStatus.bind(this);
    }

    onClickToChangeStatus() {
        this.setState({
            showExitFullScreen: !this.state.showExitFullScreen,
        })
    }

    onSetDimension(even) {
        let widthImageShowFullScreen = widthScreen;
        let heightImageShowFullScreen = widthScreen * this.state.image.height / this.state.image.width;

        if (heightImageShowFullScreen > even.nativeEvent.layout.height) {  // nếu chiều cao của ảnh hiển thị lớn hơn chiều cao tối đa cho phép
            heightImageShowFullScreen = heightScreen;
            widthImageShowFullScreen = heightScreen * this.state.image.width / this.state.image.height;
        }
        this.setState({
            widthImageShowFullScreen, heightImageShowFullScreen
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.showExitFullScreen ? (
                        <View
                            style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: '#f6f6f6',
                                justifyContent: 'center',
                                zIndex: 1,
                                borderBottomColor: 'rgba(220,220,220,0.5)',
                                borderBottomWidth: 2,
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                    height: '100%',
                                    width: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={this.props.onExit}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    color: '#3679fe',
                                    fontWeight: 'bold',
                                    letterSpacing: 0.5,
                                }}
                                >Xong</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
                <TouchableOpacity
                    style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: this.state.showExitFullScreen ? 'white' : 'black',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 0
                    }}
                    activeOpacity={1}
                    onPress={this.onClickToChangeStatus}
                    onLayout={this.onSetDimension}
                >
                    <Image
                        source={{ uri: this.state.image.uri }}
                        style={{
                            width: this.state.widthImageShowFullScreen,
                            height: this.state.heightImageShowFullScreen
                        }}
                    />
                </TouchableOpacity>
                {
                    this.state.showExitFullScreen ? (
                        <View
                            style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: '#f6f6f6',
                                zIndex: 1,
                                borderTopColor: 'rgba(220,220,220,0.5)',
                                borderTopWidth: 2,
                            }}
                        ></View>
                    ) : null
                }
            </View>
        )
    }
}