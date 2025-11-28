import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteFromCart(state, action) {
      return state.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity(state, action) {
      const existingItemIndex = state.findIndex(item => item.id === action.payload);
      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const existingItemIndex = state.findIndex(item => item.id === action.payload);
      state[existingItemIndex].quantity -= 1;
    },
    clearCart() {
      return [];
    },
  },
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
