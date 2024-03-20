import { createSlice } from '@reduxjs/toolkit'

export const roomslice = createSlice({
  name: 'campaign',
  initialState: {
    campaignId: 'Ankit tyagi',
    name: 'Campaign',
    segmentId:''
  },
  reducers: {
    setid: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.campaignId=action.payload.id;
    },
    setname:(state,action)=>{
      state.name=action.payload.name;
    },
    setsegmentId:(state, action)=>{
      state.segmentId=action.payload.segmentId;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setid,setname,setsegmentId} = roomslice.actions
export default roomslice.reducer