export class InvadersGunModel {
    x:number;
    constructor(x: number) {
        this.x = x
    }
    toLeft() {
        if (this.x > 0) {
            this.x-=8
        }
    }

    toRight() {
        if(this.x < 562) {
            this.x+=8
        }
    }
}