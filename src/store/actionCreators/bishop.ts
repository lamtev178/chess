import { cell } from "../../types/board"
import { pieces } from "../../types/pieces"

export function bishop(cell:cell, board:cell[], king? : "WHITE" | "DARK"):string[]{
  let arrOfRightDiagonalWithPieces:string[] = []
  let resArrOfRightDiagonalWithPieces:string[] = []
  let arrOfLeftDiagonalWithPieces:string[] = []
  let resArrOfLeftDiagonalWithPieces:string[] = []
  const rightDiagonal:string[] = []
  const leftDiagonal:string[] = []
  for(let i = 1; i < 8; i ++){
    let resCell:string = ""
    if(+cell.cell[1] + i < 9 && cell.cell[0].charCodeAt(0) + i < 105){
      resCell = String.fromCharCode(cell.cell[0].charCodeAt(0) + i) + (+cell.cell[1] + i)
      rightDiagonal.push(resCell)
    }
    else break
    }
    for(let i = 1; i < 8; i ++){
      let resCell:string = ""
      if(+cell.cell[1] - i > 0 && cell.cell[0].charCodeAt(0) - i > 96){
        resCell = String.fromCharCode(cell.cell[0].charCodeAt(0) - i) + (+cell.cell[1] - i)
        rightDiagonal.push(resCell)
      }
      else break
      }
      for(let i = 1; i < 8; i ++){
        let resCell:string = ""
        if(+cell.cell[1] + i < 9 && cell.cell[0].charCodeAt(0) - i > 96){
          resCell = String.fromCharCode(cell.cell[0].charCodeAt(0) - i) + (+cell.cell[1] + i)
          leftDiagonal.push(resCell)
        }
        else break
      }
      for(let i = 1; i < 8; i ++){
        let resCell:string = ""
        if(+cell.cell[1] - i > 0 && cell.cell[0].charCodeAt(0) + i < 105 ){
          resCell = String.fromCharCode(cell.cell[0].charCodeAt(0) + i) + (+cell.cell[1] - i)
          leftDiagonal.push(resCell)
        }
        else break
      }
      for (let c of board){
        const isRightDiagonal:boolean = rightDiagonal.indexOf(c.cell) !== -1
        const isLeftDiagonal:boolean = leftDiagonal.indexOf(c.cell) !== -1
        const isPiece:boolean = king ? (c.piece === null || c.piece === (king === "WHITE" ? pieces.KING_WHITE : pieces.KING_DARK))  : c.piece === null
        if(isRightDiagonal && isPiece)
          arrOfRightDiagonalWithPieces.push(c.cell)
        if(isLeftDiagonal && isPiece)
          arrOfLeftDiagonalWithPieces.push(c.cell)
      }
      for(let i = 1; i < 8; i ++){
        let nexCell =  String.fromCharCode(cell.cell[0].charCodeAt(0) + i) + "" + (+cell.cell[1] + i) ;
        if(arrOfRightDiagonalWithPieces.indexOf(nexCell) !== -1){
          resArrOfRightDiagonalWithPieces.push(nexCell)
        }
        else {
          resArrOfLeftDiagonalWithPieces.push(nexCell)
          break
        }
      }
      for(let i = 1; i < 8; i ++){
        let nexCell = String.fromCharCode(cell.cell[0].charCodeAt(0) - i) + "" + (+cell.cell[1] - i);
        if(arrOfRightDiagonalWithPieces.indexOf(nexCell) !== -1){
          resArrOfRightDiagonalWithPieces.push(nexCell)
        }
          else {
          resArrOfLeftDiagonalWithPieces.push(nexCell)
          break
        }
        }
      for(let i = 1; i < 8; i ++){
        let nexCell = String.fromCharCode(cell.cell[0].charCodeAt(0) + i) + "" + (+cell.cell[1] - i);
        if(arrOfLeftDiagonalWithPieces.indexOf(nexCell) !== -1){
          resArrOfLeftDiagonalWithPieces.push(nexCell)
        }
          else {
          resArrOfLeftDiagonalWithPieces.push(nexCell)
          break
        }
        }
      for(let i = 1; i < 8; i ++){
        let nexCell = String.fromCharCode(cell.cell[0].charCodeAt(0) - i) + "" + (+cell.cell[1] + i);
        if(arrOfLeftDiagonalWithPieces.indexOf(nexCell) !== -1){
          resArrOfLeftDiagonalWithPieces.push(nexCell)
        }
        else {
          resArrOfLeftDiagonalWithPieces.push(nexCell)
          break
        }
      }
      return resArrOfRightDiagonalWithPieces.concat(resArrOfLeftDiagonalWithPieces)
}
