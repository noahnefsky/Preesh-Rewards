import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';

export const fetchBrowseDeals = createAsyncThunk('browseDeals/fetchDeals', async () => {
  const snapshot = await firebase.firestore().collection('users/1/browseDeals').get()
  const browseDeals = [];
  snapshot.forEach((doc) => {
    browseDeals.push(doc.data());
  });
  return browseDeals;
});

export const browseDealsSlice = createSlice({
  name: 'browseDeals', // Give a name to your slice
  initialState: {
    browseDealsState: []
  },
  reducers: { 
    browseDeals: (state, action) => {
        for (i in state.browseDealsState) {
            if (state.browseDealsState[i].code == action.payload.deal.code) {
                state.browseDealsState[i].saved = !state.browseDealsState[i].saved;
                action.payload.deal.saved = !action.payload.deal.saved;
              break;
            }
          }
      }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrowseDeals.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const browseDeals = action.payload; // Assuming you expect a single user's data
      if (browseDeals) {
        state.browseDealsState = browseDeals;
      }
    });
  },
});

export default browseDealsSlice.reducer;