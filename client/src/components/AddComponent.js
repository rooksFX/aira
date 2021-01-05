import React, { useState, useContext } from 'react';
import { ComponentContext } from '../context/ComponentState';
import { addComponent } from '../redux/actions/ComponentActions';
import { useDispatch } from 'react-redux';
import uniqueId from 'uniqid';

export const AddComponent = () => {
    const initComponent = {
        model: '',
        description: '',
        brand: '',
        cpuMake: '',
        chipset: '',
        gpuMake: '',
        size: '',
        ramSlots: '',
        watts: '',
        price: '',
        rating: '',
    }
    const [component, setComponent] = useState(initComponent);
    const [type, setType] = useState('CPU')
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
            dispatch(addComponent(newComponent));
            setComponent(initComponent);
        }
        else {
            setError(true);
        }
    }

    const isFormValid = (newComponent) => {
        let valid = true;
        for (const [key, value] of Object.entries(newComponent)) {

            if (!value) {
                if (['chipset', 'cpuMake'].includes(key)) {
                    if (['CPU', 'MOBO'].includes(type)) {
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
                else if (key === 'size') {
                    if (['GPU', 'RAM', 'SSD'].includes(type)) {
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
                else if (key === 'watts') {
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
            <div className="card card-shadow add-component-layout">
                <form onSubmit={onSubmit} id="build-form">
                    <label htmlFor="type">Component Type</label>
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
                            <label htmlFor="cpuMake">CPU Make</label>
                            <input type="text" id="cpuMake" className="component-input" onChange={inputOnChange} value={component.cpuMake}/>
                        </>
                    }
                    {type === 'GPU' &&
                        <>
                            <label htmlFor="gpuMake">GPU Make</label>
                            <input type="text" id="gpuMake" className="component-input" onChange={inputOnChange} value={component.gpuMake}/>
                        </>
                    }
                    {['RAM','SSD','GPU'].includes(type) &&
                        <>
                            <label htmlFor="size">Memory Size in GB</label>
                            <input type="text" id="size" className="component-input" onChange={inputOnChange} value={component.size}/>
                        </>
                    }
                    {(['RAM','MOBO'].includes(type)) &&
                        <>
                            <label htmlFor="ramSlots">No. of sticks/ Rams Slots</label>
                            <input type="text" id="ramSlots" className="component-input" onChange={inputOnChange} value={component.ramSlots}/>
                        </>
                    }
                    {type === 'PSU' &&
                        <>
                            <label htmlFor="watts">Watts</label>
                            <input type="text" id="watts" className="component-input" onChange={inputOnChange} value={component.watts}/>
                        </>
                    }
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" className="component-input" onChange={inputOnChange} value={component.price}/>
                    <label htmlFor="rating">Rating</label>
                    <input type="text" id="rating" className="component-input" onChange={inputOnChange} value={component.rating}/>
                    <div className="button-controls">
                        {error &&
                            <div className="error">
                                <h3>FORM INCOMPLETE!</h3>
                            </div>
                        }
                        <button>ADD COMPONENT</button>
                    </div>
                </form>
            </div>
        </>
    )
}
