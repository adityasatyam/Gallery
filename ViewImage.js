import React, { Component } from 'react';
import {Text,Image,View,TouchableOpacity,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux';
import {addImage,deleteImage} from './actions/image';





class ViewImage extends Component {
    delete = (key) => {
        Alert.alert(
            '',
            'Delete this data',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { text: 'Delete', onPress: () => {this.props.delete(key);this.props.navigation.goBack()} }
            ],
            { cancelable: false }
        )
    }
    details=(item)=>{
        Alert.alert(
            'Details:',
            'File Name : '+item.fileName+'\n'+
            'Resolution: '+item.height+" X "+item.width+'\n'+
            'Size: '+item.fileSize+'\n'+
            'Longitude: '+item.longitude+'\n'+
            'Latitude: '+item.latitude+'\n'+
            'Time: '+item.timestamp
            
            
            ,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                
            ],
            { cancelable: false }
        )

    }

    render() {
        console.log("inside view image")
        console.log(this.props.route.params.image.image)
        return (
            <View style={{flex:1}}>
                {console.log("inside view image")}
                {console.log(this.props.route.params.image.image)}
                <View style={{flex:10}}>
                    <Image source={{uri: 'data:image/jpeg;base64,'+JSON.stringify(this.props.route.params.image.image.data)}} style={{height:700,width:400}}/>
                </View>
                <View style={{flexDirection:"row",backgroundColor:'black',padding:10,flex:1,width:400,justifyContent:"space-around"}}>
                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon name="chevron-left" size={35} color="white" /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.details(this.props.route.params.image.image)}><Icon name="info-circle" size={35} color="white" /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.delete(this.props.route.params.image.key)}><Icon name="trash" size={35} color="white" /></TouchableOpacity>

                </View>
            </View>
           
            
        );

    }
}

const mapStateToProps = (state) =>{
    return {
       image:state.imageReducer.imageList
    }
}

const mapDispatchToProps = (dispatch)=>{
    return({
       delete: (key) => dispatch(deleteImage(key)),
        add: (image)=> dispatch(addImage(image)),
   })
}
export default connect(mapStateToProps,mapDispatchToProps)(ViewImage)