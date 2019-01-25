import React from 'react';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    StatusBar
} from 'react-native';

const Header = (props) => {
    // const { viewStyle, textStyle } = styles;
    if (Platform.OS === 'ios') {
        styles = ios_styles
    } else if (Platform.OS === 'android') {
        styles = android_styles
    }

    return (
        <View style={styles.viewStyle}>
            <StatusBar
                backgroundColor="#0e0d0d"
                barStyle="light-content"
            />
            <Text style={styles.textStylePrice}>${props.headerPrice}</Text>
            <Text style={styles.textStyleTicker}>{props.headerTicker}</Text>
        </View>
    )
}

// iOS Styles
const ios_styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#0e0d0d',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        paddingTop: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStylePrice: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    textStyleTicker: {
        fontSize: 15,
        color: '#FFFFFF'
    }
})

// Android Styles
const android_styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#0e0d0d',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStylePrice: {
        fontSize: 25,
        color: '#FFFFFF'
    },
    textStyleTicker: {
        fontSize: 16,
        color: '#FFFFFF'
    }
})


export default Header;