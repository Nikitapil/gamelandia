import { BattleshipCellModel } from "../../models/battleship/BattleShipCellModel";

export const cellsToFirebase = ( cells: BattleshipCellModel[][]) => {
    const flattenedCells = cells.flat().map(cell => ({
        x: cell.x,
        y: cell.y, 
        
    }) )
}