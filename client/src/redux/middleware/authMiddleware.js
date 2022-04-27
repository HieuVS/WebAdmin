
export const authMiddleware = store => next => action => {
    console.log("MiddleWare");
    if(typeof action === 'function') {       
        return action(store.dispatch, store.getState);
    }

    return next(action);
}