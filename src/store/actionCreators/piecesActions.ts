import { Dispatch } from "react";
import {boardAction, BoardActionTypes, cell} from "../../types/board"
function bishop(cell:cell, board:cell[]):string[]{
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
          const isPiece:boolean = c.piece === null     
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
function rook(cell:cell, board:cell[]):string[]{
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
          const isPiece = c.piece === null
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

export const clickOnFigure = (cell:cell, board:cell[]) => (dispatch:Dispatch<boardAction>) => {
  board = [...board.map(c => c.available===true ? {...c, available:false} : c)]
  let res:cell[] = [];
  const figure = cell.piece?.split("_")[0]
  const color = cell.piece?.split("_")[1]
  if(color==="WHITE"){
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
        const line = cell.cell[0]
        if(cell.cell[1]==='2')
          res = [...board.map(c => { 
            const cLine = c.cell[0] 
            const oneLine = cLine === line
            const cNum = c.cell[1]
            const nextNum = +cell.cell[1] + 1 +""
            const adjacentLinesLeft:string = String.fromCharCode(line.charCodeAt(0) - 1)
            const pieceColor = c.piece?.split('_')[1] === "DARK"
            const adjacentLinesRight:string = String.fromCharCode(line.charCodeAt(0) + 1)
            const isDarkPeceLeft = c.cell===(adjacentLinesLeft+nextNum) && pieceColor
            const isDarkPeceRight = c.cell===(adjacentLinesRight+nextNum) && pieceColor
            const canPushOnThirdNum = cNum === "3" && c.piece===null
            const canPushOnFourthNum = (cNum === "4" && c.piece===null && ([...board.filter(c => c.cell[0] === cLine && c.cell[1]==="3" && c.piece !== null)].length !== 1))
            if((oneLine && (canPushOnThirdNum || canPushOnFourthNum)) || isDarkPeceLeft || isDarkPeceRight)
              return {...c, available:true} 
            else return c
          })]
        else res = [...board.map(c => {
          const cLine = c.cell[0] 
          const oneLine = cLine === line
          const cNum = c.cell[1]
          const nextNum = +cell.cell[1] + 1 +""
          const adjacentLinesLeft:string = String.fromCharCode(line.charCodeAt(0) - 1)
          const adjacentLinesRight:string = String.fromCharCode(line.charCodeAt(0) + 1)
          const pieceColor = c.piece?.split('_')[1] === "DARK"
          const isDarkPeceLeft = c.cell===(adjacentLinesLeft+nextNum) && pieceColor
          const isDarkPeceRight = c.cell===(adjacentLinesRight+nextNum) && pieceColor
          const canPushPawn = oneLine && (cNum === nextNum) && (c.piece === null)
          if(canPushPawn || isDarkPeceLeft || isDarkPeceRight)
            return {...c, available:true} 
          return c
          })]
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
        res = [...board.map(c => {
          const plusOneLines:boolean =c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 1) || c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 1)
          const plusTwoLines:boolean =c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 2) || c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 2)
          const plusTwoNums:boolean =c.cell[1] === +cell.cell[1] + 2 + "" || c.cell[1] === +cell.cell[1] - 2 + ""
          const plusOneNums:boolean =c.cell[1] === +cell.cell[1] + 1 + "" || c.cell[1] === +cell.cell[1] - 1 + ""
          const isWhite:boolean = c.piece?.split('_')[1] !== "WHITE"
          if(plusOneLines && plusTwoNums &&  isWhite) 
            return {...c, available:true}
          else if(plusOneLines && plusTwoNums && isWhite )
            return {...c, available:true}
          else if(plusTwoLines && plusOneNums && isWhite )
            return {...c, available:true}
          else if(plusTwoLines && plusOneNums && isWhite )
            return {...c, available:true}
          else 
            return c 
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
    }
  }else{ 
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
        const line = cell.cell[0]
        if(cell.cell[1]==='7')
          res = [...board.map(c => { 
            const cLine = c.cell[0] 
            const oneLine = cLine === line
            const cNum = c.cell[1]
            const nextNum = +cell.cell[1] - 1 +""
            const adjacentLinesLeft:string = String.fromCharCode(line.charCodeAt(0) - 1)
            const pieceColor = c.piece?.split('_')[1] === "WHITE"
            const adjacentLinesRight:string = String.fromCharCode(line.charCodeAt(0) + 1)
            const isWhitePeceLeft = c.cell===(adjacentLinesLeft+nextNum) && pieceColor
            const isWhitePeceRight = c.cell===(adjacentLinesRight+nextNum) && pieceColor
            const canPushOnThirdNum = cNum === "6" && c.piece===null
            const canPushOnFourthNum = (cNum === "5" && c.piece===null && ([...board.filter(c => c.cell[0] === cLine && c.cell[1]==="6" && c.piece !== null)].length !== 1))
            if((oneLine && (canPushOnThirdNum || canPushOnFourthNum)) || isWhitePeceLeft || isWhitePeceRight)
              return {...c, available:true} 
            else return c
          })]
        else res = [...board.map(c => {
          const cLine = c.cell[0] 
          const oneLine = cLine === line
          const cNum = c.cell[1]
          const nextNum = +cell.cell[1] - 1 +""
          const adjacentLinesLeft:string = String.fromCharCode(line.charCodeAt(0) - 1)
          const adjacentLinesRight:string = String.fromCharCode(line.charCodeAt(0) + 1)
          const pieceColor = c.piece?.split('_')[1] === "WHITE"
          const isWhitePeceLeft = c.cell===(adjacentLinesLeft+nextNum) && pieceColor
          const isWhitePeceRight = c.cell===(adjacentLinesRight+nextNum) && pieceColor
          const canPushPawn = oneLine && (cNum === nextNum) && (c.piece === null)
          if(canPushPawn || isWhitePeceLeft || isWhitePeceRight)
            return {...c, available:true} 
          return c
          })]          
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
        res = [...board.map(c => {
          const plusOneLines:boolean =c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 1) || c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 1)
          const plusTwoLines:boolean =c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 2) || c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 2)
          const plusTwoNums:boolean =c.cell[1] === +cell.cell[1] + 2 + "" || c.cell[1] === +cell.cell[1] - 2 + ""
          const plusOneNums:boolean =c.cell[1] === +cell.cell[1] + 1 + "" || c.cell[1] === +cell.cell[1] - 1 + ""
          const isWhite:boolean = c.piece?.split('_')[1] !== "DARK"
          if(plusOneLines && plusTwoNums &&  isWhite) 
            return {...c, available:true}
          else if(plusOneLines && plusTwoNums && isWhite )
            return {...c, available:true}
          else if(plusTwoLines && plusOneNums && isWhite )
            return {...c, available:true}
          else if(plusTwoLines && plusOneNums && isWhite )
            return {...c, available:true}
          else 
            return c 
        })]
        return dispatch({type:BoardActionTypes.CLICK_ON_FIGURE, payload:res});
      }
    }
  }
}