import React from 'react'
import { Skeleton } from '@material-ui/lab';

export const ComponentSkeleton = () => {
    let fRdm = Math.ceil(Math.random() * 10);
    let sRdm = Math.ceil(Math.random() * 10);
    fRdm = (fRdm < 5)? fRdm + 5: fRdm;
    fRdm = (sRdm < 5)? sRdm + 5: fRdm;
    const fRdmWidth = fRdm.toString().padEnd(2, 0) + '%';
    const sRdmWidth = sRdm.toString().padEnd(2, 0) + '%';

    return (
        <li className="component-item">
            <Skeleton variant="text" width={"50%"} height={24} animation="pulse" />
            <Skeleton variant="text" width={fRdmWidth} height={24} animation="pulse" />
            <Skeleton variant="text" width={sRdmWidth} height={24} animation="pulse" />
            <Skeleton variant="text" width={"20%"} height={24} animation="pulse" />
            <Skeleton variant="text" width={"20%"} height={24} animation="pulse" />
        </li>
    )
}
