import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

export default function HomeTab (props){
    return (
        <View style = {sytles.screenStyle} >
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('SearchByDistance');
                }}
                style = {sytles.buttonStyle}
            >
                <Text style = {sytles.labelButton} >Tìm kiếm quanh đây</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('QuickSearch');
                }}
                style = {sytles.buttonStyle}
            >
                <Text style = {sytles.labelButton} >Tìm kiếm nhanh</Text>
            </TouchableOpacity>
        </View>
    )
}

const sytles = StyleSheet.create({
    screenStyle: {
        backgroundColor: '#00444E',
        flex: 1,
        alignItems: 'center',
    },
    buttonStyle: {
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    labelButton: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black'
    }
})