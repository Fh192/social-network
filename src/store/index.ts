import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
export type RootDispatch = typeof store.dispatch;
export type Actions<T> = T extends { [key: string]: infer U } ? U : never;

export default store;
