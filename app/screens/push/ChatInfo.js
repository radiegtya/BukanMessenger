import React, {Component} from 'react';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Form} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';
import Avatar from '../../components/Avatar';
import {MO} from '../../MO';
import Contact from '../../components/Contact';

class ChatInfo extends Component {

  _renderHeader(){
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
            <Icon name="arrow-back" style={{color: '#4285f4'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>Info</Text>
        </Body>
        <Right/>
      </Header>
    )
  }

  //leave from chat
  handleLeave(){
    const {chatId, user} = this.props;

    //delay leave chat action, because will make subscription crash!!
    setTimeout(()=>{
      Meteor.collection('chats').update(chatId, {$pull: {
        members: {_id: user._id}
      }});
    }, 1500);

    //directly pop out to root
    this.props.navigator.popToRoot();
  }

  render(){
    let {chatName, toUser, chat} = this.props;
    let avatarUri = null;
    //if obj.toUser exists, thats mean chat type == private
    if(toUser){
        avatarUri = toUser.profile.picture? toUser.profile.picture: null;
        const {profile} = toUser;
        chatName = profile.firstName + " " + profile.lastName;
    }

    return (
      <Container>

        {this._renderHeader()}

        {/* === Content Start === */}
        <Content>
          {/* Profile */}
          <List>
            <ListItem avatar style={{marginTop: 10}}>
              <Left>
                <Avatar
                  uri={avatarUri? avatarUri: null}
                  text={avatarUri? null: chatName}
                />
              </Left>
              <Body>
                <Text>{chatName}</Text>
                <Text note style={{color: "#4285f4"}}>{toUser?'online':'BukanMessenger Group'}</Text>
              </Body>
              <Right/>
            </ListItem>
          </List>
          {/* Profile */}

          {/* Members or user phone number if private type chat */}
          {toUser?
            (
              <List>
                <ListItem itemDivider/>
                <ListItem icon>
                  <Left>
                    <Icon name="call"/>
                  </Left>
                  <Body>
                    <Text>{toUser.username}</Text>
                  </Body>
                  <Right/>
                </ListItem>
              </List>
            ):
            (
              <List>
                <ListItem itemDivider>
                  <Text>Members</Text>
                </ListItem>
                {chat.members.map((member, key)=> <Contact key={key} contact={{user: member}} {...this.props}/>)}
              </List>
            )
          }
          {/* Members or user phone End */}

          <ListItem itemDivider/>

          {/* List */}
          <List>
            {/* Leave */}
            <ListItem>
              <Left>
                <TouchableOpacity onPress={()=>this.handleLeave()}>
                  <Text style={{color: '#E20000'}}>Leave</Text>
                </TouchableOpacity>
              </Left>
              <Body/>
              <Right/>
            </ListItem>
            {/* Leave End */}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const ChatInfoContainer = createContainer((props)=>{
  return {
    user: MO.user(),
    chat: MO.collection('chats', 'chatsSub').findOne(props.chatId)
  }
}, ChatInfo);

ChatInfoContainer.navigatorStyle = {
  navBarHidden: true,
  tabBarHidden: true
};

export default ChatInfoContainer;
