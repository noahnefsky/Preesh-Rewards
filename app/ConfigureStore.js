import { configureStore } from '@reduxjs/toolkit';
import browseDealsReducer from './Slices/BrowseDealsSlice';
import favouritesReducer from './Slices/FavouritesSlice';
import giftsReducer from './Slices/GiftsSlice';
import imagesReducer from './Slices/ImagesSlice';
import mostPopularReducer from './Slices/MostPopularSlice';
import saveDealReducer from './Slices/SavedDealsSlice';
import personInfoReducer from './Slices/SaveInfoSlice'; // Import the personInfo reducer and fetchUserData action
import usedRewardsReducer from './Slices/UsedRewardsSlice';
import usePromotionReducer from './Slices/UsePromotionSlice';

const store = configureStore({
  reducer: {
    usedRewards: usedRewardsReducer,
    gifts: giftsReducer,
    images: imagesReducer,
    mostPopular: mostPopularReducer,
    favourites: favouritesReducer,
    browseDeals: browseDealsReducer,
    saveInfo: personInfoReducer,
    usePromotion: usePromotionReducer,
    saveDeal: saveDealReducer,
    personInfo: personInfoReducer, // Include the personInfo slice in your store
  },
});

// Dispatch the fetchUserData action during store initialization

export default store;