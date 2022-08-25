import { TetrisCellModel } from "./TetrisCellModel";

export class TetrisBoardModel {
    cells:TetrisCellModel[][] = []


    initCells() {
        for (let i = 0; i< 20; i++) {
            const row = []
            for (let j = 0; j<10; j++) {
                row.push(new TetrisCellModel(this, j, i))
            }
            this.cells.push(row)
        }
    }

    getCell(y: number, x: number) {
        return this.cells[y][x]
    }
}