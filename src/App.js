/**
 * @module {react} Main module of REACT project
 */

import React, { Component } from 'react';

/** 
 * @class
 * @classdesc Cell of game board
 * @extends Component
 */
class Cell extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    /**
     * Collection of properties
     * @type {object}
     */
    this.props = props;
    this.state = {backgroundColor: props.backgroundColor};
  }
  
  /**
  * Render element
  * @return {object} Rendering html object
  */
  render() {
    const cellStyle = {
      backgroundColor: this.state.backgroundColor,
      width: this.props.cellSize-1, 
      height: this.props.cellSize-1,
      left: this.props.x,
      top: this.props.y
    };
    
    return <div className="cell" key={this.props.id} style={cellStyle}/>;
  }
  
  /**
   * @return {number} X coordinate of cell
   */
  getX() {return this.props.x;}

  /**
   * @return {number} Y coordinate of cell
   */
  getY() {return this.props.y;}
}

/** 
 * @class
 * @classdesc Game board class
 * @extends Component
 */
class GameBoard extends Component {
  /**
   * Collection of properties
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    /**
     * Collection of element properties
     * @type {object}
     */
    this.props = props;
    
    /**
     * 2D array of cells
     * @type {array}
     */
    this.cells = null;

    this.initCells();
  }
  
  /**
   * Creates 2D array of Game board
   */
  initCells() {
    this.cells = new Array(this.props.width);
    
    for (let i=0; i<this.props.width; i++)
      this.cells[i] = new Array(this.props.height);
    
    for (let i=0; i<this.props.width; i++)
      for (let j=0; j<this.props.height; j++) {
//        let n = Math.floor(Math.random()*0xFFFFFF);
//        let s = "#"+n.toString(16);
//        console.log(s);
        let props = {
          cellSize: this.props.cellSize,
          backgroundColor: "#F1F1F1",
          x: i*this.props.cellSize,
          y: j*this.props.cellSize,
          id: `c_${i}_${j}`
        };
        this.cells[i][j] = new Cell(props);
      }
  }

  /**
   * @return {object} Rendering html object
   */
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
  
  /**
   * @return {number} width of view of game board 
   */
  getWidth() {
    return this.props.cellSize * this.props.width;
  }
  
  /**
   * @return {number} height of view of game board 
   */
  getHeight() {
    return this.props.cellSize * this.props.height;
  }
}

/** 
 * @class
 * @classdesc Game view
 * @extends Component
 */
class App extends Component {
  /**
   * @param {object} props
   */
  constructor (props) {
    super(props);
    /** Game board */
    this.gameBoard = new GameBoard(
      {
        cellSize:20,
        width:10,
        height:22,
      }
    );
    gb = this.gameBoard;
  }
  
  /**
   * @return {object} Rendering html object
   */
  render() {    
    return (
      <div className="App" id="mainRoot">
        <h1>Hello World!</h1>
        {this.gameBoard.render()}
        <button type="button"
          onClick={this.changeColor}>Click</button>
      </div>
    );
  }
  
  changeColor() {
    gb.cells[0][0].state = {backgroundColor: "red"};
  }
}

var gb = null;

export default App;