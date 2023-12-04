import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';

export const fetchFavourites = createAsyncThunk('favourites/fetchDeals', async () => {
  const snapshot = await firebase.firestore().collection('users/1/favourites').get()
  const favouritesDeals = [];
  snapshot.forEach((doc) => {
    favouritesDeals.push(doc.data());
  });
  return favouritesDeals;
});

export const favouritesSlice = createSlice({
  name: 'favourites', // Give a name to your slice
  initialState: {
    favouritesState: []
  },
  reducers: { 
    favourites: (state, action) => {
        for (i in state.favouritesState) {
            if (state.favouritesState[i].code == action.payload.deal.code) {
                state.favouritesState[i].saved = !state.favouritesState[i].saved;
                action.payload.deal.saved = !action.payload.deal.saved;
              break;
            }
          }
      }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavourites.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const favouritesDeals = action.payload; // Assuming you expect a single user's data
      if (favouritesDeals) {
        state.favouritesState = favouritesDeals;
      }
    });
  },
});

export default favouritesSlice.reducer;