import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false, 
        status: this.props.status,
    }  

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    activateEditMode = () => {
        this.setState(
            {
                editMode: true,
            }
        );
    }

    deActivateEditMode = () => {
        this.setState(
            {
                editMode: false,
            }
        );
        this.props.updateStatus(this.state.status);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status,
            });
        }
    }

    render(){
        return(
            <div>
            {
                !this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "status"}</span>
                </div>
            }
            {
                this.state.editMode &&
                <div>
                    <input 
                        onChange={this.onStatusChange}
                        autoFocus={true} 
                        value={this.state.status} 
                        onBlur={this.deActivateEditMode}
                    />
                </div>
            }        
            </div>
        );
    }
}

export default ProfileStatus;