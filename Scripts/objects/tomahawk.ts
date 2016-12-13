//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 3, 2016

module objects {
    export class Tomahawk extends objects.GameObject {
        //private _gravity: number = 9.81;
        private _velocity: objects.Vector2;
        //state transition booleans
        private _isThrown: boolean = false;
        private _isMoving: boolean = false;
        private _hitPeak: boolean = false;
        private _isGrounded: boolean = false;
        //diff of this and mouse
        private _mouseX: number;


        //dif of this and start
        private _startDiffX: number;
        private _startDiffY: number;
        private _speed: number = 50;
        private _timer: number = 100;
        private _startPos: objects.Vector2;

        constructor(imgString: string) {
            super(imgString);
            this.start();
        }

        public start(): void {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(30, 0);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.scaleX = this.scaleX/1.25;
            this.scaleY = this.scaleY/1.25;

            this._startPos = this.position;
        }

        public update(): void {

            this._startDiffX = this._startPos.x - this.x;
            this._startDiffY = this._startPos.y - this.y;

            if (this._isThrown) {
                this._isMoving = true;
                this._isThrown = false;
                //will change depending on mouse
                this._velocity.x = 8;
                this._velocity.y = -8;

            }

            // Position
            if (this._isMoving) {
                if (this.position.x >= stage.mouseX*2 - 400) {
                    this._hitPeak = true;
                }
                this.rotation += 5;
                this.position.x += this._velocity.x;
                if (this._hitPeak) {
                    this.position.y += -this._velocity.y;
                }
                else {
                    this.position.y += this._velocity.y;
                }

            } else {
                this._velocity.y = 0;
                this._velocity.x = 0;
                this.rotation = 0;
                this._isThrown = false;
            }

            //hit ground
            if (this.position.y >= config.Screen.HEIGHT) {
                this.rotation = 125;
                this._isMoving = false;
                this._hitPeak = false;
                this._isGrounded = true;
                this._timer--;
                if (this._timer <= 0) {
                    this._isGrounded = false;
                    this._timer = 100;
                    this.position.y = config.Screen.HEIGHT - 100;
                    this.position.x = 400;
                    tomahawks--;
                }
            }
            //restraints
            if (this._velocity.x > this._speed) {
                this._velocity.x = this._speed;
            }
            /*if (this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }*/

            //console.log("Position" + this.position + " Vel: " + this._velocity);
            //console.log("X: " + stage.mouseX + " Y: " + stage.mouseY);
            //console.log("timer: " + this._timer);
            super.update();
        }

        public throw(): void {
            if (!this._isMoving) {
                this._mouseX = stage.mouseX - this.x;
                this._isThrown = true;
            }
        }

        //getters and setters
        public getVelocity(): objects.Vector2 {
            return this._velocity;
        }
        public setVelocity(newVelocity: objects.Vector2) {
            this._velocity = newVelocity;
        }

        public getIsMoving(): boolean {
            return this._isMoving;
        }
        public setIsMoving(b: boolean): void {
            this._isMoving = b;
        }

        public getIsThrown(): boolean {
            return this._isThrown;
        }
        public setIsThrown(b: boolean): void {
            this._isThrown = b;
        }

        public getIsGrounded(): boolean {
            return this._isGrounded;
        }
        public setIsGrounded(b: boolean): void {
            this._isGrounded = b;
        }
    }
}