import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';
import Avatar from './Avatar';

class Contact extends Component{

  handleNewChat(){
    const {contact, user, navigator} = this.props;

    Meteor.call('chats.initPrivate', user, contact.user, (err, chatId)=>{
      if(chatId){
        navigator.push({
          screen: 'push.Messages',
          passProps: {
            chatId: chatId,
            chatName: contact.user.profile.firstName + ' ' + contact.user.profile.lastName,
            toUser: contact.user
          },
        });
      }
    });

  }

  render(){
      const {key, contact} = this.props;
      const {user} = contact;
      const name = user.profile.firstName + " " + user.profile.lastName;

      return (
        <ListItem avatar key={key} onPress={()=>this.handleNewChat()}>
            <Left>
            <Avatar
              uri={user.profile.picture? user.profile.picture: null}
              text={user.profile.picture? null: name}
              small={true}
            />
            </Left>
            <Body>
              <Text>{name}</Text>
            </Body>
            <Right/>
        </ListItem>
      )
  }

}

export default createContainer((props) => {
  // const {userId} = props.contact;
  // MO.subscribe('userSub', 'users', userId);

  return {
    user: MO.user()
  }

}, Contact);
