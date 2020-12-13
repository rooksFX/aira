import React, {useContext} from 'react'
import { ComponentContext } from '../context/ComponentState';

export const Component = ({ component }) => {
    const { deleteComponent } = useContext(ComponentContext);
    return (
        <li className="component-item">
            <div className="component-item-title">
                <h3>{component.model}</h3>
            </div>
            <div className="description">
                <p>
                    {component.description}
                </p>
                {['CPU', 'MOBO'].includes(component.type) &&
                    <p>
                        <b>Chipset: </b> {component.chipset}
                    </p>
                }
            </div>
            <div className="component-item-details">
                <div className="detail">Price: {component.price}</div>
                <div className="detail">Rating: {component.rating}</div>
                {/* <button className="delete" onClick={() => deleteComponent(component._id)}>DELETE</button> */}
            </div>
        </li>
    )
}
