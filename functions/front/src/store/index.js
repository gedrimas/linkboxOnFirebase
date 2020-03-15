import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import dnd from './reducers/dndReducer'
import content from './reducers/contentReducer'
import registration from './reducers/authReducer'
import userStateReducer from './reducers/userStateReducer'

const rootReducer = combineReducers({ dnd, content, registration, userStateReducer })
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
