import { Navigation } from 'react-native-navigation';
import Meteor from 'react-native-meteor';

import { registerScreens } from './screens';

Meteor.connect('ws://localhost:3000/websocket');
registerScreens(); // this is where you register all of your app's screens


const authenticated = true;

if(!authenticated){

  //start single screen app (unauthenticated)
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'push.SignIn', // unique ID registered with Navigation.registerScreen
      title: 'Sign in', // title of the screen as appears in the nav bar (optional)
    },
  });

}else{

  // start tabBased app (authenticated)
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Contacts',
        screen: 'tabs.Contacts', // this is a registered name for a screen
        title: 'Contacts',
        navigatorStyle: {
          navBarHidden: true
        }
      },
      {
        label: 'Chats',
        screen: 'tabs.Chats',
        title: 'Chats',
        navigatorStyle: {
          navBarHidden: true
        }
      },
      {
        label: 'Settings',
        screen: 'tabs.Settings',
        title: 'Settings',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    ],
  });

}
