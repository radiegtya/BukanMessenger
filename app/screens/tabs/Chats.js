import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Text, Title, ListItem, List, Thumbnail, Item, Input, Icon} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import {MO} from '../../MO';
import Chat from '../../components/Chat';

class Chats extends Component {

  _renderHeader(){
    return (
      <Header>
        <Left/>
        <Body>
          <Text>Chats</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>this.props.navigator.showModal({screen: 'push.NewChat'})}>
            <Icon name="create" style={{color: '#4285f4', marginRight: 10}}/>
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
            <Input placeholder="Search for messages or users" style={styles.searchText} />
          </Item>
          {/* Search Bar End */}

          {/* List */}
          <List>
            {this.props.chats.map((chat,i) => <Chat key={i} chat={chat} {...this.props}/>)}
          </List>
          {/* List End */}

        </Content>
        {/* === Content End === */}

      </Container>
    )
  }

}

const ChatsContainer = createContainer((props) => {
  const userId = MO.user()?MO.user()._id:null;
  const selector = {members: {$elemMatch: {_id: userId}}};
  const options = {sort: {'lastMessage.createdAt': -1}}

  if(userId){
    MO.subscribe('chatsSub', 'chats', selector, options);
  }

  return {
    chats: MO.collection('chats', 'chatsSub').find(selector, options)
  }
}, Chats);

export default ChatsContainer;

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
