export const StoreAllEmails = (data) =>{
    return{
        type: "STORE_ALL_EMAILS",
        payload:data
    }
}

export const AddToFavorite = (id) =>{
    return{
        type: "ADD_TO_FAVORITE",
        payload:id
    }
}

export const MarkAsRead = (id) =>{
    return{
        type: "MARK_AS_READ",
        payload:id
    }
}
