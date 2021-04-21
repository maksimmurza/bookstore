import { configureStore } from '@reduxjs/toolkit'
import {productListReducer} from './reducers/productReducers'

export const store = configureStore({
  reducer: {
    productList: productListReducer
  },
  devTools: true,
  preloadedState: {}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch