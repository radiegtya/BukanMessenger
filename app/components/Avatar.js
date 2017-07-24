import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Thumbnail} from 'native-base';

export default class Avatar extends Component{

  render(){
    const {text, uri, small} = this.props;

    if(uri){
      if(small)
        return <Thumbnail small source={{ uri: uri }} />
      else
        return <Thumbnail source={{ uri: uri }} />
    }else{
      //get initial string from props.text
      let initial = text.split(" ");
      if(initial.length > 1)
        initial = initial[0].charAt(0).toUpperCase() + initial[1].charAt(0).toUpperCase();
      else
        initial = initial[0].charAt(0).toUpperCase();

      //set small style if user set small to true
      let contentStyle = styles.content;
      let textStyle = styles.text;
      if(small){
        contentStyle = styles.contentSmall;
        textStyle = styles.textSmall;
      }

      return (
        <View style={styles.container}>
          <View style={[contentStyle]}>
            <Text style={[textStyle]}>{initial}</Text>
          </View>
        </View>
      );
    }
  }

}

Avatar.propTypes = {
  text: PropTypes.string,
  uri: PropTypes.string,
  small: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  text: {
    color: '#FFF',
    fontSize: 22,
    textAlign: 'center'
  },
  contentSmall: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    width: 36,
    height: 36,
    borderRadius: 36
  },
  textSmall: {
    color: '#FFF',
    fontSize: 11,
    textAlign: 'center'
  },
});
