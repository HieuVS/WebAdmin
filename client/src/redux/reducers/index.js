import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import itemReducer from './itemReducer';
import orderReducer from './orderReducer';
import staffReducer from './staffReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    item: itemReducer,
    staff: staffReducer,
    category: categoryReducer,
});

export default rootReducer;
