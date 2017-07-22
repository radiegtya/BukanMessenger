import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';
import {Container, Content, View, Header, Left, Body, Right, Text, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';

class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  _renderHeader(){
    const {chatName} = this.props;

    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={()=>this.props.navigator.dismissAllModals()}>
            <Icon name="arrow-back" style={{color: '#4285f4', marginLeft: 10}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>{chatName}</Text>
        </Body>
        <Right/>
      </Header>
    )
  }

  onSend(messages = []) {
    const {user, chatId} = this.props;
    const name = user.profile.firstName + ' ' + user.profile.lastName;

    //create new message by chatId
    Meteor.collection('messages').insert({
      text: messages[0].text,
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: user._id,
        name: name,
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      },
      chatId: chatId
    });

    //update lastMessage by chatId
    Meteor.collection('chats').update(chatId, {
      $set: {
        lastMessage: {
          message: messages[0].text,
          from: name,
          createdAt: new Date()
        }
      }
    });
  }

  render() {
    const {user, messages} = this.props;

    return (
      <Container>
        {this._renderHeader()}
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          user={{
            _id: user._id,
          }}
        />
      </Container>
    );
  }

}

const MessagesContainer = createContainer((props)=>{
  const selector = {chatId: props.chatId};
  const options = {sort: {createdAt: -1}};
  MO.subscribe('messagesSub'+props.chatId, 'messages', selector, options);

  const messages = MO.collection('messages', 'messagesSub'+props.chatId).find(selector, options);

  return {
    user: MO.user(),
    messages: messages.length > 0 ? messages.reverse(): []
  }

}, Messages);

MessagesContainer.navigatorStyle = {
  navBarHidden: true
};

export default MessagesContainer;
