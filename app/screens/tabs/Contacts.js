import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon, Button} from 'native-base';
import RNContacts from 'react-native-contacts';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';

import Contact from '../../components/Contact';

class Contacts extends Component {

  _renderHeader(){
    return (
      <Header>
        <Left/>
        <Body>
          <Text>Contacts</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>this.props.navigator.push({screen: 'NewContact'})}>
            <Icon name="add" style={{color: '#4285f4', marginRight: 10}}/>
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
            {this.props.contacts.map((contact, key) => <Contact key={key} contact={contact} />)}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const ContactsContainer = createContainer((props) => {
  //get all phone contacts, then generate to contacts collection
  RNContacts.getAll((err, contacts) => {
    if(err === 'denied'){
      // x.x
    } else {
      let phoneNumbers = [];
      contacts.forEach((contact)=>{
        contact.phoneNumbers.forEach((phone)=>{
          if(phone.number){
            const formatedPhoneNumber = "+" + phone.number.replace(new RegExp(/[-\/\\^$*+?.()|[\]{}]/g, 'g'), '').replace(/\s/g,'');
            phoneNumbers.push(formatedPhoneNumber);
          }
        });
      });
      phoneNumbers = [...new Set(phoneNumbers)];
      Meteor.call('contacts.generate', phoneNumbers);
    }
  });

  //subscribe all contacts which is ownerId = currentLoggedIn user
  MO.subscribe('contactsSub', 'contacts', {ownerId: MO.user()._id});

  return {
    contacts: MO.collection('contacts', 'contactsSub').find({}),
  }
}, Contacts);


export default class ContactsStateHolder extends Component {

  constructor(){
    super();
    this.state = {
      search: ""
    };
  }

  render(){
    const {search} = this.state;

    return (
      <ContactsContainer
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
