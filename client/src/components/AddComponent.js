import React, { useState, useContext } from 'react';
import { ComponentContext } from '../context/ComponentState';
import { addComponent, updateComponent, toggleModal } from '../redux/actions/ComponentActions';
import { useDispatch, useSelector } from 'react-redux';
import uniqueId from 'uniqid';
import { IconContext } from "react-icons"
import { CgCloseO } from "react-icons/cg";

export const AddComponent = () => {
    const { modalState } = useSelector(state => state);
    const initComponent = modalState.component || {
        model: '',
        description: '',
        brand: '',
        cpuMake: '',
        chipset: '',
        socket: '',
        gpuMake: '',
        size: '',
        ssdType: '',
        ramSlots: '',
        formFactor: '',
        tdp: '',
        watts: '',
        modular: '',
        efficiency: '',
        price: '',
        rating: '',
    }
    const initType = (modalState.component)? modalState.component.type: 'CPU';

    const [component, setComponent] = useState(initComponent);
    const [type, setType] = useState(initType)
    const [error, setError] = useState(false)
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        let id = uniqueId();
        const newComponent = {
            id,
            type,
            ...component
        }
        if (isFormValid(newComponent)) {
            setError(false);
            if (modalState.mode === 'add') {
                dispatch(addComponent(newComponent));
                setComponent(initComponent);
            }
            else {
                dispatch(updateComponent(newComponent));
            }
        }
        else {
            setError(true);
        }
    }

    const isFormValid = (newComponent) => {
        let valid = true;
        for (const [key, value] of Object.entries(newComponent)) {
            if (key !== '__v' && !value) {
                if (['chipset', 'cpuMake', 'socket'].includes(key)) {
                    if (['CPU', 'MOBO'].includes(type)) {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'socket') {
                    if (type === 'HSF') {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'gpuMake') {
                    if (type === 'GPU') {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'tdp') {
                    if (['CPU', 'GPU', 'HSF'].includes(type)) {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'size') {
                    if (['GPU', 'RAM', 'SSD'].includes(type)) {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'ssdType') {
                    if (type === 'SSD') {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'ramSlots') {
                    if (['RAM', 'MOBO'].includes(type)) {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (key === 'formFactor') {
                    if (['MOBO', 'PSU'].includes(type)) {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else if (['efficiency', 'watts']) {
                    if (type === 'PSU') {
                        valid = false;
                        break;
                    }
                    else {
                        valid = true;
                    }
                }
                else {
                    valid = false;
                    break;
                }
            }
        }
        return valid;
    }

    const inputOnChange = e => {
        let id = e.target.id;
        let value = e.target.value
        let updateComponent = {
            [id]: value,
        }
        setComponent({...component, ...updateComponent});
    }

    return (
        <>
            <div className="dark-card add-component-layout">
                <div className="close-modal" onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleModal({'mode': null, 'component': null}));
                    }}>
                    <IconContext.Provider value={{
                        style: {
                            fontSize: '30px',
                            color: '#F652A0',
                        }
                    }}>
                        <div>
                            <CgCloseO />
                        </div>
                    </IconContext.Provider>
                </div>
                <form onSubmit={onSubmit} id="build-form">
                    <div className="form-container">
                        <label htmlFor="type">Component Type</label>
                        {(modalState.mode === 'add' && 
                            <div id="type" className="component-type-selector">
                                <select name="type" id="type" onChange={e => setType(e.target.value)}  value={component.type}>
                                    <option value="CPU">Processor</option>
                                    <option value="GPU">Video Card</option>
                                    <option value="RAM">RAM</option>
                                    <option value="SSD">SSD</option>
                                    <option value="MOBO">Motherboard</option>
                                    <option value="PSU">Power Supply</option>
                                    <option value="HSF">CPU Cooler</option>
                                    <option value="FANS">Fans</option>
                                    <option value="CASE">Case</option>
                                </select>
                            </div>
                        )}
                        <label htmlFor="model">Model</label>
                        <input type="text" id="model" className="component-input" onChange={inputOnChange} value={component.model}/>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" className="component-input" onChange={inputOnChange} value={component.description}/>
                        <label htmlFor="brand">Brand</label>
                        <input type="text" id="brand" className="component-input" onChange={inputOnChange} value={component.brand}/>
                        {(['CPU', 'MOBO'].includes(type)) &&
                            <>
                                <label htmlFor="chipset">Chipset</label>
                                <input type="text" id="chipset" className="component-input" onChange={inputOnChange} value={component.chipset}/>
                                <label htmlFor="socket">Socket</label>
                                <input type="text" id="socket" className="component-input" onChange={inputOnChange} value={component.socket}/>
                                <label htmlFor="cpuMake">CPU Make</label>
                                <input type="text" id="cpuMake" className="component-input" onChange={inputOnChange} value={component.cpuMake}/>
                            </>
                        }
                        {type === 'HSF' &&
                            <>
                                <label htmlFor="socket">Socket/s</label>
                                <input type="text" id="socket" className="component-input" onChange={inputOnChange} value={component.socket}/>
                            </>
                        }
                        {type === 'GPU' &&
                            <>
                                <label htmlFor="gpuMake">GPU Make</label>
                                <input type="text" id="gpuMake" className="component-input" onChange={inputOnChange} value={component.gpuMake}/>
                                <label htmlFor="watts">Recommended PSU</label>
                                <input type="text" id="watts" className="component-input" onChange={inputOnChange} value={component.watts}/>
                            </>
                        }
                        {(['CPU', 'GPU', 'HSF'].includes(type)) &&
                            <>
                                <label htmlFor="tdp">TDP</label>
                                <input type="text" id="tdp" className="component-input" onChange={inputOnChange} value={component.tdp}/>
                            </>
                        }
                        {['RAM','SSD','GPU'].includes(type) &&
                            <>
                                <label htmlFor="size">Memory Size in GB</label>
                                <input type="text" id="size" className="component-input" onChange={inputOnChange} value={component.size}/>
                            </>
                        }
                        {type === 'SSD' &&
                            <>
                                <label htmlFor="ssdType">SSD Type</label>
                                <input type="text" id="ssdType" className="component-input" onChange={inputOnChange} value={component.ssdType}/>
                            </>
                        }
                        {(['RAM','MOBO'].includes(type)) &&
                            <>
                                <label htmlFor="ramSlots">No. of sticks/ Rams Slots</label>
                                <input type="text" id="ramSlots" className="component-input" onChange={inputOnChange} value={component.ramSlots}/>
                            </>
                        }
                        {(['PSU','MOBO'].includes(type)) &&
                            <>
                                <label htmlFor="formFactor">Form Factor</label>
                                <input type="text" id="formFactor" className="component-input" onChange={inputOnChange} value={component.formFactor}/>
                            </>
                        }
                        {type === 'PSU' &&
                            <>
                                <label htmlFor="watts">Watts</label>
                                <input type="text" id="watts" className="component-input" onChange={inputOnChange} value={component.watts}/>
                                <label htmlFor="efficiency">PSU Efficiency</label>
                                <input type="text" id="efficiency" className="component-input" onChange={inputOnChange} value={component.efficiency}/>
                                <label htmlFor="rating">PSU Efficiency Rating</label>
                                <input type="text" id="rating" className="component-input" onChange={inputOnChange} value={component.rating}/>
                                <label htmlFor="modular">Modular</label>
                                <input type="text" id="modular" className="component-input" onChange={inputOnChange} value={component.modular}/>
                            </>
                        }
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" className="component-input" onChange={inputOnChange} value={component.price}/>
                        {type !== 'PSU' &&
                            <>
                                <label htmlFor="rating">Rating</label>
                                <input type="text" id="rating" className="component-input" onChange={inputOnChange} value={component.rating}/>
                            </>
                        }
                    </div>
                    <div className="button-controls">
                        {error &&
                            <div className="error">
                                <h3>FORM INCOMPLETE!</h3>
                            </div>
                        }
                        
                        <button>
                            { (modalState.mode === 'edit')? 'UPDATE COMPONENT': 'ADD COMPONENT' }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
