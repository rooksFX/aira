import axios from 'axios';

export const getComponents = async () => {
    try {
        const res = await axios.get('/api/v1/components');
        return {
            type: 'GET_COMPONENTS',
            payload: res.data.data
        }
    } catch (error) {
        return {
            type: 'COMPONENT_ERROR',
            payload: error.response.data.error
        }
    }
}

export const addComponent = async component => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    try {
        const res = await axios.post('/api/v1/components', component, config);
        return {
            type: 'ADD_COMPONENT',
            payload: res.data.data
        }
    } catch (error) {
        return {
            type: 'COMPONENT_ERROR',
            payload: error.response.data.error
        }
    }

}

export const deleteComponent = async id => {
    try {
        await axios.delete(`/api/v1/components/${id}`);
        return {
            type: 'DELETE_COMPONENT',
            payload: id
        }
    } catch (error) {
        return {
            type: 'COMPONENT_ERROR',
            payload: error.response.data.error
        }
    }
}