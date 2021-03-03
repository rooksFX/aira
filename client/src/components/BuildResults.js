import React from 'react'
import _ from 'underscore';
import { ComponentSkeleton } from './ComponentSkeleton';

export const BuildResults = ({ buildResults, error, isLoading }) => {
    return (
        <>
            {(error && !isLoading) &&
                <div className="build-results dark-card build-error">
                    <h3>{error}</h3>
                </div>
            }
            {isLoading &&
                <div className="build-results dark-card">
                    <ul>
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                    </ul>
                </div>
            }
            {(!_.isEmpty(buildResults) && !isLoading) &&
                <div className="build-results dark-card">
                    <h2>BUILD RESULTS</h2>
                    <ul>
                        <li className="component-item">
                            <div className="component-item-title">
                                <h3>Processor: {buildResults.CPU.model}</h3>
                            </div>
                            <div className="description">
                                <p>
                                    {buildResults.CPU.description}
                                </p>
                            </div>
                            <div className="component-item-details">
                                <div className="detail">Price: <b>PHP {buildResults.CPU.price}</b></div>
                            </div>
                        </li>
                        <li className="component-item">
                            <div className="component-item-title">
                                <h3>Graphics Card: {buildResults.GPU.model}</h3>
                            </div>
                            <div className="description">
                                <p>
                                    {buildResults.GPU.description}
                                </p>
                            </div>
                            <div className="component-item-details">
                                <div className="detail">Price: <b>PHP {buildResults.GPU.price}</b></div>
                            </div>
                        </li>
                        <li className="component-item">
                            <div className="component-item-title">
                                <h3>Memory: {buildResults.RAM.model}</h3>
                            </div>
                            <div className="description">
                                <p>
                                    {buildResults.RAM.description}
                                </p>
                            </div>
                            <div className="component-item-details">
                                <div className="detail">Price: <b>PHP {buildResults.RAM.price}</b></div>
                            </div>
                        </li>
                        <li className="component-item">
                            <div className="component-item-title">
                                <h3>Motherboard: {buildResults.MOBO.model}</h3>
                            </div>
                            <div className="description">
                                <p>
                                    {buildResults.MOBO.description}
                                </p>
                            </div>
                            <div className="component-item-details">
                                <div className="detail">Price: <b>PHP {buildResults.MOBO.price}</b></div>
                            </div>
                        </li>
                        <li className="component-item">
                            <div className="component-item-title">
                                <h3>Power Supply: {buildResults.PSU.model}</h3>
                            </div>
                            <div className="description">
                                <p>
                                    {buildResults.PSU.description}
                                </p>
                            </div>
                            <div className="component-item-details">
                                <div className="detail">Price: <b>PHP {buildResults.PSU.price}</b></div>
                            </div>
                        </li>
                        <li className="component-item">
                            <div className="component-item-title">
                                <h3>CPU Cooler: {buildResults.HSF.model}</h3>
                            </div>
                            <div className="description">
                                <p>
                                    {buildResults.HSF.description}
                                </p>
                            </div>
                            <div className="component-item-details">
                                <div className="detail">Price: <b>PHP {buildResults.HSF.price}</b></div>
                            </div>
                        </li>
                    </ul>
                    <div className="summary">
                        <span>
                            <h2>Total: {buildResults.total}</h2>
                        </span>
                        <span>
                            <h2>Remaining: {buildResults.remaining}</h2>
                        </span>
                    </div>
                </div>
            }
        </>
    )
}
