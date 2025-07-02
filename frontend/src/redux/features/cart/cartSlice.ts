import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { Product } from '@/types/Product';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
            const existing = state.items.find(item => item.id === action.payload.id);
            if(existing) {
                existing.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart(state, action: PayloadAction<number>){
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{id: number, quantity: number}>) {
            const item = state.items.find(item => item.id === action.payload.id);
            if(item) {
                item.quantity = Math.max(0, action.payload.quantity);
            }
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const selectCartTotal = (state: { cart: CartState }) => 
    state.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
