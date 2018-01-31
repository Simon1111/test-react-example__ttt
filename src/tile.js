// The import can use with gulp or webpack
import React, { Component } from 'react';

class Tile extends React.Component {
    tileClick(props) {
        props.updateBoard(props.loc, props.moves, props.turn, props.player, props.status);
    }
    render() {
        return (
            <div className="game__block">
                <div id={"tile__"+this.props.loc}
                     className="game__block__button"
                     onClick={() => this.tileClick(this.props)}>
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default Tile;