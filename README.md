# react-native-collection

One of the easiest way  of creating list and collection or grid view for both android and iOS. It's even more easier to handle cell selection. This module is specifically created for making your life easier when you need an implementation of multi-select items from the list or collection.  

###### This package handle following features

1. Can display custom view in grid view.
2. Callback handler for item selection in normal mode
3. Long tap to enter into multi-selection mode
4. Callback handler for cancel operation
5. Callback handler for multi-selection done operation
6. Slide down top bar for cancel and done operation.
8. Can pass custom icon for item selection.



#Support Platform
**Android** and **iOS**

#Installation
`npm install --save react-native-collection`


#Screenshot
![](https://github.com/tigerraj32/react-native-collection/blob/master/screenshot/1.png)
![](https://github.com/tigerraj32/react-native-collection/blob/master/screenshot/2.png)
![](https://github.com/tigerraj32/react-native-collection/blob/master/screenshot/3.png)

#Snippet
```
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
```
and you can have your own component but in this case
```
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
```
#Options

   Option   |   Description   |   Default Value   | required
   --- | --- | --- | ---
   component   |   Component to render each cell item  |   Rectangle box of 100*100 | required
   dataSource  |   Data source for list |  - | required
   selectionMode | Boolean props to decide whether to enable selection mode | true | optional
   selectIcon | icon to be display to show item selection | checkmark  | optional
   cellSize |  size of each cell item in collection view | {height:100, width:100}  | optional
   tapHandler | callback handler in normal mode while tapping cell item | -  | required
   actions | two action during selection mode (Cancel and Done ). Can decide between text mode or icon mode to represent cancel and done. Can pass callback handler for each action | - | required
   onEndReached | handler to notify ScrollView have reached to end of the view. ** pass the onEndReached={this.props.onEndReached} props to ListView of  GridView ** |  - | optional
   barBottomPosition | action bar bottom offset value | 0 | optional
