import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform,
    TouchableHighlight,
    FlatList,
    ScrollView,
    StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import { Actions } from 'react-native-router-flux';
import { setBottomNavigation } from '../../redux/actions/actions_bottom_navigation';
import NavigationBase from '../../components/Navigation/NavigationBase';
import PortfolioMain from '../../views/Portfolio/PortfolioMain';
import SearchMain from '../../views/Search/SearchMain';
import AccountMain from '../../views/Account/AccountMain';

class BaseMain extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
        }
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    renderView() {
        if (this.props.bottomnavigation == 'portfolio') {
            return (
                <PortfolioMain />
            )
        } else if (this.props.bottomnavigation == 'search') {
            return (
                <SearchMain />
            )
        } else if (this.props.bottomnavigation == 'account') {
            return (
                <AccountMain />
            )
        }
    }

    render() {
        // Initializing Props from ./redux/reducers/stylesReducer.js
        const { loading } = this.props;

        return (
            !loading && <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <View style={{ flex: 1 }}>
                    {this.renderView()}
                </View>
                <NavigationBase />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ style, bottomnavigation }) {
    return {
        style, bottomnavigation
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    setBottomNavigation,
})(BaseMain);