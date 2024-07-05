import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const add_to_card = createAsyncThunk("card/add_to_card", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post("/home/product/add-to-card", info);
    console.log(data);
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const get_card_products = createAsyncThunk(
  "card/get_card_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-card-product/${userId}`);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_card_product = createAsyncThunk(
  "card/delete_card_product",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/home/product/delete-card-product/${id}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_increment = createAsyncThunk(
  "card/quantity_increment",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-increment/${id}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_decrement = createAsyncThunk(
  "card/quantity_decrement",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-decrement/${id}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/home/product/add-to-wishlist`, info);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cardReducer = createSlice({
  name: "card",
  initialState: {
    cardProducts: [],
    cardProductCount: 0,
    wishlistCount: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shippingFee: 0,
    outOfStockProducts: [],
    buyProductItem: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_card.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_card.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.cardProductCount = state.cardProductCount + 1;
      })
      .addCase(get_card_products.fulfilled, (state, { payload }) => {
        state.cardProducts = payload.cardProducts;
        state.price = payload.price;
        state.cardProductCount = payload.cardProductCount;
        state.shippingFee = payload.shippingFee;
        state.outOfStockProducts = payload.outOfStockProducts;
        state.buyProductItem = payload.buyProductItem;
      })
      .addCase(delete_card_product.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(quantity_increment.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(quantity_decrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(add_to_wishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlistCount = state.wishlistCount > 0 ? state.wishlistCount + 1 : 1;
      });
  },
});

export const { messageClear } = cardReducer.actions;
export default cardReducer.reducer;
