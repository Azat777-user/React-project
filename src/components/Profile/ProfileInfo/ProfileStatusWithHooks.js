import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css'; 

const ProfileStatusWithHooks = props => {

	let [editMode, setEditMode] = useState(false); 
	let [status, setStatus] = useState(props.status); 
	
  	const activateEditMode = () => {
		setEditMode(true);
	}
	
	useEffect(()=>{ 
		setStatus(props.status);
	}, [props.status]); 

	const deActivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	}

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	}	

  return (
    <div>
		{   
		  !editMode && <div>
        <span onDoubleClick={activateEditMode}>{props.status || "status"}</span>
      </div>
    }
    {
			editMode && <div>
				<input 
					autoFocus={true} 
					value={status} 
					onBlur={deActivateEditMode}
					onChange={onStatusChange}
				/>
			</div>
    }        
    </div>
  )
};

export default ProfileStatusWithHooks;