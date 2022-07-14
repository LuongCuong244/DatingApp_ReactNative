import React, { Component } from "react";
import { TouchableOpacity, View, Dimensions, StyleSheet, Animated, Keyboard } from "react-native";
import CardFocusIcon from '../../assets/vectors/tabs/card-swipe-focus.svg';
import CardNotFocusIcon from '../../assets/vectors/tabs/card-swipe-not-focus.svg';
import FavouriteFocusIcon from '../../assets/vectors/tabs/favourite-focus.svg';
import FavouriteNotFocusIcon from '../../assets/vectors/tabs/favourite-not-focus.svg';
import HomeFocusIcon from '../../assets/vectors/tabs/home-focus.svg';
import HomeNotFocusIcon from '../../assets/vectors/tabs/home-not-focus.svg';
import ChatsFocusIcon from '../../assets/vectors/tabs/chats-focus.svg';
import ChatsNotFocusIcon from '../../assets/vectors/tabs/chats-not-focus.svg';
import UserFocusIcon from '../../assets/vectors/tabs/user-focus.svg';
import UserNotFocusIcon from '../../assets/vectors/tabs/user-not-focus.svg';

const WIDTH = Dimensions.get('window').width;

const Icons = [
    {
        name: 'CardSwipeTab',
        focus: CardFocusIcon,
        notFocus: CardNotFocusIcon,
    },
    {
        name: 'FavouriteTab',
        focus: FavouriteFocusIcon,
        notFocus: FavouriteNotFocusIcon,
    },
    {
        name: 'HomeTab',
        focus: HomeFocusIcon,
        notFocus: HomeNotFocusIcon,
    },
    {
        name: 'ChatsTab',
        focus: ChatsFocusIcon,
        notFocus: ChatsNotFocusIcon,
    },
    {
        name: 'UserTab',
        focus: UserFocusIcon,
        notFocus: UserNotFocusIcon,
    },
]

export default class CustomTabs extends Component {

    state = {
        translate: new Animated.Value(0),
        visible: true,
        opacity: new Animated.Value(1),
        height: new Animated.Value(45),
    }

    componentDidMount() {
        this.showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            //Whenever keyboard did show make it don't visible
            this.animFadeOut();
        });
        this.hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            this.state.opacity.setValue(1);
            this.state.height.setValue(45);
            this.setState({
                visible: true,
            })
        });
    }

    componentWillUnmount() {
        this.showSubscription.remove();
        this.hideSubscription.remove();
    }

    animFadeOut() {
        Animated.timing(this.state.height, {
            duration: 200,
            toValue: 0,
            useNativeDriver: false,
        }).start();
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 0,
            useNativeDriver: false,
        }).start(() => {
            this.setState({
                visible: false,
            })
        });
    }

    startAnim(toValue) {
        Animated.timing(this.state.translate, {
            toValue: toValue,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }

    render() {

        const { state, descriptors, navigation } = this.props;

        return this.state.visible && (
            <Animated.View
                style={[
                    styles.container,
                    {
                        height: this.state.height,
                    },
                    {
                        transform: [{
                            scaleY: this.state.opacity
                        }]
                    }
                ]}
            >
                <Animated.View
                    style={{
                        width: WIDTH / 5,
                        height: 45,
                        backgroundColor: 'rgba(125,125,125,0.2)',
                        position: 'absolute',
                        transform: [
                            { translateX: this.state.translate }
                        ]
                    }}
                />

                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    // const label =
                    //     options.tabBarLabel !== undefined
                    //         ? options.tabBarLabel
                    //         : options.title !== undefined
                    //             ? options.title
                    //             : route.name;

                    const isFocused = state.index === index;

                    const item = Icons.find((element) => element.name == route.name);
                    const Icon = isFocused ? item.focus : item.notFocus;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }

                        this.startAnim(index * (WIDTH / 5));
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            activeOpacity={1}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={styles.tabBarStyle}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Icon width={25} height={25} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: '100%',
        backgroundColor: '#324B4C',
    },
    tabBarStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})