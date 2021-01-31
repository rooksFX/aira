import React, { useState, useContext } from 'react';
import axios from 'axios';
import _ from 'underscore';
import { BuildResults } from './BuildResults'
import { ComponentSkeleton } from './ComponentSkeleton';

export const BuildForm = () => {
    const [budget, setBudget] = useState(0);
    const [buildType, setBuildType] = useState(0);
    const [buildResults, setBuildResults] = useState({});
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        if (budget <= 10000) {
            // alert('CONSOLE PEASANT!');
            setError('CONSOLE PEASANT!');
            setBuildResults({});
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
            const results = response.data.data;
            const { errorCode, errorMessage, budget } = results;
            if (errorCode) {
                setError(errorMessage);
                setBuildResults({});
            }
            else {
                setError('');
                console.log('results: ', results);
                setBuildResults(results);
            }
        }, error => {
            setIsLoading(false);
            setError("Error building components!");
            setBuildResults({});
        });
    }

    return (
        <>
            <div className="build-form-container dark-card">
                <form onSubmit={onSubmit} id="build-form">
                    <div className="budget-input">
                        <label htmlFor="budget">Budget</label>
                        <input type="number" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="budget"  placeholder="Please enter your budget..."/>
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
                        <button className="btn">BUILD</button>
                    </div>
                </form>
            </div>
            <BuildResults buildResults={ buildResults } error={ error } isLoading={ isLoading }/>

        </>
    )
}
