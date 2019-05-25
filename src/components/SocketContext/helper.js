export const addNotif = (notif) => {
    return state => ({
        notifications: {
            ...state.notifications,
            list: [
                ...state.notifications.list,
                notif
            ]
        }
    })
}


export const updateSearchOnFriendshipChange = (with_, friendship) => {
    return state => ({
        search: {
            ...state.search,
            matches: state.search.matches.map(match => {
                return  match.id !== with_ 
                    ?   match
                    :   {
                            ...match,
                            fshipStatus: friendship
                        }
            })
        }
    })
}