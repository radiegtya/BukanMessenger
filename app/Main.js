import {AsyncStorage} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Meteor from 'react-native-meteor';
import {meteorUri} from './Config';

import { registerScreens, startSingleScreenApp, startTabBasedApp } from './screens';

Meteor.connect(meteorUri);
registerScreens(); // this is where you register all of your app's screens


AsyncStorage.getItem('@AuthStore:isLoggedIn').then(value=>{
  if(value == null){
    startSingleScreenApp();
  }else{
    startTabBasedApp();
  }
});
