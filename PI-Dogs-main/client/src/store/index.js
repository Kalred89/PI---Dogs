// import { createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducer/index'


// export const store = legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

import { configureStore } from '@reduxjs/toolkit';
import dogsSlice from '../Slice/docSlice';

export const store = configureStore({
    reducer: {
        dogsSlice: dogsSlice,
    },
})