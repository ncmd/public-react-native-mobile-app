import React from 'react';
import { 
    Platform,
    Text, 
    View, 
    StyleSheet } from 'react-native';

const Header = (props) => {
    // const { viewStyle, textStyle } = styles;
    if (Platform.OS === 'ios') {
        styles = ios_styles
        return (
            <View style={styles.viewStyleIOS}>
                <Text style={styles.textStyleIOS}>{props.headerText}</Text>
            </View>
        )
    } else if (Platform.OS === 'android') {
        styles = android_styles
        return (
            <View style={styles.viewStyleANDROID}>
                <Text style={styles.textStyleANDROID}>{props.headerText}</Text>
            </View>
        )
    }

    
}

// iOS Styles
const ios_styles = StyleSheet.create({
    viewStyleIOS: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        paddingTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: '#000000'
    }
})

// Android Styles
const android_styles = StyleSheet.create({
    viewStyleANDROID: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingTop: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: '#000000'
    }
})


export default Header;