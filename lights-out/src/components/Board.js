import React, { Component } from 'react';
import Cell from './Cell';
import '../style/Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25,
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    const board = [];

    for (let x = 0; x < this.props.nRows; x++) {
      const row = [];
      for (let y = 0; y < this.props.nCols; y++) {
        // decide if on or off, true or false - if less than .25 is true
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    let { nRows, nCols } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split('-').map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[x][y] = !board[x][y];
      }
    }

    // flip initial cell
    flipCell(x, y);
    // flip the cells around it
    flipCell(x, y - 1); // left
    flipCell(x, y + 1); // right
    flipCell(x - 1, y); // above
    flipCell(x + 1, y); // below

    // win when every cell is turned off or false
    let hasWon = board.every((row) => row.every((cell) => !cell));

    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */
  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon)
      return (
        <div className="winner">
          <span className="neon-orange">YOU</span>
          <span className="neon-blue">WIN!</span>
        </div>
      );

    // create tableBoard variable representing the rows and cells to generate
    const tableBoard = [];

    for (let x = 0; x < this.props.nRows; x++) {
      const row = [];
      for (let y = 0; y < this.props.nCols; y++) {
        let coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[x][y]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(<tr key={x}>{row}</tr>);
    }

    return (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
