const initialState = {
    schedule: []
};

const scheduleReducer = (state = initialState, action) => {
    const { type, payload, id ,tableId } = action;
    switch (type) {
        case `SET_DATA_SCHEDULE` : 
            return {
                ...state,
                schedule: [...state.schedule, payload]
            }
        case 'UPDATE_ITEM_SCHEDULE' :
            //console.log("HOHO", payload);
            const newItemList = state.schedule.map(item => {
                if(item.table._id === id) return {
                    ...item,
                    items:[...payload]
                }
                return item
            })
            //console.log('newItem REDUCER:', newItemList)
            return {
                ...state,
                schedule: newItemList
            }
        default :
            return state;
    }
}

export default scheduleReducer;

// for(let i= 0; i< state.schedule.length; i++) {
//     if(state.schedule[i].table._id === id) {
//         console.log('hehe')
//         return state; 
//     }    
//     else return {
//         ...state,
//         schedule: [...state.schedule, payload]
//     };
// }

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
// console.log(a)