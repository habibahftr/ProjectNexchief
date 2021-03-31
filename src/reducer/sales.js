let defaultState={
    salesList:[],
    sales:{ 
        idSales:"",
        dateSales:"",
        distributor:"",
        customer:"",
        discount:"",
        status:"",
        productList:[],
        gross:"",
        tax:"",
        invoice:"",
    },
    act:0,
}

const salesReducer = (state=defaultState, action)=>{
    console.warn("state:", state)
    console.warn("action: ", action)
    switch(action.type){
        case "GETALL_SALES":
            console.log(action);
            return{
                ...state,
                salesList:action.payload.list
            }
        case "SALES_CLICK":
            console.log("sales click", action.payload.data);
            console.log("edit", action.payload.edit);
            let editTemp = action.payload.edit
            return{
                ...state,
                sales:{
                    idSales: action.payload.data.idSales,
                    dateSales: action.payload.data.dateSales,
                    distributor: action.payload.data.distributor,
                    customer: action.payload.data.customer,
                    discount: action.payload.data.discount,
                    status: action.payload.data.status,
                    productList:action.payload.data.productList,
                    gross: action.payload.data.gross,
                    tax: action.payload.data.tax,
                    invoice: action.payload.data.invoice,
                },
                // act:1
                act:action.payload.edit,
        }
        case "BACK_SALES":
            return{
                ...state,
                sales:{ 
                    idSales:"",
                    dateSales:"",
                    distributor:"",
                    customer:"",
                    discount:"",
                    status:"",
                    productList:[],
                    gross:"",
                    tax:"",
                    invoice:"",
                },
                act:0,

        }
        default:
            return state;
    }
}
export default salesReducer