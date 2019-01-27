import React from 'react';
import {
    Platform,
    View,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions';

class HeaderBase extends React.Component {

    constructor() {
        super()
        this.state = {};
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    render() {
     
        return (
            <View style={{height:this.props.style[0].HeaderBaseHeight}}>
                <StatusBar
                    backgroundColor="#0e0d0d"
                    barStyle="light-content"
                />
            </View>
        )
    }

}


function mapStateToProps({ style }) {
    return {
        style
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
})(HeaderBase);