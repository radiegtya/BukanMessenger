import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import moment from 'moment';
import {MO} from '../MO';

class Chat extends Component{

  handleGoToMessages(chatName){
    const {chat, user, navigator} = this.props;


    navigator.showModal({
      screen: 'push.Messages',
      passProps: {
        chatId: chat._id,
        chatName: chatName
      },
    })
  }

  render(){
      const {key, chat, user} = this.props;

      //use default chat.name if type==public, else type==private use username (members) who is not currentLoggedInUser
      let chatName = chat.name;
      if(chat.type == "private" && chat.members){
        if(chat.members[0]._id != user._id)
          chatName = chat.members[0].profile.firstName + " " + chat.members[0].profile.lastName;
        else
          chatName = chat.members[1].profile.firstName + " " + chat.members[1].profile.lastName;
      }

      return (
        <ListItem avatar key={key} onPress={()=>this.handleGoToMessages(chatName)}>
          <Left>
            <Thumbnail source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
          </Left>
          <Body>
            <Text>{chatName}</Text>
            <Text note>{chat.lastMessage.message}</Text>
          </Body>
          <Right>
            <Text note>{moment(chat.lastMessage.date).format("hh:mm A")}</Text>
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
