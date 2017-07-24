import React, {Component, PropTypes} from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   TextInput,
   View,
   ActivityIndicator
}  from 'react-native';
import {Button} from 'native-base';
import { parse, format, asYouType, isValidNumber } from 'libphonenumber-js';
import PhoneNumberPicker from 'react-native-country-code-telephone-input';


export default class SignIn extends Component {

   constructor (props) {
      super(props)
      this.state = {
         networkRequestPending:false,
         errorMessage: "",
         countryName: "Unknown",
         callingCode:'1',
         phoneNo: '0000',
      }
   }

   networkRequestStarted() {
     //call loading animation and disable the button
     this.setState({errorMessage: "Please Wait...", networkRequestPending:true});
   }

   networkRequestCompleted(errorMessage = "") {
      //console.log(arguments.callee.name || "anonymous")
      if (typeof errorMessage !== 'string') {
         console.log(errorMessage)
         debugger
         errorMessage = "errorMessageNotString"
      }
      return this.setState({errorMessage: errorMessage, networkRequestPending:false})
   }


   PhoneSubmit() {
      this.networkRequestStarted()

      //generate 5 random number for PIN, and get phoneNumber
      const pin = Math.floor((Math.random() * 100000) + 1);
      const {callingCode, phoneNo} = this.state;
      const phoneNumber = "+" + callingCode + phoneNo;

      //here you can send the pin via sms using twilio/nexmo or other service you prefered
      // ** //

      //then set networkRequestStarted to networkRequestCompleted
      this.networkRequestCompleted();

      //redirect to PinVerification page
      this.props.navigator.push({
        screen: 'push.PinVerification',
        passProps: {
          pin: pin,
          phoneNumber: phoneNumber
        }
      })
   }

   PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
      this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
   }

   PickerIsValidPhoneNumber() {
      return isValidNumber("+" + this.state.callingCode + this.state.phoneNo)
   }

   render() {
      return (
         <View style= {{marginTop:10}}>
           <Text style={styles.infoMsg}>
              We will send a SMS to verify your phone number. Enter your country code and phone number.
           </Text>

           <PhoneNumberPicker
             countryHint={this.props.countryHint}
             onChange={this.PhoneNumberPickerChanged.bind(this)}/>

           <Text style={styles.infoMsg}>
             {this.PickerIsValidPhoneNumber() ? "Phone number valid" : "Enter your phone number"}
           </Text>

           <Button
            disabled={this.PickerIsValidPhoneNumber() == false || this.state.networkRequestPending}
            style={{alignSelf:"center"}} onPress={this.PhoneSubmit.bind(this)}>
            <Text>Next</Text>
  	       </Button>

           <ActivityIndicator
             animating={this.state.networkRequestPending}
             style={{alignSelf:"center", width:40}}/>

           <Text style={styles.infoMsg}> Carrier SMS charges may apply </Text>
           <Text style={styles.infoMsg}> {this.state.errorMessage} </Text>

           {__DEV__ &&
              <Text style={styles.infoMsg}>
                {this.state.countryName} + {this.state.callingCode} - {this.state.phoneNo}
              </Text>
           }
         </View>
      );
   }

}

SignIn.PropTypes = {
   countryHint: PropTypes.object,
   appStrings:  PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    infoMsg: {
        marginHorizontal:20,
        marginVertical:10,
        textAlign: 'center'
    },
});
