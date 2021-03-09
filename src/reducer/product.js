let defaultState={
    productList:[],
    product:{ }
}

const productReducer = (state=defaultState, action)=>{
    console.warn("state:", state)
    console.warn("action: ", action)
    switch(action.type){
        case "GETALL_PRODUCT":
            console.log(action);
            return{
                ...state,
                productList:action.payload.list
            }
        default:
            return state;
    }
}
export default productReducer