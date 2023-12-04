import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../firebaseconfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const fetchUserData = createAsyncThunk('personInfo/fetchUserData', async () => {
  const snapshot = await firebase.firestore().collection('users').get();
  const userData = [];
  snapshot.forEach((doc) => {
    userData.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  var downloadURL = null;
  try {
    const storage = getStorage();
    const storageRef = ref(storage, 'profile');
    downloadURL = await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting image download URL from Firebase:', error);
    throw error;
  }
  return {data: userData, image: downloadURL};
});


const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  image: '',
  id: ''
};

const personInfoSlice = createSlice({
  name: 'personInfo',
  initialState,
  reducers: {
    saveInfo: (state, action) => {
      const firestore = firebase.firestore();
      // Specify the collection and document ID
      const userCollection = firestore.collection('users');
      // Update the fields in the document
      var updatedFields = {
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
        phone: action.payload.phone,
        email: action.payload.email,
      };
      if (action.payload.points) {
        state.points = action.payload.points;
        state.balance = action.payload.amount;
        updatedFields = {
          points: action.payload.points,
          balance: action.payload.amount,
        };
      } else {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.phone = action.payload.phone;
        state.email = action.payload.email;
        state.image = action.payload.image;
      }

      // Update the document
      userCollection.doc(`${state.id}`).update(updatedFields)
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const [userData] = action.payload.data; // Assuming you expect a single user's data
      if (userData) {
        state.firstName = userData.data.firstname;
        state.lastName = userData.data.lastname;
        state.phone = userData.data.phone;
        state.email = userData.data.email;
        state.image = action.payload.image;
        state.points = userData.data.points;
        state.balance = userData.data.balance;
        state.status = userData.data.status;
        state.id = userData.id;
      }
    });
  },
});

export const { saveInfo } = personInfoSlice.actions;

export default personInfoSlice.reducer