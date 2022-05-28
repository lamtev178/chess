import { cell } from '../../types/board'
import { pieces } from '../../types/pieces'

export function rook(cell:cell, board:cell[], king?: "WHITE" | "DARK"):string[]{
  let arrOfLinesWithPieces:string[] = []
  let resArrOfLinesWithPieces:string[] = []
  let arrOfNumsWithPieces:string[] = []
  let resArrOfNumsWithPieces:string[] = []
  for (let c of board){
    const line = cell.cell[0]
    const cLine = c.cell[0]
    const num = cell.cell[1]
    const cNum = c.cell[1]
    const oneLine = cLine === line
    const oneNum = num === cNum
    const isPiece = king ? (c.piece === null ||  c.piece === (king === "WHITE" ? pieces.KING_WHITE : pieces.KNIGHT_DARK)) : c.piece === null
    if(oneLine && isPiece && !oneNum)
      arrOfLinesWithPieces.push(c.cell[1])
    if(oneNum && isPiece && !oneLine)
      arrOfNumsWithPieces.push(c.cell[0])
  }
  
  for(let i = +cell.cell[1]+1; i<9 ; i++ ){
    if(arrOfLinesWithPieces.indexOf(i+"") !== -1)
      resArrOfLinesWithPieces.push(cell.cell[0] + i)
    else {
      resArrOfLinesWithPieces.push(cell.cell[0] + i)
      break
    }
  }
  for(let i = +cell.cell[1]-1; i>0 ; i-- ){
    if(arrOfLinesWithPieces.indexOf(i+"") !== -1)
      resArrOfLinesWithPieces.push(cell.cell[0] + i)
    else {
      resArrOfLinesWithPieces.push(cell.cell[0] + i)
      break
    }
  }
  for(let i = cell.cell[0].charCodeAt(0)-1; i>96 ; i-- ){
    if(arrOfNumsWithPieces.indexOf(String.fromCharCode(i)) !== -1)
      resArrOfNumsWithPieces.push(String.fromCharCode(i)+cell.cell[1])
    else {
      resArrOfNumsWithPieces.push(String.fromCharCode(i)+cell.cell[1])
      break
      }
    }
  for(let i = cell.cell[0].charCodeAt(0)+1; i<105 ; i++ ){
    if(arrOfNumsWithPieces.indexOf(String.fromCharCode(i)) !== -1)
      resArrOfNumsWithPieces.push(String.fromCharCode(i)+cell.cell[1])
    else {
      resArrOfNumsWithPieces.push(String.fromCharCode(i)+cell.cell[1])
      break
    }
  }
  return resArrOfLinesWithPieces.concat(resArrOfNumsWithPieces)
}
