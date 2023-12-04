import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebase, id } from '../firebaseconfig';

export const fetchDeals = createAsyncThunk('saveDeal/fetchDeals', async () => {
  const snapshot = await firebase.firestore().collection(`users/${id}/savedRewards`).get()
  const userData = [];
  snapshot.forEach((doc) => {
    userData.push(doc.data());
  });
  return userData;
});

const updateDeal =  async (path, code, isSaved) => {
  const userCollection = firebase.firestore().collection(`users/${id}/${path}`);
  const query = userCollection.where('code', '==', code).limit(1);
          query.get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                // Delete the first matching document
                const docToRemove = querySnapshot.docs[0];
                return docToRemove.ref.update({saved: isSaved});
              }
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
            });
}

export const saveDealSlice = createSlice({
  name: 'saveDeal', // Give a name to your slice
  initialState: {
    savedDealsState: []
  },
  reducers: {
    saveDeal: (state, action) => {
      var index = -1;
      var count = 0;
      for (i in state.savedDealsState) {
        if (state.savedDealsState[i].code == action.payload.deal.code) {
          index = count
          break;
        }
        count++;
      }
      const userCollection = firebase.firestore().collection('users/1/savedRewards');
      var callFailed = false;
      // Unsaving case
      if (action.payload.unsave) {
        if (index != -1) {
          action.payload.deal.saved = false;
          state.savedDealsState.splice(index, 1);
          const query = userCollection.where('code', '==', action.payload.deal.code).limit(1);

          query.get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                // Delete the first matching document
                const docToRemove = querySnapshot.docs[0];
                return docToRemove.ref.delete();
              }
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
            });
        }
      } else {
        // Saving case
        if (index == -1) {
          action.payload.deal.saved = true;
          state.savedDealsState.push(action.payload.deal);
          try {
            userCollection.add(action.payload.deal);
          } catch(error) {
            console.error('Error removing document: ', error);
          };
      }
    }
     // Specify the collection and document ID
     if (!callFailed) {
       updateDeal('mostPopular', action.payload.deal.code, action.payload.deal.saved);
       updateDeal('favourites', action.payload.deal.code, action.payload.deal.saved);
       updateDeal('browseDeals', action.payload.deal.code, action.payload.deal.saved);
     }
  }
},
  extraReducers: (builder) => {
    builder.addCase(fetchDeals.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const userData = action.payload; // Assuming you expect a single user's data
      if (userData) {
        state.savedDealsState = userData
      }
    });
  },
});

export const { saveDeal } = saveDealSlice.actions;

export default saveDealSlice.reducer;