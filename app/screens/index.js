import {Navigation} from 'react-native-navigation';

//import tabs screen
import Contacts from './tabs/Contacts';
import Chats from './tabs/Chats';
import Settings from './tabs/Settings';

//import push screen
import SignIn from './push/SignIn';
import NewContact from './push/NewContact';

export function registerScreens(){
  //tabs
  Navigation.registerComponent('tabs.Contacts', ()=> Contacts);
  Navigation.registerComponent('tabs.Chats', ()=> Chats);
  Navigation.registerComponent('tabs.Settings', ()=> Settings);

  //push
  Navigation.registerComponent('push.SignIn', ()=> SignIn);
  Navigation.registerComponent('push.NewContact', ()=> NewContact);
}
