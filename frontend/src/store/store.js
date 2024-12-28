import {configureStore} from '@reduxjs/toolkit'
import storeReducer from './sliceMethods.js'

export const store = configureStore({
    reducer:storeReducer
})