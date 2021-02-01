const initialState = {
    components: [],
    error: null,
    loading: true,
    modalState: {
        mode: null,
        component: null
    },
}

export default (state = initialState, action) => {
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
                modalState: {
                    mode: null,
                    component: null
                },
                components: [action.payload, ...state.components]
            }
        case 'UPDATE_COMPONENT':
            const updatedComponent = action.payload;
            const updatedComponents = state.components.filter(component => component._id !== updatedComponent._id);
            updatedComponents.unshift(updatedComponent);
            return {
                ...state,
                modalState: {
                    mode: null,
                    component: null
                },
                components: updatedComponents
            }
        case 'COMPONENT_ERROR':
            return {
                ...state,
                loading: false,
                components: action.payload
            }
        case 'TOGGLE_LOADING':
            return {
                ...state,
                modalState: action.payload
            }
        default:
            return state;
    }
}