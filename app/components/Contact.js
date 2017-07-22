import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Contact extends Component{

  handleNewChat(){
    const {contact, user, navigator} = this.props;

    Meteor.call('chats.initPrivate', user, contact.user, (err, chatId)=>{
      navigator.showModal({
        screen: 'push.Messages',
        passProps: {chatId: chatId}
      });
    });

  }

  render(){
      const {key, contact} = this.props;
      const {user} = contact;

      return (
        <ListItem avatar key={key} onPress={()=>this.handleNewChat()}>
            <Left>
              <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
            </Left>
            <Body>
              <Text>{user.profile.firstName + " " + user.profile.lastName}</Text>
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
