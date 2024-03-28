import { createSlice } from '@reduxjs/toolkit';

let id = 1;
const getNextId = () => id++;

const initialState = {
    activeSize: 'All'
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.activeSize = action.payload;
        },
        createOrder: {
            prepare(customer, size) {
                return {
                    payload: {
                        id: getNextId(),
                        customer,
                        size
                    }
                };
            },
            reducer(state, action) {
                state.orders.push(action.payload);
            }
        }
    }
});

export const {
    setFilters,
    createOrder
} = pizzaSlice.actions;

export default pizzaSlice.reducer;