export class InvadersGunModel {
    x:number;
    constructor(x: number) {
        this.x = x
    }
    toLeft() {
        if (this.x > 0) {
            this.x-=1
        }
    }

    toRight() {
        if(this.x < 540) {
            this.x+=1
        }
    }
}