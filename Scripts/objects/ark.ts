//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 3, 2016

module objects {
    export class Ark extends createjs.Shape {
        private _mouseX: number;
        private _mouseY: number;

        constructor() {
            super();
            this.graphics.beginStroke("#ff0000").arc(0, 0, this._mouseX, 0, Math.PI, true);
            this.start();
        }

        public start(): void {
            //this.regX = 0;
            //this.regY = this.getBounds().height;
        }

        public update(): void {
            this._mouseX = stage.mouseX - this.x;
            this._mouseY = stage.mouseY - this.y;
            this.setTransform(this.x, this.y, this.scaleX = this._mouseX, this.scaleY = this._mouseY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
        }
    }
}