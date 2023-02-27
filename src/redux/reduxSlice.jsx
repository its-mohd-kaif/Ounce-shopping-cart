import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Redux Initial States
const initialState = {
  products: [],
  cart: [],
  error: "",
  loading: true,
  clone: [],
};
// Fetch Products Api Function
export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async () => {
    return await fetch("https://dummyjson.com/products")
      .then((resp) => resp.json())
      .then((resp) => {
        let temp = [];
        for (let i = 0; i < resp.products.length; i++) {
          let obj = {
            id: resp.products[i].id,
            thumbnail: resp.products[i].thumbnail,
            title: resp.products[i].title,
            description: resp.products[i].description,
            stock: resp.products[i].stock,
            price: resp.products[i].price,
            rating: resp.products[i].rating,
            quantity: 1,
          };
          temp.push(obj);
        }
        return temp;
      })
      .catch((err) => console.log(err.message));
  }
);
const reduxSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action For Add Cart
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    // Action For Delete Cart
    deleteCart: (state, action) => {
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      state.cart = newCart;
    },
    incrementCart: (state, action) => {
      state.cart.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
      });
    },
    decrementCart: (state, action) => {
      state.cart.map((item) => {
        if (item.id === action.payload) {
          item.quantity--;
        }
      });
    },
    // Action For Search Products
    searchArr: (state, action) => {
      state.products = action.payload;
    },
    // Action For Clear Search Array
    clearSearch: (state) => {
      state.search = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.clone = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});
// Export All Actions
export const {
  addCart,
  deleteCart,
  incrementCart,
  decrementCart,
  searchArr,
  clearSearch,
} = reduxSlice.actions;
export default reduxSlice.reducer;
