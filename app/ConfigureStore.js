import { configureStore } from '@reduxjs/toolkit'
import usePromotionReducer, { fetchPromotions }  from './Slices/UsePromotionSlice';
import saveDealReducer, { fetchDeals } from './Slices/SavedDealsSlice'
import personInfoReducer, { fetchUserData } from './Slices/SaveInfoSlice'; // Import the personInfo reducer and fetchUserData action
import mostPopularReducer, { fetchMostPopular } from './Slices/MostPopularSlice';
import favouritesReducer, { fetchFavourites } from './Slices/FavouritesSlice';
import browseDealsReducer, { fetchBrowseDeals } from './Slices/BrowseDealsSlice';
import usedRewardsReducer, { fetchUsedRewards } from './Slices/UsedRewardsSlice';
import giftsReducer, { fetchGifts } from './Slices/GiftsSlice';
import imagesReducer, { fetchImages } from './Slices/ImagesSlice';

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