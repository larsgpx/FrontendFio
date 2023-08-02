const initialStore = {
    section: {
        title: 'Dashboard',
        description: 'Description Dashboard'
    },
    user: {}
}

const storeReducer = (state, action) => {
    switch(action.type) {
        case 'userInformation':
            return {
                ...state,
                section: action.payload
            }
        case 'userDataSentinel':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export { initialStore }
export default storeReducer;