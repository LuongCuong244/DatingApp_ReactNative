import React, { useEffect, useState, useRef } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Text
} from 'react-native';

export default SmallCard = ({ name, age, address, photo, widthFlatList = 200, onPress, isScroll, radius }) => {

    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    const [rendered, setRendered] = useState(false); // check xem View đã được render hay chưa

    const refView = useRef();

    const borderRadius = radius === 0 ? 0 : (13 * (widthFlatList / 2 - 30) / 130);

    const formatName = () => {
        let userName = name;
        let arr = userName.split(' ');
        return arr[arr.length - 1].trim() + ", " + age;
    }

    const setLayoutPosition = () => {
        if (refView.current) {
            refView.current.measure((fx, fy, width, height, px, py) => {
                setPositionX(px);
                setPositionY(py);
            })
        }
    }

    const onSetRef = (ref) => refView.current = ref;

    const onLayoutCard = () => {
        setRendered(true);
    }

    const onPressCard = () => {
        onPress && onPress({
            name: name,
            age: age,
            address: address,
            photo: photo,
            widthFlatList: widthFlatList,
            positionX: positionX,
            positionY: positionY,
            width: widthFlatList / 2 - 10,
            height: (widthFlatList / 2 - 30) * 3 / 2 + 20,
            borderRadius: borderRadius,
        });
    }

    useEffect(() => {
        setLayoutPosition();
    }, [rendered, widthFlatList, isScroll]);

    return (
        <View
            style={{ width: widthFlatList / 2 - 10, justifyContent: 'center', alignItems: 'center', padding: 10, }}
            ref={onSetRef}
            onLayout={onLayoutCard}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressCard}
            >
                <ImageBackground
                    style={{
                        width: widthFlatList / 2 - 30,
                        height: (widthFlatList / 2 - 30) * 3 / 2,
                        borderRadius: borderRadius,
                        flexDirection: 'column-reverse'
                    }}
                    imageStyle={[styles.backgroundOfCard, { borderRadius: borderRadius }]}
                    source={{ uri: photo }}
                >
                    <View
                        style={[
                            styles.inforWrapper,
                            {
                                borderBottomRightRadius: borderRadius,
                                borderBottomLeftRadius: borderRadius,
                            }
                        ]}
                    >
                        <Text style={styles.nameLabel} numberOfLines={1} >{formatName()}</Text>
                        <Text style={styles.addressLabel} numberOfLines={1} >{address}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContent: {
        width: '100%',
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'rgba(108,196,198,0.3)',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'white',
    },
    scrollStyle: {
        flexGrow: 1,
        padding: 10,
    },
    backgroundOfCard: {
        // borderWidth: 1,
        // borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    inforWrapper: {
        height: 42,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
    },
    nameLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.5,
    },
    addressLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 0.5
    }
})