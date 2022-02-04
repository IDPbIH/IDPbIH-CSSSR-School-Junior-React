import ProductsJSON from '../products.json';
import { createSelector } from 'reselect';
import getFilteredProducts from '../utils/getFilteredProducts';
import { getActiveCategoriesFromRouting, getActivePageFromRouting } from './routingReducer';

// Filter Module.js

// Actions
const SET_MIN_PRICE_VALUE = 'SET_MIN_PRICE_VALUE';
const SET_MAX_PRICE_VALUE = 'SET_MAX_PRICE_VALUE';
const SET_DISCOUNT_VALUE = 'SET_DISCOUNT_VALUE';
const SET_DEFAULT_FILTERS_VALUE = 'SET_DEFAULT_FILTERS_VALUE';

//initialState
const initialState = {
    minPriceValue: Math.min.apply(null, ProductsJSON.map(product => product.price)),
    maxPriceValue: Math.max.apply(null, ProductsJSON.map(product => product.price)),
    discountValue: 0,
    categories: [...new Map(ProductsJSON.map(product => [`${product.category}:${product.categoryName}`, product])).values()],
    products: ProductsJSON,
    pageSize: 6
};

// Reducer
const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MIN_PRICE_VALUE:
            return {
                ...state,
                minPriceValue: Number(action.value)
            };
        case SET_MAX_PRICE_VALUE:
            return {
                ...state,
                maxPriceValue: Number(action.value)
            };
        case SET_DISCOUNT_VALUE:
            return {
                ...state,
                discountValue: Number(action.value)
            };
        case SET_DEFAULT_FILTERS_VALUE:
            return initialState;
        default:
            return state;
    }
};

// Action Creators
export const setMinPriceValue = (value) => ({ type: SET_MIN_PRICE_VALUE, value });
export const setMaxPriceValue = (value) => ({ type: SET_MAX_PRICE_VALUE, value });
export const setDiscountValue = (value) => ({ type: SET_DISCOUNT_VALUE, value });
export const setDefaultFiltersValue = () => ({ type: SET_DEFAULT_FILTERS_VALUE });

// Selectors
export const getMinPriceValue = (state) => state.mainPage.minPriceValue;
export const getMaxPriceValue = (state) => state.mainPage.maxPriceValue;
export const getDiscountValue = (state) => state.mainPage.discountValue;
export const getPageSize = (state) => state.mainPage.pageSize;
export const getCategories = (state) => state.mainPage.categories;
export const getProducts = (state) => state.mainPage.products;

export const getFilterValue = (state) => {
    return {
        minPriceValue: getMinPriceValue(state),
        maxPriceValue: getMaxPriceValue(state),
        discountValue: getDiscountValue(state)
    };
};

export const getFilteredProductsWithPagination = createSelector(
    getActivePageFromRouting, getActiveCategoriesFromRouting, getFilterValue, getPageSize, getProducts,
    (activePage, activeCategories, filterValue, pageSize, products) => {
        const filteredProducts = getFilteredProducts(activeCategories, filterValue, products);

        return filteredProducts.filter((product, index) => {
            index++
            const isFirstItemForActivePageRange = index >= (pageSize * (activePage - 1) + 1);
            const isLastItemForActivePageRange = index <= activePage * pageSize;

            return isFirstItemForActivePageRange && isLastItemForActivePageRange;
        })
    }
);

export default mainReducer;