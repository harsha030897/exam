import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../components/Listslice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;
