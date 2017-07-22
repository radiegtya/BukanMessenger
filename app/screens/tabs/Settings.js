import React, {Component} from 'react';
import {TouchableOpacity, AsyncStorage} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Form} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';
import {startSingleScreenApp} from '../index';

class Settings extends Component {

  _renderHeader(){
    const {turnOnEdit, firstName, handleDone, handleTurnOnEdit, user} = this.props;
    const validationCondition = firstName != "";

    return (
      <Header>
        <Left/>
        <Body>
          <Text>Settings</Text>
        </Body>
        <Right>
          {!turnOnEdit?
            (
              <TouchableOpacity onPress={()=>handleTurnOnEdit(user)}>
                <Text style={{color: '#4285f4', marginRight: 10}}>Edit</Text>
              </TouchableOpacity>
            ):
            (
              <TouchableOpacity onPress={()=>handleDone(validationCondition)}>
                <Text style={{color: validationCondition?'#4285f4':'#d0d0d0', marginRight: 10}}>Done</Text>
              </TouchableOpacity>
            )
          }
        </Right>
      </Header>
    )
  }

  render(){
    const {turnOnEdit, user, firstName, lastName, setState, handleSignOut} = this.props;
    const {profile} = user;
    const name = profile.firstName + " " + profile.lastName;

    return (
      <Container>

        {this._renderHeader()}

        {/* === Content Start === */}
        <Content>
          {/* Profile */}
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
              </Left>
              {!turnOnEdit?
                (
                  <Body>
                    <Text>{name}</Text>
                    <Text note style={{color: "#4285f4"}}>online</Text>
                  </Body>
                ):
                (
                  <Body>
                    <Form>
                      <Item>
                        <Input placeholder="First Name" value={firstName} onChangeText={(text) => setState({firstName: text})}/>
                      </Item>
                      <Item>
                        <Input placeholder="Last Name" value={lastName} onChangeText={(text) => setState({lastName: text})}/>
                      </Item>
                    </Form>
                  </Body>
                )
              }
              <Right/>
            </ListItem>
            <ListItem>
              <Text style={{color: '#4285f4'}}>Set Profile Picture</Text>
            </ListItem>
          </List>
          {/* Profile */}

          <ListItem itemDivider/>

          {/* List */}
          <List>

            {/* FAQ */}
            <ListItem>
              <Left>
                <Text>BukanChat FAQ</Text>
              </Left>
              <Body/>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
            {/* FAQ End */}

            {/* Contact us */}
            <ListItem>
              <Left>
                <Text>Contact us</Text>
              </Left>
              <Body/>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
            {/* Contacts us End */}

          </List>
          {/* List End */}

          <ListItem itemDivider/>

          {/* List */}
          <List>
            {/* Sign out */}
            <ListItem>
              <Left>
                <TouchableOpacity onPress={()=>handleSignOut()}>
                  <Text style={{color: '#E20000'}}>Sign out</Text>
                </TouchableOpacity>
              </Left>
              <Body/>
              <Right/>
            </ListItem>
            {/* Sign out End */}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}


const SettingsContainer = createContainer((props) => {
  return {
    user: MO.user(),
  };
}, Settings);


export default class SettingsStateHolder extends Component {

  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      turnOnEdit: false,
    };
  }

  handleDone(validationCondition){
    if(validationCondition){
      const user = MO.user();
      const {firstName, lastName} = this.state;
      Meteor.collection('users').update(user._id, {
        $set: {
          'profile.firstName': firstName,
          'profile.lastName': lastName
        }
      }, ()=>{
        this.setState({turnOnEdit: false});
      });
    }
  }

  handleTurnOnEdit(user){
    this.setState({
      turnOnEdit: true,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName
    })
  }

  handleSignOut(){
    AsyncStorage.removeItem('@AuthStore:isLoggedIn', ()=>{
      Meteor.logout();
      startSingleScreenApp();
    });
  }

  render(){
    return (
      <SettingsContainer
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        turnOnEdit={this.state.turnOnEdit}
        handleDone={this.handleDone.bind(this)}
        handleSignOut={this.handleSignOut.bind(this)}
        handleTurnOnEdit={this.handleTurnOnEdit.bind(this)}
        setState={this.setState.bind(this)}
        {...this.props}
      />
    )
  }

}

//NativeBase styling basic obj
const styles = {
  searchBar: {
    backgroundColor: '#ededed',
    marginLeft: 10,
    margin: 10,
    height: 25
  },
}
