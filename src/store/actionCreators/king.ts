import {cell} from "../../types/board"

export function  king(cell : cell, board : cell[], color: "WHITE" | "DARK"):string[] {
  let res : string[] = []
  board.forEach(c => {
    const isNextNums:boolean = c.cell[1] === +cell.cell[1] + 1 + ""
    const isNums:boolean = c.cell[1] === cell.cell[1]
    const isPrevNums:boolean = c.cell[1] === +cell.cell[1] - 1 + ""
    const isLine:boolean = c.cell[0] === cell.cell[0]
    const isPrevLine:boolean = c.cell[0].charCodeAt(0) - 1 === cell.cell[0].charCodeAt(0)
    const isNextLine:boolean = c.cell[0].charCodeAt(0) + 1 === cell.cell[0].charCodeAt(0)
    const isPiece:boolean = c.piece === null
    const isPieceColor:boolean = c.piece?.split("_")[1] !== color
    if((isNextNums || isPrevNums || isNums) && (isLine || isNextLine || isPrevLine) && (isPiece || isPieceColor)){
      res.push(c.cell)
    }
  })
  return res
}
export function isKingAttacked(kingPos : string, board : cell[], color: "WHITE" | "DARK"):boolean{
  let isAttacked:boolean = false;
  return isAttacked
}
