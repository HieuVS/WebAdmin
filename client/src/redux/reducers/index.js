import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import discountReducer from './discountReducer';
import itemReducer from './itemReducer';
import orderReducer from './orderReducer';
import staffReducer from './staffReducer';
import tableReducer from './tableReducer';
import scheduleReducer from './scheduleReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    item: itemReducer,
    staff: staffReducer,
    category: categoryReducer,
    discount: discountReducer,
    table: tableReducer,
    schedule: scheduleReducer,
});

export default rootReducer;
