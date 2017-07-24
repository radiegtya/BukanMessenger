import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Button} from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';

import ChooseContact from '../../components/ChooseContact';

class NewGroup extends Component {

  _renderHeader(){
    const {navigator, handleNext, members} = this.props;

    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={()=>navigator.pop()}>
            <Icon name="arrow-back" style={{color: '#4285f4'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>New Group</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>handleNext()}>
            <Text style={{color: members.length > 0? '#4285f4': '#d0d0d0', marginRight: 10}}>Next</Text>
          </TouchableOpacity>
        </Right>
      </Header>
    )
  }

  render(){
    return (
      <Container>

        {this._renderHeader()}

        {/* === Content Start === */}
        <Content>
          {/* Search Bar */}
          <Item rounded style={styles.searchBar}>
            <Icon name="search" style={styles.searchText} />
            <Input placeholder="Search for contacts" style={styles.searchText} onChangeText={(text) => this.props.setState({search: text})}/>
          </Item>
          {/* Search Bar End */}

          {/* List */}
          <List>
            {this.props.contacts.map((contact, key) => <ChooseContact key={key} contact={contact} {...this.props} />)}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const NewGroupContainer = createContainer((props) => {
  return {
    contacts: MO.collection('contacts', 'contactsSub').find({
      'user.profile.firstName': {$regex: props.search, $options: 'i'}
    }),
    user: MO.user()
  }
}, NewGroup);


export default class NewGroupStateHolder extends Component {

  constructor(){
    super();
    this.state = {
      search: "",
      members: []
    };
  }

  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };

  handleNext(){
    const {members} = this.state;
    const user = MO.user();

    //add currentLoggedIn user in members
    const isUserExistsOnMembers = members.filter(function(member) { return member._id == user._id; }).length > 0;
    if(!isUserExistsOnMembers)
      members.push(user);

    if(members.length > 0){
      this.props.navigator.push({
        screen: 'push.NewGroupForm',
        passProps: {
          members: members
        }
      })
    }
  }

  render(){
    const {search, members} = this.state;

    return (
      <NewGroupContainer
        search={search}
        members={members}
        handleNext={this.handleNext.bind(this)}
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
  searchText: {
    fontSize: 14,
  }
}
