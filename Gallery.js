import React, { Component } from 'react';
import {Text,View,Image,TouchableOpacity,FlatList,ImageBackground,Alert} from 'react-native';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {addImage,deleteImage} from './actions/image';

class Gallery extends Component {
    state = { keys:[]}

    onPress=(item)=>{
        if(this.state.keys.length){
            if(this.state.keys.indexOf(item.key)!=-1){
                this.setState({keys:this.state.keys.filter(
                    
                    data=>data!=item.key)})
            }
            else{
                this.setState({keys: this.state.keys.concat(item.key)})
            }

        }
            
        else
            this.props.navigation.navigate('ViewImage',{image:item})
    }

    onLongPress=(item)=>{
        if(this.state.keys.length==0)
            this.setState({keys:[item.key]})
        else{
            this.setState({keys:[]})
        }
    }

    delete=()=>{

        Alert.alert(
            '',
            `Delete ${this.state.keys.length} image${this.state.keys.length==1?'':'s'}`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { text: 'Delete', onPress: () => {this.state.keys.map((item)=>this.props.delete(item));this.setState({keys:[]})} }
            ],
            { cancelable: false }
        )
    }

    render() {
        console.log("inside gallery")
        console.log(this.props.images)
        







        return (
            <View>
            
                
                <FlatList style={{height:720}}
                        data={this.props.images}
                        renderItem={({ item }) => (
                            <View style={{flexDirection: 'column'}}>
                                <TouchableOpacity style={{padding:1}} onPress={()=>this.onPress(item)} onLongPress={()=>this.onLongPress(item)}>
                                        <ImageBackground source={{uri: 'data:image/jpeg;base64,'+JSON.stringify(item.image.data)}} style={{width:96,height:96}}>
                                           { this.state.keys.indexOf(item.key)!=-1?<Icon name="check-circle" size={30} color="white"/>:null}
                                        </ImageBackground>
                                </TouchableOpacity> 
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={4}
                        keyExtractor={(item, index) => index.toString()}
                />
                
                
                



{/*                 
                {this.props.images.map((item)=>{
                    console.log(item)
                    return(
                    
                    <TouchableOpacity style={{padding:2}} onPress={()=>this.props.navigation.navigate('ViewImage',{image:item})}>
                            <Image source={{uri: 'data:image/jpeg;base64,'+JSON.stringify(item.image.data)}} style={{width:100,height:100}}/>
                    </TouchableOpacity> 
                    

                    )
                
                })} */}
                
            
            {this.state.keys.length?<View style={{paddingLeft:185 ,paddingVertical:17,backgroundColor:'white'}}><TouchableOpacity onPress={()=>this.delete()}><Icon size={30} name="trash"/></TouchableOpacity></View>:null}</View>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        images: state.imageReducer.imageList
    }
}
const mapDispatchToProps = (dispatch)=>{
    return({
       delete: (key) => dispatch(deleteImage(key)),
        add: (image)=> dispatch(addImage(image)),
   })
}



export default connect(mapStateToProps,mapDispatchToProps)(Gallery)