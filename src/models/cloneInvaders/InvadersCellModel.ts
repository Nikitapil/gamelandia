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
}