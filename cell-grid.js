import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View
} from 'react-native';

import renderIf from './render-if';
export default class CellGrid extends Component {
  constructor(props){
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.longPressHandler = this.longPressHandler.bind(this);
  }
  onSelectItem(){
    this.props.onSelectItem(this.props.item);
  }
  longPressHandler(){
    this.props.longPressHandler(this.props.item);
  }

  render(){
    const Cell = this.props.component;
    return(
      <View>
        <TouchableHighlight  onPress={this.onSelectItem} onLongPress={this.longPressHandler}  >
          <View>
            <Cell item={this.props.item}/>
          </View>
        </TouchableHighlight>

        {renderIf(this.props.selected)(
          <View style={{position:'absolute',alignItems:'center',justifyContent:'center', flex:1, top:15, right:15}}>
          <Image source={this.props.selectIcon} style={{height:25, width:25}}/>
        </View>)}

      </View>
    );
  }
}
