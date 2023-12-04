import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';

export const fetchPromotions = createAsyncThunk('promotions/fetchPromos', async () => {
  const snapshot = await firebase.firestore().collection('users/1/promotions').get()
  const userData = [];
  snapshot.forEach((doc) => {
    userData.push(doc.data());
  });
  return userData;
});

export const promotionsSlice = createSlice({
  name: 'usePromotion', // Give a name to your slice
  initialState: {
    promotionsState: []
  },
  reducers: {
    usePromotion: (state, action) => {
      for (i in state.promotionsState) {
        if (state.promotionsState[i].code == action.payload.promotion.code) {
          state.promotionsState[i].claimed = true;
          const userCollection = firebase.firestore().collection(`users/${id}/promotions`);
          const query = userCollection.where('code', '==', action.payload.promotion.code).limit(1);
                  query.get()
                    .then((querySnapshot) => {
                      if (!querySnapshot.empty) {
                        // Delete the first matching document
                        const docToRemove = querySnapshot.docs[0];
                        return docToRemove.ref.update({claimed: true});
                      }
                    })
                    .catch((error) => {
                      console.error('Error removing document: ', error);
                    });
          break;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPromotions.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const userData = action.payload; // Assuming you expect a single user's data
      if (userData) {
        state.promotionsState = userData
      }
    });
  },
});

export const { usePromotion } = promotionsSlice.actions;

export default promotionsSlice.reducer;