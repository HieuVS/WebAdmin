import { applyMiddleware, createStore } from 'redux';
import { authMiddleware } from './middleware/authMiddleware';
import rootReducer from './reducers';

const middlewareEnhancer = applyMiddleware(authMiddleware);
const store = createStore(rootReducer, middlewareEnhancer);

export default store;