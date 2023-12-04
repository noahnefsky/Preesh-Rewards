import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';

export const fetchMostPopular = createAsyncThunk('mostpopular/fetchDeals', async () => {
  const snapshot = await firebase.firestore().collection('users/1/mostPopular').get()
  const mostPopularDeals = [];
  snapshot.forEach((doc) => {
    mostPopularDeals.push(doc.data());
  });
  return mostPopularDeals;
});

export const mostPopularSlice = createSlice({
  name: 'mostPopular', // Give a name to your slice
  initialState: {
    mostPopularState: []
  },
  reducers: { 
    mostPopular: (state, action) => {
        for (i in state.mostPopularState) {
            if (state.mostPopularState[i].code == action.payload.deal.code) {
                state.mostPopularState[i].saved = !state.mostPopularState[i].saved;
                action.payload.deal.saved = !action.payload.deal.saved;
              break;
            }
          }
      }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMostPopular.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      var mostPopularDeals = action.payload; // Assuming you expect a single user's data
      if (mostPopularDeals) {
        state.mostPopularState = mostPopularDeals
      }
    });
  },
});

export default mostPopularSlice.reducer;