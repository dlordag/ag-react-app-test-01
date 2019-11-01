import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
    const cellStyle = {
      backgroundColor: this.props.backgroundColor,
      width: this.props.cellSize-1,
      height: this.props.cellSize-1,
      left: this.props.x,
      top: this.props.y
    };
    
    return <div className="cell" key={this.props.id} style={cellStyle}/>;
  }
  
  getX() {return this.props.x;}
  getY() {return this.props.y;}
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.initCells();
  }
  
  initCells() {
    this.cells = new Array(this.props.width);
    
    for (let i=0; i<this.props.width; i++)
      this.cells[i] = new Array(this.props.height);
    
    for (let i=0; i<this.props.width; i++)
      for (let j=0; j<this.props.height; j++) {
        let n = Math.floor(Math.random()*0xFFFFFF);
        let s = "#"+n.toString(16);
        console.log(s);
        let props = {
          cellSize: this.props.cellSize,
          backgroundColor: s,
          x: i*this.props.cellSize,
          y: j*this.props.cellSize,
          id: `c_${i}_${j}`
        };
        this.cells[i][j] = new Cell(props);
      }
  }
  
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      position: "relative",
      width: this.getWidth() + "px",
      height: this.getHeight() + "px"
    };

    return(
      <div className="GameBoard" style={mystyle}>
      {this.cells.map(col => col.map(c => c.render()))}
      </div>
    )
  }
  
  getWidth() {
    return this.props.cellSize * this.props.width;
  }
  
  getHeight() {
    return this.props.cellSize * this.props.height;
  }
}

class App extends Component {
  constructor (props) {
    super(props);
    this.gameBoard = new GameBoard(
      {
        cellSize:20,
        width:10,
        height:22,
      }
    );
  }
  
  render() {    
    return (
      <div className="App" id="mainRoot">
        <h1>Hello World!</h1>
        {this.gameBoard.render()}
      </div>
    );
  }
}

export default App;