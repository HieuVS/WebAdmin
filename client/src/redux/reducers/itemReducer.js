const initialState = {
    
}

const itemReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOAD_ITEM_LIST': 
            return {
                ...state,
                items: payload
            }
        case 'CREATE_ITEM': 
            return {
                ...state,
                items: [...state.items, payload]
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload)
            }
        case 'UPDATE_ITEM':
            const newItemList = state.items.map(item => {
                if(item._id === payload._id) return payload;
                return item;
            })    
            return {
                ...state,
                items: newItemList
            }
        default:
            return state;
    }
}

export default itemReducer;
// const a = {
//     schedule : [
//         {
//             table: {
//                 id: '1234a',
//                 name: 'dfgsey'
//             }
//         },
//         {
//             items: [
//                 {id: '1234a'},
//                 {name: 'dfgsey'},
//             ]
//         },
//         {
//             table: {
//                 id: 'sz6346',
//                 name: 'hjhj'
//             }
//         },
//     ]
// }