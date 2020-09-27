import React, { Component } from 'react'

export default class AddPlayerForm extends Component {

    playerInput = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form's default submit behavior 
        this.props.addPlayer(this.playerInput.current.value);
        this.playerInput.current.value="";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    ref={this.playerInput}
                    onChange={
                        // Get triggered after immediately each change.
                        this.handleValueChange
                    }
                    placeholder="Enter a player's name"
                />

                <input
                    type="submit"
                    value="Add player"
                />
            </form>
        )
    }
}
