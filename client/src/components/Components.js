import React, { useState, useContext, useEffect } from 'react';
import { Component } from './Component' ;
import { ComponentContext } from '../context/ComponentState';
import { ComponentSkeleton } from './ComponentSkeleton';
import _ from 'underscore';

export const Components = () => {
    // console.log('Render Components');
    const [tab, setTab] = useState('CPU');
    const [sorting, setSorting] = useState('rating')
    const { components, getComponents, loading } = useContext(ComponentContext);

    const rdm = Math.ceil(Math.random() * 10);

    useEffect(() => {
        getComponents();
    }, [])

    let selectedComponents = _.filter(components, component => component.type === tab );

    selectedComponents.sort((a, b) => {
        return b[sorting] - a[sorting];
    })

    const changeView = e => {
        const updateTab = e.target.id;
        setTab(updateTab);
    }

    const setClasses = e => {
        if (e === tab) return "tab tab-selected";
        return "tab"
    }
    
    return (
        <>
            <div className="card card-shadow add-component-layout">
                <div className="add-components-tabs">
                    <div className="tabs">
                        <div className={setClasses("CPU")} id="CPU" onClick={changeView}>CPU</div>
                        <div className={setClasses("GPU")} id="GPU" onClick={changeView}>GPU</div>
                        <div className={setClasses("RAM")} id="RAM" onClick={changeView}>RAM</div>
                        <div className={setClasses("SSD")} id="SSD" onClick={changeView}>SSD</div>
                        <div className={setClasses("MOBO")} id="MOBO" onClick={changeView}>MOBO</div>
                        <div className={setClasses("PSU")} id="PSU" onClick={changeView}>PSU</div>
                        <div className={setClasses("HSF")} id="HSF" onClick={changeView}>HSF</div>
                        <div className={setClasses("FANS")} id="FANS" onClick={changeView}>FANS</div>
                        <div className={setClasses("CASE")} id="CASE" onClick={changeView}>CASE</div>
                    </div>
                </div>
                <div className="tab-content">
                    <select name="sorting" id="sorting" onChange={e => setSorting(e.target.value)}  value={sorting}>
                        <option value="rating">Rating</option>
                        <option value="price">Price</option>
                    </select>
                    <ul className="components-list">
                        {loading &&
                            <div>
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                <ComponentSkeleton />
                                {/* <h3>No components found!</h3> */}
                            </div>
                            
                        }
                        {(!selectedComponents.length && !loading) &&
                            <div className="error">
                                <h3>No components found!</h3>
                            </div>
                        }
                        {selectedComponents.map(component => (<Component key={component._id} component={component} />))}
                    </ul>
                </div>
            </div>
        </>
    )
}
