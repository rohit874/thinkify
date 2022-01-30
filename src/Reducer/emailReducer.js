const emailReducer = (state=[], action) =>{
    switch(action.type){
        case "STORE_ALL_EMAILS":
            state = action.payload.map((data)=>{
                return({
                    ...data,
                    favorite:false,
                    read:false
                })
            })
            return[
                ...state
            ]
        case "ADD_TO_FAVORITE":
            state = state.map((data)=>{
                if (data.id==action.payload) {
                    return({
                        ...data,
                        favorite:true
                    })
                }
                else{
                    return data
                }
            })
            return [...state]
        case "REMOVE_FROM_FAVORITE":
            state = state.map((data)=>{
                if (data.id==action.payload) {
                    return({
                        ...data,
                        favorite:false
                    })
                }
                else{
                    return data
                }
            })
            return [...state]

        case "MARK_AS_READ":
            state = state.map((data)=>{
                if (data.id==action.payload) {
                    return({
                        ...data,
                        read:true
                    })
                }
                else{
                    return data
                }
            })
            return [...state]
        case "FILTER_BY":
            let filter = state.filter((data)=>{
                if (action.payload=="unread") {
                    return data.read==false;
                }
                else{
                    return data[action.payload]==true;
                }
            });
            return filter;
        default:
            return state
    }
}




export default emailReducer;