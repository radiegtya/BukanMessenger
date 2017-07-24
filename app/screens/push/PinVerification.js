import React, {Component} from 'react';
import {TouchableOpacity, AsyncStorage} from 'react-native';
import { Container, Content, Item, Input, Text, Button } from 'native-base';
import Meteor from 'react-native-meteor';
import {startTabBasedApp} from '../index';

export default class PinVerification extends Component {

  static navigationOptions = {
     title: 'Your PIN'
  };

  constructor(){
    super();
    this.state = {
      pinInput: ""
    }
  }

  signIn(){
    const {pin, phoneNumber} = this.props;
    const {pinInput} = this.state;

    //validate pin
    if(pinInput != pin){
      alert('Please input correct PIN.');
    }else{
      Meteor.call('users.verifyPhoneNumber', phoneNumber, pin, (err, res)=>{
        if(!err){
          Meteor.loginWithPassword(phoneNumber, ""+ pin, (err)=>{
            if(err){
              alert(err.reason);
            }else{
              AsyncStorage.setItem('@AuthStore:isLoggedIn', 'true', ()=>{
                startTabBasedApp();
              });
            }
          });
        }
      });
    }
  }

  componentDidMount(){
    //for now use alert to get PIN, comment code below on production!
    const {pin, phoneNumber} = this.props;
    alert("This is for DEMO purpose.\n Remove in production!\n\n Your PIN: " + pin);
    //comment end
  }

  render(){
    const {pin, phoneNumber} = this.props;

    return (
      <Container style={styles.container}>
        <Content>
          <Item style={styles.textInput}>
            <Input
              placeholder="Input PIN"
              keyboardType={"numeric"}
              onChangeText={(text) => this.setState({pinInput: text})}/>
          </Item>

          <Text style={styles.textInfo}>We have sent you an SMS with a PIN</Text>
          <Text style={styles.textInfo}>to the number</Text>
          <Text style={styles.textPhoneNumber}>{phoneNumber}</Text>

          <Button block style={{marginTop: 20}} onPress={()=>this.signIn()}>
            <Text>Verify</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    marginBottom: 20,
  },
  textInfo: {
    textAlign: 'center'
  },
  textPhoneNumber: {
    textAlign: 'center',
    color: '#4285f4'
  }
};
