import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';

export const fetchGifts = createAsyncThunk('gifts/fetchDeals', async () => {
  const snapshot = await firebase.firestore().collection(`users/${id}/gifts`).get()
  const gifts = [];
  snapshot.forEach((doc) => {
    gifts.push(doc.data());
  });
  return gifts;
});

export const giftsSlice = createSlice({
  name: 'gifts', // Give a name to your slice
  initialState: {
    giftsState: []
  },
  reducers: { 
    gifts: (state, action) => {
        for (i in state.giftsState) {
            if (state.giftsState[i].code == action.payload.deal.code) {
                state.giftsState[i].saved = !state.giftsState[i].saved;
                action.payload.deal.saved = !action.payload.deal.saved;
              break;
            }
          }
      }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGifts.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const gifts = action.payload; // Assuming you expect a single user's data
      if (gifts) {
        state.giftsState = gifts;
      }
    });
  },
});

export default giftsSlice.reducer;