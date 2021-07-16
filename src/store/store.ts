import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
  //@ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

 
export type RootState = ReturnType<typeof rootReducer>;
export type Actions<T> = T extends { [key: string]: infer U } ? U : never;

export default store;
