import {ADD_IMAGE,DELETE_IMAGE} from '../actions/types';

const initialState={
    imageList:[]
}

const imageReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_IMAGE:
            return{
                ...state,
                imageList:[{
                    key:Math.random(),
                    image:action.data
                }].concat(state.imageList)


                
                          
        }

        case DELETE_IMAGE:
            return{
                ...state,
                imageList:state.imageList.filter((item=>
                    item.key!=action.key
                    ))
            }
         

        default:
            return state;

    }
}
export default imageReducer;