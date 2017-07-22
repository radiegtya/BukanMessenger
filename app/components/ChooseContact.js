import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right, CheckBox} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../MO';

class ChooseContact extends Component{

  handleCheck(isUserExistsOnMembers, user){
    //this is members from parent state
    let members = this.props.members;

    //if members contains userId exists on current members
    if (isUserExistsOnMembers) {
      members = members.filter(function(member) { return member._id != user._id; });
    }else{
      members.push(user);
    }

    //push members to parent state
    this.props.setState({members: members});
  }

  render(){
      const {key, contact, members} = this.props;
      const {user} = contact;
      const isUserExistsOnMembers = members.filter(function(member) { return member._id == user._id; }).length > 0;

      return (
        <ListItem avatar key={key}>
            <CheckBox checked={isUserExistsOnMembers} onPress={()=>this.handleCheck(isUserExistsOnMembers, user)}/>
            <Left style={{marginLeft: 10}}>
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

  return {
    user: MO.user()
  }

}, ChooseContact);
