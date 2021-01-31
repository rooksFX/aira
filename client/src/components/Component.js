import React, {useContext} from 'react'
import { ComponentContext } from '../context/ComponentState';
import { useDispatch } from 'react-redux';
import { deleteComponent } from '../redux/actions/ComponentActions';
import { IconContext } from "react-icons"
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

export const Component = ({ component }) => {
    const dispatch = useDispatch();
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
                <div className="detail">Price: <b>PHP {component.price}</b></div>
                <div className="detail">Rating: <b>{component.rating}</b></div>
                <IconContext.Provider  value={{
                        style: {
                            fontSize: '30px',
                            color: 'cyan',
                        }
                    }}
                >
                    <div className="edit-component">
                        <MdModeEdit />
                    </div>
                </IconContext.Provider>
                <IconContext.Provider  value={{
                        style: {
                            fontSize: '30px',
                            color: '#F652A0',
                        }
                    }}
                >
                    <div
                        className="delete-component"
                        onClick={() => dispatch(deleteComponent(component._id))}
                    >
                        <MdDeleteForever />
                    </div>
                </IconContext.Provider>
                <div className="delete-btn-container">
                </div>
            </div>
        </li>
    )
}
