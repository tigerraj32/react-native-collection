/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Collection from 'react-native-collection';
import Cell from './cell-item';

var dataSource = ['1','2','3'];
class Example extends Component {
  constructor(props){
    super(props);
    this.leftHandler = this.leftHandler.bind(this);
    this.rightHandler = this.rightHandler.bind(this);
    this.tapHandler = this.tapHandler.bind(this);
  }
  tapHandler(param: Object){
    console.log('item tapped'+ param);
  }
  leftHandler(param: Object){
    console.log('left button clicked');
  }
  rightHandler(param: Object){
    console.log('right button clicked: ' + param);
  }

  render() {
    console.log(JSON.stringify(this.props));
    return (
      <View style={styles.container}>
        <Collection component={Cell}
                        dataSource={dataSource}
                        selectionMode={true}
                        selectIcon={require('./send.png')}
                        tapHandler={this.tapHandler}
                        cellSize={
                                  {
                                    height:100,
                                    width:100
                                  }
                                 }
                        actions={
                                  {cancel:
                                    {
                                      type:'text',
                                      title:'Dismiss',
                                      handler:this.leftHandler,
                                      //icon:require('/send.png')
                                    },
                                   done:
                                      {
                                        //type:'text',
                                        //title:'Done',
                                        handler:this.rightHandler,
                                        icon:require('./send.png')
                                      }
                                  }

                                } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
