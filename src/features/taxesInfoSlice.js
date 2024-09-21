import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  taxes: null,
  rtns: null,
  businesses: null,
  selectedTax: null,
  selectedRtn: null,
  selectedBusiness: null,
  selectedPeriod: null,
};

export const taxesInfoSlice = createSlice({
  name: "taxesInfo",
  initialState,
  reducers: {
    onTaxesLogout: (state) => {
      state.businesses = null;
      state.error = null;
      state.isLoading = false;
      state.rtns = null;
      state.selectedBusiness = null;
      state.selectedPeriod = null;
      state.selectedRtn = null;
      state.selectedTax = null;
      state.taxes = null;
    },
    onGetTaxes: (state, { payload }) => {
      state.taxes = payload;
    },
    onGetBusinesses: (state, { payload }) => {
      state.businesses = payload;
    },
    onGetRtns: (state, { payload }) => {
      state.rtns = payload;
    },
    setPeriod: (state, { payload }) => {
      state.selectedPeriod = payload;
    },
    taxesLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    taxesError: (state, { payload }) => {
      state.error = payload;
    },
    selectBusiness: (state, { payload }) => {
      state.selectedBusiness = payload;
    },
    selectRtn: (state, { payload }) => {
      state.selectedRtn = payload;
    },
  },
});

export const {
  onGetBusinesses,
  onGetRtns,
  onGetTaxes,
  onTaxesLogout,
  setPeriod,
  taxesLoading,
  taxesError,
  selectBusiness,
  selectRtn,
} = taxesInfoSlice.actions;
