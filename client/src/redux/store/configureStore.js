import { configureStore, Tuple } from '@reduxjs/toolkit'
import logger from "redux-logger";
import counterSlice from '../reducerSlices/counterSlice';
import boxSlice from '../reducerSlices/boxSlice';

const store = configureStore({
    reducer:{
        counter: counterSlice,
        box: boxSlice
    },
    middleware: () => new Tuple(logger),
})

export default store