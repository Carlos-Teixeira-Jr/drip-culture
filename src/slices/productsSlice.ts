import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product.interface";
import { Category } from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";

export interface ProductsState {
  categories: Category[];
  filters: string[];
  products: IProduct[];
  page: number;
  totalProducts: number;
  priceEndPoints: { min: number; max: number };
  price: number;
  loading: boolean;
  totalPages: number;
}

const initialState: ProductsState = {
  categories: [],
  filters: [],
  products: [],
  page: 1,
  totalProducts: 0,
  priceEndPoints: { min: 0, max: 0 },
  price: 0,
  loading: true,
  totalPages: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { filters, page, price } = state.products;

    const filterParams =
      filters.length > 0 ? `&category=${filters.join(",")}` : "";
    const response = await fetch(
      `http://localhost:3001/products?${filterParams}&price_lte=${price}&_page=${page}&_per_page=9`
    );

    const fetcheData = await response.json();

    const products = fetcheData.data;
    const totalPages = fetcheData.pages;
    const totalProducts = fetcheData.items;

    return {
      products,
      totalPages,
      totalProducts,
    };
  }
);

export const fetchPriceEndPoints = createAsyncThunk(
  "products/fetchPriceEndPoints",
  async (_, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { filters } = state.products;

    const filterParams =
      filters.length > 0 ? `&category=${filters.join(",")}` : "";

    const response = await fetch(
      `http://localhost:3001/products?${filterParams}`
    );
    const allDataJson: IProduct[] = await response.json();

    let minPrice = 0;
    let maxPrice = 0;

    for (let i = 0; i < allDataJson.length; i++) {
      if (i === 0) {
        minPrice = allDataJson[i].price;
        maxPrice = allDataJson[i].price;
      } else {
        if (allDataJson[i].price < minPrice) {
          minPrice = allDataJson[i].price;
        }
        if (allDataJson[i].price > maxPrice) {
          maxPrice = allDataJson[i].price;
        }
      }
    }

    return { min: minPrice, max: maxPrice };
  }
);

export const fetchTotalProducts = createAsyncThunk(
  "products/fetchTotalProducts",
  async (_, { getState }) => {
    const state = getState() as { products: ProductsState };

    const filterParams =
      state.products.filters.length > 0
        ? `&category=${state.products.filters.join(",")}`
        : "";

    const response = await fetch(
      `http://localhost:3001/products?${filterParams}`
    );
    const allProducts: IProduct[] = await response.json();

    return allProducts.length;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch("http://localhost:3001/categories");
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<string[]>) => {
      state.filters = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products: IProduct[] = action.payload.products;
        state.products = products;
        state.totalProducts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchPriceEndPoints.fulfilled, (state, action) => {
        state.priceEndPoints = action.payload;

        if (state.price === initialState.price) {
          state.price = action.payload.max;
        }
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchTotalProducts.fulfilled, (state, action) => {
        state.totalProducts = action.payload;
      });
  },
});

export const { setFilters, setPrice, setPage } = productsSlice.actions;
export default productsSlice.reducer;
