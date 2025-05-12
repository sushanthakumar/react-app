// src/features/plans/plansSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../utils/axiosInstance'

export const getPlans = createAsyncThunk(
    "plans/getPlans",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/users/subscribe", {
          withCredentials: true
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.error || "Failed to fetch plans");
      }
    }
  );
  

// 👇 Slice with reducers and async states
const plansSlice = createSlice({
  name: "plans",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default plansSlice.reducer;
