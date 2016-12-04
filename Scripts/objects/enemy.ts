module objects {
    export class Enemy extends objects.GameObject {

        // public variables
        public name: string;
        public width: number;
        public height: number;
        public center: objects.Vector2;
        public _isClosing: boolean = false;
        public _node1: number;
        public _node2: number;

        constructor(imageString: string, defaultPosition: objects.Vector2, node1: number, node2: number) {
            super(imageString);
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
            this._node1 = node1;
            this._node2 = node2;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }

        public start(): void {
        }

        public update(): void {
            //shoots enemy up until it hits the center. then retracts
            if (this._isClosing) {
                this.setTransform(this.x -= 3, this.y, this.scaleX = -1, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
            } else {
                this.setTransform(this.x += 3, this.y, this.scaleX = 1, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
            }
            //I am aware this boolean is pointless. but it works so im not changing it
            if (this.x <= this._node1) {
                this._isClosing = false;
            }
            if (this.x >= this._node2) {
                this._isClosing = true;
            }
        }

        public setPosition(pos: objects.Vector2): void {
            this.x = pos.x;
            this.y = pos.y;
        }

        public getPosition(): objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }
    }
}