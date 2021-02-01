import React from 'react'
import { AddComponent } from './AddComponent';

export const Modal = () => {
    return (
        <div className='modal'>
            {/* {(mode === 'add' &&
                <AddComponent mode={mode}/>
            )} */}
            <AddComponent />
        </div>
    )
}
