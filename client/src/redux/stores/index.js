import ComponentReducer from '../reducers/ComponentReducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
export default createStore(ComponentReducer, applyMiddleware(thunk));