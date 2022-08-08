import { InvadersFieldModel } from "./InvadersFieldModel";

export class InvadersCellModel {
    x: number;
    y: number;
    field: InvadersFieldModel;
    id: number;
    isWithElem = true

    constructor(x: number, y: number, field: InvadersFieldModel) {
        this.x = x;
        this.y = y;
        this.field = field
        this.id = Math.random()
    }

    changeDirection() {
        this.field.changeDirection()
        this.field.nextY = 10
    }

    destroyElem() {
        this.isWithElem = false
    }

    get cellEnd() {
        return {
            xEnd: this.x + 37.5,
            yEnd: this.y + 30
        }
    }
}