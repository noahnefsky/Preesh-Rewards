import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const fetchImages = createAsyncThunk('images/fetch', async () => {
    try {
        const storage = getStorage();
        var storageRef = ref(storage, 'Chipotle.png');
        var downloadURL = await getDownloadURL(storageRef);
        var imageObject = {};
        imageObject['Chipotle'] = downloadURL;

        storageRef = ref(storage, 'Subway.png');
        downloadURL = await getDownloadURL(storageRef);
        imageObject['Subway'] = downloadURL;

        storageRef = ref(storage, 'Taco Bell.png');
        downloadURL = await getDownloadURL(storageRef);
        imageObject['Taco Bell'] = downloadURL;

        storageRef = ref(storage, 'profile');
        downloadURL = await getDownloadURL(storageRef);
        imageObject['profile'] = downloadURL;
        return imageObject;
      } catch (error) {
        console.error('Error loading images:', error);
      }
});

export const imagesSlice = createSlice({
  name: 'images', // Give a name to your slice
  initialState: {
    imagesState: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      // Set the initial state based on the fetched data
      const images = action.payload; // Assuming you expect a single user's data
      if (images) {
        state.imagesState = images;
      }
    });
  },
});

export default imagesSlice.reducer;