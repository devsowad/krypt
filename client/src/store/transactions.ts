import { RootState } from '@libs/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TransactionsState {
  account?: string;
}

const initialState: TransactionsState = {
  //
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setCurrentAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
  },
});

export const selectCurrentAccount = (state: RootState) =>
  state.transactions.account;

export const { setCurrentAccount } = transactionsSlice.actions;

export default transactionsSlice.reducer;
