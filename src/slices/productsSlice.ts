import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product.interface";
import { Category } from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";
import { ICart } from "../interfaces/cart.interface";
import { parseLinkHeader } from "../utils/formatters/parsePaginationLinks";
import { API_URL } from "../api/api";

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
  pagination: any;
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
  pagination: null,
};

const cartInitialState: ICart = {
  id: 0,
  userEmail: "",
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ customUrl }: { customUrl?: string }, { getState, dispatch }) => {
    const state = getState() as { products: ProductsState };
    let { filter, titleFilter, page, price, categories } = state.products;

    const filterParams = filter ? `&category=${filter}` : "";
    const titleFilterParam = titleFilter ? `&title_like=${titleFilter}` : "";

    if (price === 0) {
      const allDataResponse = await fetch(
        `${API_URL}/products?_sort=price&_order=desc`
      );
      const allDataJson = await allDataResponse.json();
      if (allDataJson.length > 0) {
        price = allDataJson[0].price;
        dispatch(setPrice(price));
      }
    }

    if (categories.length === 0) {
      const categoriesResponse = await fetch(
        `${API_URL}/categories`
      );
      const categoriesJson = await categoriesResponse.json();
      categories = categoriesJson;
      dispatch(setCategories(categories));
    }

    const url =
      customUrl ||
      `${API_URL}/products?${filterParams}${titleFilterParam}&price_lte=${price}&_page=${page}&_limit=9`;

    const response = await fetch(url);

    const paginationHeader = response.headers.get("Link");
    const parsedPaginationHeader = paginationHeader
      ? parseLinkHeader(paginationHeader)
      : null;
    const totalCount = response.headers.get("X-Total-Count");

    const fetchedData = await response.json();

    return {
      products: fetchedData,
      categories,
      pagination: {
        links: parsedPaginationHeader,
        totalItems: Number(totalCount),
      },
      totalProducts: Number(totalCount),
    };
  }
);

export const fetchPriceEndPoints = createAsyncThunk(
  "products/fetchPriceEndPoints",
  async (_, { getState, dispatch }) => {
    const state = getState() as { products: ProductsState };
    const { filter } = state.products;

    const filterParams = filter ? `&category=${filter}` : "";

    const response = await fetch(
      `${API_URL}/products?${filterParams}`
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
          dispatch(setPrice(maxPrice))
        }
      }
    }

    return { min: minPrice, max: maxPrice };
  }
);

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
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setPriceEndPoints: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.priceEndPoints = action.payload;
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
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchPriceEndPoints.fulfilled, (state, action) => {
        state.priceEndPoints = action.payload;

        if (state.price === productsInitialState.price) {
          state.price = action.payload.max;
        }
      })
  },
});

const storedCartState = localStorage.getItem("cart");

const cartState = storedCartState
  ? JSON.parse(storedCartState)
  : cartInitialState;

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    setCart: (state, action: PayloadAction<ICart>) => {
      state.id = action.payload.id;
      state.userEmail = action.payload.userEmail;
      state.products = action.payload.products.map((product) => ({
        ...product,
        orderDate:
          typeof product.orderDate === "string"
            ? product.orderDate
            : product?.orderDate?.toISOString(),
      }));
    },
  },
});

const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: true },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFilters,
  setPrice,
  setPage,
  setTitleFilter,
  setCategories,
  setPriceEndPoints,
} = productsSlice.actions;
export const { setCart } = cartSlice.actions;
export const { setLoading } = loadingSlice.actions;
export default productsSlice.reducer;
export const cartReducer = cartSlice.reducer;
export const loadingReducer = loadingSlice.reducer;
