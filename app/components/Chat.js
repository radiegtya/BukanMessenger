import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Chat extends Component{


  render(){
      const {key, chat, user} = this.props;

      //use default chat.name if type==public, else type==private use username (members) who is not currentLoggedInUser
      let chatName = chat.name;
      if(chat.type == "private" && chat.members){
        if(chat.members[0].username == user.username)
          chatName = chat.members[1].profile.firstName;
        else
          chatName = chat.members[0].profile.firstName;
      }

      return (
        <ListItem avatar key={key}>
          <Left>
            <Thumbnail source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
          </Left>
          <Body>
            <Text>{chatName}</Text>
            <Text note>{chat.lastMessage.message}</Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
      )
  }

}

export default createContainer((props) => {

  return {
    user: MO.user()
  }

}, Chat);
