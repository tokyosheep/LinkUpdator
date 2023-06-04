import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: { value: boolean } = {
    value: false
};

const overLayerSlice = createSlice({
    name: 'overLayer',
    initialState,
    reducers: {
        setOverLayer: (state, action:PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const overlayer = (state:RootState) => state.overLayer;

export const { setOverLayer } = overLayerSlice.actions;

export default overLayerSlice.reducer;