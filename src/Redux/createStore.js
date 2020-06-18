import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import { makeRootReducer } from './Reducers'
import { loadState, saveState } from './Middleware/localStorageLoad'


const createStore = (initialState = {}) => {
  initialState = loadState()
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') { // enable dev tools for dev evt
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

export default createStore
