import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product.interface";
import { Category } from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";
import { ICart } from "../interfaces/cart.interface";

export interface ProductsState {
  categories: Category[];
  filter: string;
  titleFilter: string;
  products: IProduct[];
  page: number;
  totalProducts: number;
  priceEndPoints: { min: number; max: number };
  price: number;
  loading: boolean;
  totalPages: number;
}


const productsInitialState: ProductsState = {
  categories: [],
  filter: "",
  titleFilter: "",
  products: [],
  page: 1,
  totalProducts: 0,
  priceEndPoints: { min: 0, max: 0 },
  price: 0,
  loading: true,
  totalPages: 0,
};

const cartInitialState: ICart = {
  id: 0,
  userEmail: "",
  products: [],
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const state = getState() as { products: ProductsState };
    const { filter, titleFilter, page, price } = state.products;

    const filterParams = filter ? `&category=${filter}` : "";
    const titleFilterParam = titleFilter ? `&title=${titleFilter}` : "";

    const response = await fetch(
      `http://localhost:3001/products?${filterParams}${titleFilterParam}&price_lte=${price}&_page=${page}&_per_page=9`
    );

    const fetchedData = await response.json();
    const products = fetchedData.data;
    const totalPages = fetchedData.pages;
    const totalProducts = fetchedData.items;

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
    const { filter } = state.products;

    const filterParams =
      filter ? `&category=${filter}` : "";

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
      state.products.filter.length > 0
        ? `&category=${state.products.filter}`
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

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const state = getState() as { cart: ICart };

    console.log("🚀 ~ state?.cart.products:", state?.cart.products)

    if (state?.cart.products?.length > 0) {
      return state.cart.products;
    }

    console.log("🚀 ~ state:", state)


    const response = await fetch(`http://localhost:3001/cart/1`);
    const data = await response.json();
    console.log("🚀 ~ response:", response)
    console.log("🚀 ~ data:", data)
    return data;
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    setFilters: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.titleFilter = action.payload;
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

        if (state.price === productsInitialState.price) {
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

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICart>) => {
      state.id = action.payload.id;
      state.userEmail = action.payload.userEmail;
      state.products = action.payload.products;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.userEmail = action.payload.userEmail;
      state.products = action.payload.products;
    });
  },
});

export const { setFilters, setPrice, setPage, setTitleFilter } = productsSlice.actions;
export const { setCart } = cartSlice.actions;
export default productsSlice.reducer;
export const cartReducer = cartSlice.reducer;
