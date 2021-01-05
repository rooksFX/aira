import axios from 'axios';

export const getComponents = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/v1/components');
            dispatch({
                type: 'GET_COMPONENTS',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'COMPONENT_ERROR',
                payload: error.response.data.error
            });
        }
    }
}

export const addComponent = component => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const res = await axios.post('/api/v1/components', component, config);
            dispatch({
                type: 'ADD_COMPONENT',
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'COMPONENT_ERROR',
                payload: error.response.data.error
            });
        }
    }
}

export const deleteComponent = id => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/v1/components/${id}`);
            dispatch({
                type: 'DELETE_COMPONENT',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'COMPONENT_ERROR',
                payload: error.response.data.error
            });
        }
    }
}