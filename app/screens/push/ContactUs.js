import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, Header, Left, Body, Card, CardItem, Text, Icon, Right } from 'native-base';

export default class ContactUs extends Component{

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
            <Icon name="arrow-back" style={{color: '#4285f4', marginLeft: 10}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>Contact us</Text>
        </Body>
        <Right/>
      </Header>
    )
  }

  render(){
    return (
      <Container>
        <Content>
          {this._renderHeader()}

          <Text note>You can find us here:</Text>
          <Card>
              <CardItem>
                <Icon name="logo-whatsapp" style={{color:'#00C626'}}/>
                <Text>+6285641278479</Text>
                <Right/>
             </CardItem>
             <CardItem>
               <Icon name="mail" style={{color: '#00B5E8'}}/>
               <Text>radiegtya@yahoo.co.id</Text>
               <Right/>
             </CardItem>
             <CardItem>
               <Icon name="logo-facebook" style={{color: '#32599D'}}/>
               <Text>{"https://www.facebook.com/ega.sdr"}</Text>
               <Right/>
             </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }

}
