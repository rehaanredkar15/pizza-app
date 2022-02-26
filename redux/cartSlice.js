import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
        uid:0,
    },
    reducers:{

       
        addProduct:(state,action) => {

    
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
            state.uid = action.payload.uid;
        },
        removeProduct:(state,action) => {

           
           state.products = state.products.filter(
                
                (i) => {
                   console.log( i.uid !== action.payload.product.uid);
                   return  i.uid !== action.payload.product.uid; 
                }

           )

            state.quantity -= 1;
            state.total -= action.payload.product.price * action.payload.product.quantity;
        },
     reset:(state) => {
         state.products = [];
         state.quantity = 0;
         state.total = 0;
         state.uid = 0;
     },
    },
});

export const {addProduct,reset,removeProduct}  = cartSlice.actions;
export default cartSlice.reducer;