import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Button} from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';

import Contact from '../../components/Contact';

class NewChat extends Component {

  _renderHeader(){
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
            <Icon name="arrow-back" style={{color: '#4285f4'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>New Chat</Text>
        </Body>
        <Right/>
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
            <ListItem icon onPress={()=>this.props.navigator.push({screen: 'push.NewGroup'})}>
              <Left>
                <Icon name="contacts" style={{color: '#0C67D0'}}/>
              </Left>
              <Body>
                <Text style={{color: '#0C67D0'}}>New Group</Text>
              </Body>
              <Right/>
            </ListItem>
            <ListItem itemDivider/>
            {this.props.contacts.map((contact, key) => <Contact key={key} contact={contact} {...this.props} />)}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const NewChatContainer = createContainer((props) => {
  return {
    contacts: MO.collection('contacts', 'contactsSub').find({
      'user.profile.firstName': {$regex: props.search, $options: 'i'}
    }),
  }
}, NewChat);


export default class NewChatStateHolder extends Component {

  constructor(){
    super();
    this.state = {
      search: ""
    };
  }

  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };

  render(){
    const {search} = this.state;

    return (
      <NewChatContainer
        search={search}
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
