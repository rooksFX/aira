const initialState = {
    components: [],
    error: null,
    loading: true,
    modalOpen: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_COMPONENTS':
            return {
                ...state,
                loading: false,
                modalOpen: false,
                components: action.payload
            }
        case 'DELETE_COMPONENT':
            return {
                ...state,
                modalOpen: false,
                components: state.components.filter(component => component._id !== action.payload)
            }
        case 'ADD_COMPONENT':
            return {
                ...state,
                modalOpen: false,
                components: [action.payload, ...state.components]
            }
        case 'COMPONENT_ERROR':
            return {
                ...state,
                loading: false,
                modalOpen: false,
                components: action.payload
            }
        case 'TOGGLE_LOADING':
            return {
                ...state,
                modalOpen: action.payload
            }
        default:
            return state;
    }
}