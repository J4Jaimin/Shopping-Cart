import { createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction('addToCart');
const decrement = createAction('decrement');
const removeFromCart = createAction('removeFromCart');
const calculatePrice = createAction('calculatePrice');

export const cartReducer = createReducer(
    {
        cartItems: [], subTotal: 0, shipping: 0, tax: 0, total: 0,
    },
    (builder) => {
        builder.addCase(addToCart, (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.id === item.id);

            if (isItemExist) {
                isItemExist.quantity++;
            }
            else {
                state.cartItems.push(item);
            }
        });

        builder.addCase(decrement, (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload.id);

            if (item.quantity > 1) {
                state.cartItems.forEach((i) => {
                    if (i.id === item.id) {
                        i.quantity--;
                    }
                });
            }
            else {
                state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
            }
        });

        builder.addCase(removeFromCart, (state, action) => {
            const item = action.payload;

            state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
        });

        builder.addCase(calculatePrice, (state, action) => {
            let sum = 0;
            state.cartItems.forEach((item) => sum += item.price * item.quantity);
            state.subTotal = sum;
            state.shipping = state.subTotal > 1000 || sum === 0 ? 0 : 200;
            state.tax = parseInt((state.subTotal * 0.18).toFixed());
            state.total = state.subTotal + state.shipping + state.tax;
        });
    });