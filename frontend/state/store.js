import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './pizzaSlice';
import { pizzaApi } from './pizzaApi';

export const resetStore = () =>  configureStore({
    reducer: {
        pizzaSlice: pizzaReducer,
        [pizzaApi.reducerPath]: pizzaApi.reducer,
    },
    middleware: getDefault => getDefault().concat(pizzaApi.middleware)
});

export const store = resetStore();