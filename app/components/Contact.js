import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class Contact extends Component{


  render(){
      const {key, user} = this.props;

      return (
        <ListItem avatar key={key}>
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
  const {userId} = props.contact;
  MO.subscribe('userSub', 'users', userId);

  return {
    user: MO.collection('users').findOne(userId)
  }

}, Contact);
