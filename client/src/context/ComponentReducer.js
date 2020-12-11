export default (state, action) => {
    switch(action.type) {
        case 'GET_COMPONENTS':
            return {
                ...state,
                loading: false,
                components: action.payload
            }
        case 'DELETE_COMPONENT':
            return {
                ...state,
                components: state.components.filter(component => component._id !== action.payload)
            }
        case 'ADD_COMPONENT':
            return {
                ...state,
                components: [action.payload, ...state.components]
            }
        case 'COMPONENT_ERROR':
            return {
                ...state,
                loading: false,
                components: action.payload
            }
        default:
            return state;
    }
}