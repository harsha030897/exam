import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
  products: [],
};

const Listslice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.wishlist.find((item) => item.id === product.id)) {
        state.wishlist.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== productId);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setProducts } = Listslice.actions;

export default Listslice.reducer;
