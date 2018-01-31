import React, { Component } from 'react';

class Condition extends React.Component {
    render() {
        const { player } = this.props;
        return (
            <div id="result">
                <h1>The game Tic-Tac-Toe</h1>
                <p id="userMessage">You are {player}</p>
            </div>
        );
    }
}

export default Condition;