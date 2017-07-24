import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, Header, Left, Body, Card, CardItem, Text, Icon, Right } from 'native-base';

export default class Faq extends Component{

  constructor(){
    super();
  }

  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };

  _renderHeader(){
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
            <Icon name="arrow-back" style={{color: '#4285f4'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>FAQ</Text>
        </Body>
        <Right/>
      </Header>
    )
  }

  render(){
    return (
      <Container>
        {this._renderHeader()}
        <Content>
          <Text>For now please refer to our github page:</Text>
          <Text note>{'https://github.com/radiegtya/BukanMessenger'}</Text>

        </Content>
      </Container>
    );
  }

}
