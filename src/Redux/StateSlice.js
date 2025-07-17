import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword:"",
    modalState:false,
    infoid:"",
}

export const stateSlice = createSlice({
    name:"States",
    initialState,
    reducers:{
      setKeyword:(state,action)=>{
          state.keyword = action.payload
      },
      setModalState:(state,action)=>{
          console.log(action.payload)
          state.modalState = action.payload
      },
      setInfoid:(state,action)=>{
          state.infoid = action.payload
      },
    }
})

export const {setKeyword,setModalState,setInfoid} = stateSlice.actions

export default stateSlice.reducer