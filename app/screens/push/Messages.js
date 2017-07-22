import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';

class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });
    const {user, chatId} = this.props;

    Meteor.collection('messages').insert({
      text: messages[0].text,
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: user._id,
        name: user.profile.firstName + ' ' + user.profile.lastName,
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      },
      chatId: chatId
    })
  }

  render() {
    const {user, messages} = this.props;

    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={this.onSend}
        user={{
          _id: user._id,
        }}
      />
    );
  }

}

export default createContainer((props)=>{
  const selector = {chatId: props.chatId};
  const options = {sort: {createdAt: -1}};
  MO.subscribe('messagesSub', 'messages', selector, options);

  return {
    user: MO.user(),
    messages: MO.collection('messages', 'messagesSub').find(selector, options).reverse()
  }

}, Messages);
