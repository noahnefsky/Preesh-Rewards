import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';

export const fetchUsedRewards = createAsyncThunk('usedRewards/fetchDeals', async () => {
  const snapshot = await firebase.firestore().collection(`users/${id}/usedRewards`).get()
  const usedRewardsDeals = [];
  snapshot.forEach((doc) => {
    usedRewardsDeals.push(doc.data());
  });
  return usedRewardsDeals;
});

export const usedRewardsSlice = createSlice({
  name: 'usedRewards', // Give a name to your slice
  initialState: {
    usedRewardsState: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsedRewards.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      var usedRewardsDeals = action.payload; // Assuming you expect a single user's data
      if (usedRewardsDeals) {
        usedRewardsDeals.sort((a, b) => {
            const dateA = new Date(
              a.date.split("-").reverse().join("-") // Reorder the date parts
            );
            const dateB = new Date(
              b.date.split("-").reverse().join("-") // Reorder the date parts
            );      
            return dateB - dateA; // Sort in descending order (newest to oldest)
          });
        state.usedRewardsState = usedRewardsDeals
      }
    });
  },
});

export default usedRewardsSlice.reducer;