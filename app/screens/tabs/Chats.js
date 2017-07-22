import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';

class Chats extends Component {
  render() {
    console.log(this.props.chats)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Chats
        </Text>
      </View>
    );
  }
}

export default createContainer((props)=>{
  Meteor.subscribe('chats');

  return {
    chats: Meteor.collection('chats').find({})
  }
}, Chats);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
