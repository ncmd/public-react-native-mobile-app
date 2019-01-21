import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import ios_styles from './ChatStylesIOS'
import android_styles from './ChatStylesANDROID'
import Header from '../../components/Header/Header'
import ConnectionStatus from '../../components/Connection/ConnectionStatus'

class Textinput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable={true}
        textAlign={'left'}
        style={{ padding: 12 }}
        autoCorrect={true}
        clearButtonMode={'never'}
        multiline={false}
      />
    );
  }
}

class Chat extends React.Component {

  constructor() {
    super();

    this.state = {
      status: "Disconnected",
      open: false,
      text: '',
      chat: []
    };

    this.send_message = this.send_message.bind(this);
    if (Platform.OS === 'ios') {
      this.socket = new WebSocket('wss://public-go-websockets-prod.herokuapp.com/ws');
    } else if (Platform.OS === 'android') {
      this.socket = new WebSocket('wss://public-go-websockets-prod.herokuapp.com/ws');
    }
  }

  componentDidMount() {

    // When socket opens
    this.socket.onopen = () => {
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      // Check if Socket Open
      // this.socket.send("Open"+rand);
      this.setState({ status: "Connected Chat Socket" })
    }

    // When socket closes
    this.socket.onclose = () => {
      this.socket.send("Closing Chat Socket");
      this.setState({ status: "Disconnected Chat Socket" })
    }

    // When socket receives messages
    this.socket.onmessage = (e) => {
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      this.setState({ chat: [...this.state.chat, { key: rand + e.data, message: e.data }] })
      // this.myFlatList.scrollToEnd({ animated: false })
      this.messageScrollAnimation()


    }
  }

  messageScrollAnimation(){
    if (Platform.OS === 'ios') {
      setTimeout(() => this.myFlatList.scrollToEnd({ animated: false }), 0)
      setTimeout(() => this.myScrollView.scrollToEnd({ animated: false }), 0)
    } else if (Platform.OS === 'android') {
      setTimeout(() => this.myScrollView.scrollToEnd({ animated: false }), 0)
    }
  }

  // Send message
  send_message() {
    this.socket.send(this.state.text)
    this.setState({
      text: ''
    })
    this.messageScrollAnimation()
  }


  // Render chat messages
  _renderItem = ({ item, index }) => (
    <Text style={{ color: 'white' }} key={item.key}><Text style={{ color: '#FD971F' }}>{index}</Text> - {item.message}</Text>
  );

  renderMessageTextbox() {
    return (
      < View style = { styles.container_textbox } >
        <View style={styles.textinput}>
          <Textinput
            multiline={false}
            numberOfLines={1}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={this.send_message} title={"Send"} color="#F92672" />
        </View>
        </View >
    )
  }

  renderAndroid() {
    return (
      <View style={styles.container}>
        <ConnectionStatus ConnectionStatus={this.state.status} />
        {/* Chatbox */}
        <View style={{ height: '80%', marginBottom: 10, flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={(ref) => { this.myScrollView = ref; }}>
            <FlatList
              contentContainerStyle={styles.flatlist}
              ref={(ref) => { this.myFlatList = ref; }}
              data={this.state.chat}
              extraData={this.state}
              keyExtractor={(item, index) => item.key}
              renderItem={this._renderItem}
            />
          </ScrollView>
        </View>
        {/* Textbox */}
        {this.renderMessageTextbox()}
      </View>
    )
  }

  // Render Chatbox 
  renderIos() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ConnectionStatus ConnectionStatus={this.state.status} />
        {this.renderScrollViewChatList()}
        {/* Textbox */}
        {this.renderMessageTextbox()}
      </KeyboardAvoidingView>
    )
  }

  render() {
    if (Platform.OS === 'ios') {
      styles = ios_styles
      renderPlatform = this.renderIos()
    } else if (Platform.OS === 'android') {
      styles = android_styles
      renderPlatform = this.renderAndroid()
    }

    return (
      <View style={styles.base}>
        <Header headerText={'Chat'} />
        {renderPlatform}
      </View>
      // Main Container
    );
  }
}

export default Chat;