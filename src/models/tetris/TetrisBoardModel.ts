import { TetrisFigureModel } from "./Figures/TetrisFigureModel";
import { TFigureModel } from "./Figures/TFigureModel";
import { TetrisCellModel } from "./TetrisCellModel";

export class TetrisBoardModel {
    cells:TetrisCellModel[][] = []
    currentFigure: TetrisFigureModel| null = null

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
        return this.cells[y]?.[x]
    }

    startGame() {
        this.currentFigure = new TFigureModel(this)
    }


    copyBoard() {
        const newBoard = new TetrisBoardModel()
        newBoard.cells = this.cells
        newBoard.currentFigure = this.currentFigure
        return newBoard
    }

    clearRows() {
        const rowsToClear = this.cells.filter(row => row.every(cell => !!cell.elem))
        if (rowsToClear.length) {
            rowsToClear.forEach((row) => {
                const index = this.cells.indexOf(row)
                row.forEach(cell => cell.elem = null)
                for (let i = index-1; i >= 0; i--) {
                    this.cells[i].forEach(cell => {
                        cell.elem?.move(this.getCell(cell.y + 1, cell.x))
                    });
                }
            })
        }
    }
}