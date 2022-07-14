import { duration } from 'moment';
import { Animated } from 'react-native';

const leftToRight = ({ current, next, layouts: { screen } }) => {

    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateX: progress.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [
                            screen.width,
                            0,
                            screen.width * -0.8,
                        ],
                    })
                },
            ],
        },
    };
};

const rightToLeft = ({ current, next, layouts: { screen } }) => {

    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateX: progress.interpolate({
                        inputRange: [0, 1, 2], // màn hình kế tiếp sẽ là 0 --> 1, màn hình hiện tại sẽ là 1 --> 2
                        outputRange: [
                            - screen.width,
                            0,
                            screen.width * 0.8,
                        ],
                    })
                },
            ],
        },
    };
};

const bottomToTop = ({ current, next, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateY: progress.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [
                            screen.height,
                            0,
                            screen.height * -0.7,
                        ],
                    })
                },
            ],
        },
    };
}

const forFade = ({ current, next }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
            : 0
    );

    return {
        cardStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, 1, 0,],
            }),
            // transform: [{
            //     scale: progress.interpolate({
            //         inputRange: [0, 1, 2],
            //         outputRange: [0.9, 1, 0.9],
            //     }),
            // }]
        },
    };
}

const fromLeftTop = ({ current, next, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
            : 0
    );

    return {
        cardStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1, 2], // màn hình kế tiếp sẽ là 0 --> 1, màn hình hiện tại sẽ là 1 --> 2
                outputRange: [0, 1, 1],
            }),
            transform: [{
                // translateX: progress.interpolate({
                //     inputRange: [0, 1, 2], // màn hình kế tiếp sẽ là 0 --> 1, màn hình hiện tại sẽ là 1 --> 2
                //     outputRange: [
                //         - 0.5*screen.width,
                //         0,
                //         0,
                //     ],
                // }),
                translateY: progress.interpolate({
                    inputRange: [0, 1, 2], // màn hình kế tiếp sẽ là 0 --> 1, màn hình hiện tại sẽ là 1 --> 2
                    outputRange: [
                        - screen.height,
                        0,
                        0,
                    ],
                }),
                scale: progress.interpolate({
                    inputRange: [0, 1, 2], // màn hình kế tiếp sẽ là 0 --> 1, màn hình hiện tại sẽ là 1 --> 2
                    outputRange: [0.8, 1, 1],
                }),
            }]
        },
    };
}

export default {
    leftToRight,
    rightToLeft,
    forFade,
    fromLeftTop,
    bottomToTop,
    transitionSpecWithTiming: (duration) => {
        return {
            open: {
                animation: 'timing',
                config: {
                    duration,
                }
            },
            close: {
                animation: 'timing',
                config: {
                    duration,
                }
            }
        }
    }
}