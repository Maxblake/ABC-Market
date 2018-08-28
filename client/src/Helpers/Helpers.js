import React from 'react'
import {Snackbar} from '@material-ui/core'

export const checkErrors = (...values) => {
    let status = []
    values.forEach(response => {
        if (response === '' || response === 'error' ) {
            status.push(false)
        } else if (response === 'success') {
            status.push(true)
        }
    })
    return status.every(element => {
      return element === true;
    });
}

export default Notification = (props) => {
    return ( 
        <Snackbar 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} 
            open={props.success}
            autoHideDuration={6000}
            message={<p>{props.message}</p>}
            onClose={props.closeNotification}
        />
    )
}