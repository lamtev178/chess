import {cell} from "../../types/board"
export function pawn(board:cell[], cell:cell, color:"WHITE" | "DARK"):cell[]  {
  let res = []
  const line = cell.cell[0]
  res = [...board.map(c => {
  const cLine = c.cell[0]
  const oneLine = cLine === line
  const cNum = c.cell[1]
  const nextNum = +cell.cell[1] + (color === "DARK" ? + 1 : - 1 ) + ""
  const adjacentLinesLeft:string = String.fromCharCode(line.charCodeAt(0) - 1)
  const adjacentLinesRight:string = String.fromCharCode(line.charCodeAt(0) + 1)
  const pieceColor = c.piece?.split('_')[1] === color
  const isPeceLeft = c.cell===(adjacentLinesLeft+nextNum) && pieceColor
  const isPeceRight = c.cell===(adjacentLinesRight+nextNum) && pieceColor
  let canPushOnThirdNum = false
  let canPushOnFourthNum = false
  if(cell.cell[1]==='7' && color==="WHITE"){
    canPushOnThirdNum = cNum === "6" && c.piece===null
    canPushOnFourthNum = (cNum === "5" && c.piece===null && ([...board.filter(c => c.cell[0] === cLine && c.cell[1]==="6" && c.piece !== null)].length !== 1))
  }
  if(cell.cell[1]==='2' && color === "DARK"){
    canPushOnThirdNum = cNum === "3" && c.piece===null
    canPushOnFourthNum = (cNum === "4" && c.piece===null && ([...board.filter(c => c.cell[0] === cLine && c.cell[1]==="3" && c.piece !== null)].length !== 1))
  }
  const canPushPawn = oneLine && (cNum === nextNum) && (c.piece === null)
  const canPushPawnFromTwo = oneLine && (canPushOnThirdNum || canPushOnFourthNum)
  if(canPushPawn || isPeceLeft || isPeceRight || canPushPawnFromTwo)
    return {...c, available:true}
  return c
  })]
  return res
}
