import React, { createContext, useReducer } from 'react';
import ComponentReducer from './ComponentReducer';
import axios from 'axios';

const initialState = {
    components: [],
    error: null,
    loading: true
}

export const ComponentContext = createContext(initialState);

export const ComponentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ComponentReducer, initialState);

    const getComponents = async () => {
        try {
            const res = await axios.get('/api/v1/components');
            dispatch({
                type: 'GET_COMPONENTS',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'COMPONENT_ERROR',
                payload: error.response.data.error
            })
        }
    }

    const addComponent = async component =>{
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
            })
        } catch (error) {
            dispatch({
                type: 'COMPONENT_ERROR',
                payload: error.response.data.error
            })
        }

    }

    const deleteComponent = async id => {
        try {
            await axios.delete(`/api/v1/components/${id}`);
            dispatch({
                type: 'DELETE_COMPONENT',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'COMPONENT_ERROR',
                payload: error.response.data.error
            })
        }
    }

    return (<ComponentContext.Provider 
            value={{
                components: state.components,
                error: state.error,
                loading: state.loading,
                getComponents,
                addComponent,
                deleteComponent
            }}>
        {children}
    </ComponentContext.Provider>);
}
