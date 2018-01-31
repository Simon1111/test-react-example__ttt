// The import can use with gulp or webpack
import React, { Component } from 'react';
import Condition from './condition';
import Tile from './tile';

// http
const socket = io(':3000');

// game field
let arr =
    [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' '
    ];

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            gameBoard: arr,
            turn: null,
            player: 0,
            status: '',
            winner: null,
            moves: ''
        }
    }

    componentDidMount() {
        this.initUser();
        this.initSocket();
        this.initTurn();
    }

    // set user
    initUser = () =>{
        socket.on('user', (data) => {
            this.setState({
                player: data,
            });

            // user settings
            if(this.state.player>2){
                document.getElementById("game").classList.add("disconect");
                document.getElementById('messages').remove();
                document.getElementById('userMessage').innerHTML = "Excuse me, but all places busy ☹";
            }else if(this.state.player===1){
                document.getElementById("game").classList.add("disconect");
                document.getElementById("game").classList.add("j");
            }

        });
    };

    // game sets
    initSocket = () =>{
        socket.on('winner', winner=>{
            this.setState({
                winner: winner,
            });
        });

        socket.on('game', (ioArr)=>{
            let valBoard = this.state.gameBoard;
            let li = document.createElement("li");
            let classN = 'tile__'+ioArr[0];
            this.state.gameBoard.splice(ioArr[0], 1, ioArr[1]);
            li.innerHTML = 'User-'+ioArr[3]+' | '+ioArr[0]+' - '+ioArr[1]+' == '+ioArr[2];
            document.getElementById('messages').appendChild(li);
            document.getElementsByClassName(classN).innerHTML = ioArr[1];
            if(valBoard[0]===valBoard[1] && valBoard[1]===valBoard[2] && valBoard[0]!==' '){
                document.getElementById('result').innerHTML = "<h1>The winner is "+this.state.winner+"</h1>";
            }

            // winner combination
            if  (
                (valBoard[0]===valBoard[1] && valBoard[1]===valBoard[2] && valBoard[0]!==' ') ||
                (valBoard[3]===valBoard[4] && valBoard[4]===valBoard[5] && valBoard[3]!==' ') ||
                (valBoard[6]===valBoard[7] && valBoard[7]===valBoard[8] && valBoard[6]!==' ') ||
                (valBoard[1]===valBoard[4] && valBoard[4]===valBoard[7] && valBoard[1]!==' ') ||
                (valBoard[2]===valBoard[5] && valBoard[5]===valBoard[8] && valBoard[2]!==' ') ||
                (valBoard[0]===valBoard[4] && valBoard[4]===valBoard[8] && valBoard[0]!==' ') ||
                (valBoard[2]===valBoard[4] && valBoard[4]===valBoard[6] && valBoard[2]!==' ')
            ){
                document.getElementById('result').innerHTML = "<h1>The winner is "+ioArr[1]+"</h1>";
                document.getElementById("game").classList.add("disconect");
            }

            // add class 'disconect'
            if(document.getElementById("game").classList.contains('disconect')){
                document.getElementById("game").classList.remove("disconect");
            } else {
                document.getElementById("game").classList.add("disconect");
            }

            if(this.state.winner !== null){
                document.getElementById('result').innerHTML = "<h1>The winner is "+this.state.winner+"</h1>";
                document.getElementById("game").remove();
            }

            this.setState(socket);
        });
    };

    // game status
    initTurn = () =>{
        socket.on('turn', turn=>{
            this.setState({
                turn: turn,
            });
        });
    };

    // button operation
    updateBoard(loc) {
        let valBoard = this.state.gameBoard;
        let moves = this.state.moves;
        let res = this.state.turn;
        let player = this.state.player;
        let ioArr = null;
        let last = '';

        if(this.state.gameBoard[loc] === ' '){
            valBoard.splice(loc, 1, res);
            moves = this.state.gameBoard.join('').replace(/ /g,'');
            last = moves.slice(-1);
            ioArr = [loc,res,moves,player];
            document.getElementById("game_form").value = ioArr;
            socket.emit('game', document.getElementById("game_form").value);

            // check for player
            if(player === 1){
                this.setState({turn: '0'});
            } else if(player === 2){
                this.setState({turn: 'X'});
            }

        }

    };

    render() {
        return (
            <div id="game_field">
                <Condition
                    player={this.state.player}
                />

                <div id="game" className={this.state.status}>
                    {this.state.gameBoard.map(function(value, i){
                        return (
                            <Tile
                                key={i}
                                loc={i}
                                value={value}
                                updateBoard={this.updateBoard.bind(this)}
                                turn={this.state.turn} />
                        );
                    }.bind(this))}
                </div>
            </div>
        );
    };

}

export default App;