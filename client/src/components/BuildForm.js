import React, { useState, useContext } from 'react';
import axios from 'axios';
import _ from 'underscore';
import { ComponentSkeleton } from './ComponentSkeleton';

export const BuildForm = () => {
    const [budget, setBudget] = useState(0);
    const [buildType, setBuildType] = useState(0);
    const [buildResults, setBuildResults] = useState({});
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        if (budget <= 5000) {
            alert('CONSOLE PEASANT!');
        }
        else {
            requestBuild(budget);
        }
    }

    const requestBuild = async budget => {
        setIsLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const data = {
            budget
        }
        await axios.post('/api/v1/build', data, config)
        .then(response => {
            setIsLoading(false);
            // console.log(response);
            const results = response.data.data;
            const { errorCode, errorMessage, budget } = results;
            if (errorCode) {
                setError(errorMessage);
                setBuildResults({});
            }
            else {
                // console.log('Budget: ', budget);
                setError('');
                setBuildResults(results);
            }
        }, error => {
            setIsLoading(false);
            setError("Error building components!");
            setBuildResults({});
            // console.log(error);
        });
    }

    return (
        <>
            <div className="build-form-container card card-shadow">
                <form onSubmit={onSubmit} id="build-form">
                    <div className="budget-input">
                        <label htmlFor="budget">Budget</label>
                        <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="budget"  placeholder="Please enter your budget..."/>
                    </div>
                    {/* <div className="build-type">
                        <label htmlFor="build-type">Build Type</label>
                        <select name="build-type" id="build-type">
                            <option value="gaming">Gaming</option>
                            <option value="creative">Creative</option>
                            <option value="office-work">Office Work</option>
                        </select>
                    </div> */}
                    <div className="button-controls">
                        <button>BUILD</button>
                    </div>
                </form>
            </div>
            {(error && !isLoading) &&
                <div className="build-results card card-shadow build-error">
                    <h3>{error}</h3>
                </div>
            }
            {isLoading &&
                <div className="build-results card card-shadow">
                    <ul>
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                    </ul>
                </div>
            }
            {(!_.isEmpty(buildResults) && !isLoading) &&
            <div className="build-results card card-shadow">
                <h2>BUILD RESULTS</h2>
                <ul>
                    <li className="component-item">
                        <div className="component-item-title">
                            <h3>{buildResults.CPU.model}</h3>
                        </div>
                        <div className="description">
                            <p>
                                {buildResults.CPU.description}
                            </p>
                        </div>
                        <div className="component-item-details">
                            <div className="detail">Price: <b>{buildResults.CPU.price}</b></div>
                        </div>
                    </li>
                    <li className="component-item">
                        <div className="component-item-title">
                            <h3>{buildResults.GPU.model}</h3>
                        </div>
                        <div className="description">
                            <p>
                                {buildResults.GPU.description}
                            </p>
                        </div>
                        <div className="component-item-details">
                            <div className="detail">Price: <b>{buildResults.GPU.price}</b></div>
                        </div>
                    </li>
                    <li className="component-item">
                        <div className="component-item-title">
                            <h3>{buildResults.RAM.model}</h3>
                        </div>
                        <div className="description">
                            <p>
                                {buildResults.RAM.description}
                            </p>
                        </div>
                        <div className="component-item-details">
                            <div className="detail">Price: <b>{buildResults.RAM.price}</b></div>
                        </div>
                    </li>
                    <li className="component-item">
                        <div className="component-item-title">
                            <h3>{buildResults.MOBO.model}</h3>
                        </div>
                        <div className="description">
                            <p>
                                {buildResults.MOBO.description}
                            </p>
                        </div>
                        <div className="component-item-details">
                            <div className="detail">Price: <b>{buildResults.MOBO.price}</b></div>
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
