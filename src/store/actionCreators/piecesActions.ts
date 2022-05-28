import { Dispatch } from "react";
import {boardAction, BoardActionTypes, cell} from "../../types/board"
import {pieces} from "../../types/pieces"
import {bishop} from './bishop'
import {rook} from "./rook"
import {knight} from "./knight"
import {pawn} from "./pawn"
import {king} from "./king"
import {isKingAttacked} from "./king"

let whiteKingPos:cell = {cell:"e1", piece:pieces.KING_WHITE, available:false}
let darkKingPos:cell = {cell:"e8", piece:pieces.KING_DARK, available:false}

export const movePiece = (cell:cell, board:cell[], formerCell:cell) => (dispatch:Dispatch<boardAction>) => {
  let res:cell[]=[];
  board = [...board.map(c => c.available===true ? {...c, available:false} : c)]
  if(formerCell.piece === pieces.KING_WHITE)
    whiteKingPos.cell = cell.cell
  if(cell.piece === pieces.KING_DARK)
    darkKingPos.cell = cell.cell
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
  const color = cell.piece?.split("_")[1]
  if(color==="WHITE" && turn === "white"){
    switch(cell.piece){
      case pieces.KING_WHITE:{
        let availableCells  = king(cell, board, "WHITE")
        res = [...board.map(c => {
          if(availableCells.indexOf(c.cell) !== -1 && !isKingAttacked(c, whiteKingPos, board, "WHITE")){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case pieces.QUEEN_WHITE:{
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
      case pieces.ROOK_WHITE:{
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
      case pieces.PAWN_WHITE:{
        res = pawn(board, cell, "DARK")
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case pieces.BISHOP_WHITE:{
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
      case pieces.KNIGHT_WHITE: {
        const resArr:string[] = knight(board, cell, "WHITE")
        res = [...board.map(c => {
          if(resArr.indexOf(c.cell) !== -1){
            return {...c, available:true}
          } else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
    }
  }
  if(color==="DARK" && turn === "dark"){
    switch(cell.piece){
      case pieces.KING_DARK:{
        let availableCells  = king(cell, board, "DARK")
        res = [...board.map(c => {
          if(availableCells.indexOf(c.cell) !== -1 && !isKingAttacked(c, whiteKingPos, board, "DARK")){
            return {...c, available:true}
          }
          else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case pieces.QUEEN_DARK:{
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
      case pieces.ROOK_DARK:{
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
      case pieces.PAWN_DARK:{
        res = pawn(board, cell, "WHITE")
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
      case pieces.BISHOP_DARK:{
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
      case pieces.KNIGHT_DARK:{
        const resArr:string[] = knight(board, cell, "DARK")        
        res = [...board.map(c => {
          if(resArr.indexOf(c.cell) !== -1){
            return {...c, available:true}
          } else return c
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
    }
  }
  dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:board})
}
