import React from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm'

class App extends React.Component {

  idCounter = 4; // the numer of initial players.

  state = {
    players: [
      {
        name: "Guil",
        id: 1,
        score: 0
      },
      {
        name: "Treasure",
        id: 2,
        score: 0,
      },
      {
        name: "Ashley",
        id: 3,
        score: 0,
      },
      {
        name: "James",
        id: 4,
        score: 0,
      }
    ]
  };

  /**
   * Handle score change in each counter.
   * @param {*} delta - indicates the value to add on score (positive or negative one).
   */
  handleScoreChange = (indexChanged, delta) => {
    this.setState(prevState => ({
      score: prevState.players.map((player, index) => {
        if (indexChanged === index) {
          player.score += delta;
        }
        return player;
      }),
    }));
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name: name,
            score: 0,
            id: this.idCounter += 1
          }
        ]
      }   
    });
  }

  handleRemovePlayer = (id) => {
    this.setState(prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  isHighest = (crownIndex) => {
    let crownScore = this.state.players[crownIndex].score;

    console.log(crownScore);
    if(crownScore === 0) {
      return false;
    }

    for(let i=0; i<this.state.players.length; i++) {
      const thisPlayer = this.state.players[i];
      if(thisPlayer.score > crownScore) {
        return false;
      }
    }

    return true;
  }

  render() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players}/>
        {/* Players list */}
        {this.state.players.map((player, index) =>
          <Player
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index}
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}
            isHighest={this.isHighest(index)}
          />
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    );
  }
}

export default App;
