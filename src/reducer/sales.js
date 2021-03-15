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
            console.log(action.payload.sales);
            return{
                ...state,
                sales:{
                    idSales: action.payload.sales.idSales,
                    dateSales: action.payload.sales.dateSales,
                    distributor: action.payload.sales.distributor,
                    customer: action.payload.sales.customer,
                    discount: action.payload.sales.discount,
                    status: action.payload.sales.status,
                    productList:action.payload.sales.productList,
                    gross: action.payload.sales.gross,
                    tax: action.payload.sales.tax,
                    invoice: action.payload.sales.invoice,
                },
                act:1,
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