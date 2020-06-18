import { combineReducers } from 'redux'
import homeReducer from './homeReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    home: homeReducer,
    ...asyncReducers
  })
}

export default {
  makeRootReducer
}
