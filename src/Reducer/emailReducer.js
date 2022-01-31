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
                if (data.id===action.payload) {
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

        case "MARK_AS_READ":
            state = state.map((data)=>{
                if (data.id===action.payload) {
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

        default:
            return state
    }
}




export default emailReducer;