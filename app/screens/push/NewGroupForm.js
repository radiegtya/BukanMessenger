import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Left, Body, Right, Icon } from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor from 'react-native-meteor';

export default class NewGroupForm extends Component{

  constructor(){
    super();
    this.state = {
      name: "",
    };
  }

  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };

  _renderHeader(){
    const {name} = this.state;
    const validationCondition = name != "";
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
            <Icon name="arrow-back" style={{color: '#4285f4'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>New Group</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>this.handleCreate(validationCondition)}>
            <Text style={{color: validationCondition ?'#4285f4':'#d0d0d0', marginRight: 10}}>Create</Text>
          </TouchableOpacity>
        </Right>
      </Header>
    )
  }

  handleCreate(validationCondition){
    const {name} = this.state;
    const {members} = this.props;

    if(validationCondition){
      Meteor.call('chats.initGroup', name, members, (err, chatId)=>{
        if(chatId){
          this.props.navigator.push({
            screen: 'push.Messages',
            passProps: {
              chatId: chatId,
              chatName: name
            }
          });
        }
      });
    }
  }

  render(){
    return (
      <Container>
        <Content>
          {this._renderHeader()}

          <Form>
            <Item>
              <Input placeholder="Group Name" onChangeText={(text) => this.setState({name: text})}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }

}
