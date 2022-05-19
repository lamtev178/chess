import {cell} from "../../types/board"

export function knight(board:cell[], cell:cell, color:string):cell[]{
  let res = []
  res = [...board.map(c => {
    const plusOneLines:boolean =c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 1) || c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 1)
    const plusTwoLines:boolean =c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 2) || c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 2)
    const plusTwoNums:boolean =c.cell[1] === +cell.cell[1] + 2 + "" || c.cell[1] === +cell.cell[1] - 2 + ""
    const plusOneNums:boolean =c.cell[1] === +cell.cell[1] + 1 + "" || c.cell[1] === +cell.cell[1] - 1 + ""
    const isColor:boolean = c.piece?.split('_')[1] !== color
    if(plusOneLines && plusTwoNums &&  isColor)
      return {...c, available:true}
    else if(plusOneLines && plusTwoNums && isColor )
      return {...c, available:true}
    else if(plusTwoLines && plusOneNums && isColor )
      return {...c, available:true}
    else if(plusTwoLines && plusOneNums && isColor )
      return {...c, available:true}
    else
      return c
  })]
  return res
}
