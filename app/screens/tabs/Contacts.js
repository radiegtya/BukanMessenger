import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';

class Contacts extends Component {
  
  render() {
    console.log(this.props.contacts)

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Contact
        </Text>
        <TouchableOpacity onPress={()=>this.props.navigator.push({screen: 'push.NewContact'})}>
          <Text>Go to NewContact</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default createContainer((props)=>{
  Meteor.subscribe('users');

  return {
    user: Meteor.user(),
    contacts: Meteor.collection('users').find({})
  }
}, Contacts);

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
