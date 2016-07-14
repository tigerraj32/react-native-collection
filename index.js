import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native';

var GridView = require('react-native-grid-view');
import renderIf from './render-if';
import CellGrid from './cell-grid';
import Strings from './strings';

var {height, width} = Dimensions.get('window');


export default class Collection extends Component {


  static defaultProps={
    barHeight:60,
    leftButtonTitle:'Cancel',
    leftButtonTitle:'Cancel',
    rightButtonTitle:'Done',
    barTextColor:'white',
    barColor:'black',
    selectIcon:require('./images/check.png'),
    cellSize:{height:100, width:100},


  }
  componentDidMount(){
      console.log('-*----------------------------- '+ JSON.stringify(this.props));
  }
  constructor(props){
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.longPressHandler = this.longPressHandler.bind(this);

    this.state = {
                  editMode:false,
                  selectedItems:[],
                  layout:{
                    height:height,
                    width:width,
                    }
                };

  }

  onLayout(event){
      this.setState({
            layout:{
              height:event.nativeEvent.layout.height,
              width:event.nativeEvent.layout.width,
            }
          });
        }

  onSelectItem(obj: Object){

      if(this.state.editMode){
        this.addItem(obj);
      }else{
            console.log('Selectable Collection: item selected '+ obj);
            if(this.props.tapHandler)  this.props.tapHandler(obj);

      }
  }

  longPressHandler(obj: Object){
    console.log('/*/*/*/*/ long tap SelectableList */*/*/*/ item: '+ obj);
    if (this.props.selectionMode) {
      this.setState({
        editMode:!this.state.editMode,
      });
      this.addItem(obj);
    }
    console.log(JSON.stringify(this.state));
  }

  renderItem(item){
    const Cell = this.props.component;
    var selectedItems = this.state.selectedItems;
    const flag = selectedItems.indexOf(item)>=0?true:false;
    const id = this.props.dataSource.indexOf(item);
    console.log('/*/*/*/*/ SelectableList */*/*/*/ item: '+item);

    return (
      <CellGrid item={item} key={id}
                onSelectItem={(obj)=>this.onSelectItem(obj)}
                longPressHandler={(obj)=>this.longPressHandler(obj)}
                component={Cell}
                selected={flag}
                mode={this.state.editMode}
                selectIcon={this.props.selectIcon}/>);
   }

   addItem(item: Object){
     var selectedItems = this.state.selectedItems;
     const index = selectedItems.indexOf(item);
     if (index>=0) {
          selectedItems.splice(index, 1);
     }else{
            selectedItems.push(item);
     }
     this.setState({
       selectedItems:selectedItems,
     });
   }

   cancelHandler(){
    console.log('Selectable Collection: Cancel Operation');
    this.setState({editMode:false, selectedItems:[]});
    if(this.props.actions.cancel.handler)  this.props.actions.cancel.handler();
   }
   doneHandler(){
    console.log('Selectable Collection: Done Operation');
    const items = this.state.selectedItems;
    this.setState({
        editMode:false,
        selectedItems:[],
      });
    if(this.props.actions.done.handler)  this.props.actions.done.handler(items);

   }

  render(){

    console.log('---------------' + JSON.stringify(this.props));

    const itemsPerRow = Math.floor(this.state.layout.width/this.props.cellSize.width);
    if (this.props.dataSource==null) throw new Error(Strings.DATA_SOURCE);

    return(
      <View style={{flex:1,top:22}}>
        <View style={{flex:1, top:this.state.editMode?this.props.barHeight:0}}>
        <GridView
          items={this.props.dataSource}
          itemsPerRow={itemsPerRow}
          renderItem={this.renderItem}/>
        </View>

        {renderIf(this.state.editMode)(
            <View style={{
                          height:this.props.barHeight, width:this.state.layout.width, top:0,
                          backgroundColor:'blue', position:'absolute',
                          alignItems:'center',flexDirection:'row', justifyContent:'space-between'
                        }}>
              <TouchableHighlight onPress={()=>this.cancelHandler()}>
                <Text style={{color:'white', left:0, margin:10}} > Cancel </Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={()=>this.doneHandler()}>
                  <Image source={this.props.actions.done.icon} resizeMode='contain' style={{right:15,height:35}}/>
                </TouchableHighlight>

            </View>
          )}
      </View>
    );
  }
}
