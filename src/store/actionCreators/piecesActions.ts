import { Dispatch } from "react";
import {boardAction, BoardActionTypes, cell} from "../../types/board"
import {bishop} from './bishop'
import {rook} from "./rook"
import {knight} from "./knight"
import {pawn} from "./pawn"

export const movePiece = (cell:cell, board:cell[], formerCell:cell) => (dispatch:Dispatch<boardAction>) => {
  let res:cell[]=[];
  board = [...board.map(c => c.available===true ? {...c, available:false} : c)]
  res = [...board.map(c => {
    if(c.cell === cell.cell)
      return{...c, piece: formerCell.piece}
    else
    if(c.cell === formerCell.cell)
      return{...c, piece: null}
    return c
    })]
  dispatch({type:BoardActionTypes.MOVE_PIECE, payload: res});
}
export const clickOnFigure = (cell:cell, board:cell[], turn:string) => (dispatch:Dispatch<boardAction>) => {
  board = [...board.map(c => c.available===true ? {...c, available:false} : c)]
  let res:cell[] = [];
  const figure = cell.piece?.split("_")[0]
  const color = cell.piece?.split("_")[1]
  if(color==="WHITE" && turn == "white"){
    switch(figure){
      case "KING":
        return console.log("KING");
      case "QUEEN":{
        const resArrOfAvailableCells = rook(cell, board)
        const resArrOfAvailableNums = bishop(cell, board)
        res = [...board.map(c => {
          const isWhite:boolean = c.piece?.split('_')[1] !== "WHITE"
          if((resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite) || (resArrOfAvailableCells.indexOf(c.cell) !== -1 && isWhite)){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "ROOK":{
        const resArrOfAvailableNums = rook(cell, board)
        res = [...board.map(c => {
          const isWhite:boolean = c.piece?.split('_')[1] !== "WHITE"
          if(resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "PAWN":{
        res = pawn(board, cell, "DARK")
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "BISHOP":{
      const resArrOfAvailableNums = bishop(cell, board)
      res = [...board.map(c => {
          const isWhite:boolean = c.piece?.split('_')[1] !== "WHITE"
          if(resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "KNIGHT": {
        res = knight(board, cell, "WHITE")
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
    }
  }
  if(color==="DARK" && turn == "dark"){
    switch(figure){
      case "KING":
        return console.log("KING");
      case "QUEEN":{
        const resArrOfAvailableCells = rook(cell, board)
        const resArrOfAvailableNums = bishop(cell, board)
        res = [...board.map(c => {
          const isWhite:boolean = c.piece?.split('_')[1] !== "DARK"
          if((resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite) || (resArrOfAvailableCells.indexOf(c.cell) !== -1 && isWhite)){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "ROOK":{
        const resArrOfAvailableNums = rook(cell, board)
        res = [...board.map(c => {
          const isWhite:boolean = c.piece?.split('_')[1] !== "DARK"
          if(resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "PAWN":{
        res = pawn(board, cell, "WHITE")
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "BISHOP":{
      const resArrOfAvailableNums = bishop(cell, board)
      res = [...board.map(c => {
          const isWhite:boolean = c.piece?.split('_')[1] !== "DARK"
          if(resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case "KNIGHT":{
        res = knight(board, cell, "DARK")
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
    }
  }
  dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:board})
}
