import { configureStore } from "@reduxjs/toolkit";
import { Animeapi } from "./Fetchslice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
    reducer:{
       [Animeapi.reducerPath]: Animeapi.reducer
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(Animeapi.middleware)
    
})

setupListeners(store.dispatch)