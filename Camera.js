import React, { Component } from 'react';
import {TextInput,TouchableOpacity,View,Text} from 'react-native'
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker'
import {addImage,deleteImage} from './actions/image'
import Icon from 'react-native-vector-icons/FontAwesome5';

const options={
    title:'Camera',
    takePhotoButtonTitle:'Open',
    chooseFromLibraryButtonTitle:'',
    maxHeight:800,
    maxWidth:800

}

class Camera extends Component {
    //state = { image:''}

    getImage=()=>{
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
                console.log("inside camera")
                
                const source = response
                console.log(source)
                //const source =  JSON.stringify(response.data);
                //const {image} =this.state;
                this.props.add(source);
                //this.setState({image:source})
              }
              //console.log('state',this.state.image)
            }
          )
    }

    render() {
        return (
            <View style={{alignItems:"center",flexDirection:'column',paddingTop:250}}>
            {/* <TextInput value={this.state.text} onChangeText={(value)=>this.setState({text:value})}/>
            <TouchableOpacity onPress={()=>{this.props.add(this.state.text); this.setState({text:''})}}><Text>submit</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Gallery')}}><Text>view</Text></TouchableOpacity> */}
                <TouchableOpacity onPress={()=>this.getImage()}><Icon name="camera" size={30} color='darkred' >Camera</Icon></TouchableOpacity><View style={{height:30}}/>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Gallery')}><Icon name="images" size={30} color='darkred' >Gallery</Icon></TouchableOpacity>
                
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
export default connect(mapStateToProps,mapDispatchToProps)(Camera)