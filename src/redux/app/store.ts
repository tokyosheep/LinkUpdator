import { configureStore } from '@reduxjs/toolkit';
import overLayerSlice from '../features/overlayer/overLayerSlice';

export const store = configureStore({
    reducer: {
        overLayer: overLayerSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;