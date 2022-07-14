import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';

const WIDTH_SCREEN = Dimensions.get('window').width;

export default RoundCard = (props) => {

    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    const [rendered, setRendered] = useState(false); // check xem View đã được render hay chưa

    const refView = useRef();

    useEffect(() => {
        if (refView.current) {
            refView.current.measure((fx, fy, width, height, px, py) => {
                setPositionX(px);
                setPositionY(py);
            })
        }
    }, [rendered, props.isScroll]);

    const onPressCard = () => {
        props.onPress({
            photo: props.photo,
            positionX: positionX,
            positionY: positionY,
            size: (WIDTH_SCREEN - 40) / 3,
        });
    }

    const onLayoutCard = () => {
        setRendered(true);
    }

    const onSetRef = (ref) => {
        refView.current = ref;
    }

    return (
        <TouchableOpacity
            style={[styles.container, props.middle && { top: (WIDTH_SCREEN - 40) / 6 + 67 / 2 }]}
            onPress={onPressCard}
        >
            <View style={styles.contentStyle} >
                <Image
                    style={styles.imageStyle}
                    source={{ uri: props.photo }}
                    ref={onSetRef}
                    onLayout={onLayoutCard}
                />

                <Text style={styles.distanceLabel} >{`${props.distance} km`}</Text>

                <Text
                    style={styles.inforLabel}
                    numberOfLines={2}
                >
                    {`${props.name}, ${props.age}`}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: (WIDTH_SCREEN - 10) / 3,  // minus 10 because paddingHorizontal: 5 of FlatList in parents Component
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    contentStyle: {
        flex: 1,
        alignItems: 'center',
    },
    imageStyle: {
        width: (WIDTH_SCREEN - 40) / 3,
        height: (WIDTH_SCREEN - 40) / 3,
        borderRadius: (WIDTH_SCREEN - 40) / 6,
        borderWidth: 1,
        borderColor: '#006A69'
    },
    distanceLabel: {
        fontSize: 11,
        color: 'white',
        width: 56,
        height: 17,
        bottom: 10,
        borderRadius: 10,
        backgroundColor: 'green',
        textAlign: 'center',
    },
    inforLabel: {
        fontSize: 14,
        letterSpacing: 0.5,
        color: 'white',
        height: 40,
        width: (WIDTH_SCREEN - 40) / 3 - 15,
        textAlign: 'center',
    }
})