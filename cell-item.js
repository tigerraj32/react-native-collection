import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';


export default class Cell extends Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log('////////////Cell/////////////////'+ this.props.item);
    return(
      <View style={{height:100,width:100, margin:10, backgroundColor:'white'}}>
          <Text style={{flex:1}}> {this.props.item} </Text>
          <Image source={require('./akshay-kumar.jpg')} style={{height:100, width:100}}/>
      </View>
    );
  }
}
