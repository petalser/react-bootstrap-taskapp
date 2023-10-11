import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IsEditingType = {
  status: boolean,
  index:  number,
  title: string,
  description?: string 
}

const initialState: IsEditingType = {
  status: false,
  index: 0,
  title: ""
};

export const isEditingSlice = createSlice({
  name: "isEditing",
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<IsEditingType>) => {
      return { 
        status: !state.status, 
        index: action.payload.index, 
        title: action.payload.title, 
        description: action.payload.description };
    },
  },
});

export const { edit } = isEditingSlice.actions;

export default isEditingSlice.reducer;
