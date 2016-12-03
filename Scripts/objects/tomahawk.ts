//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 3, 2016

module objects {
    export class Tomahawk extends objects.GameObject {

        private _gravity: number = 3;

        private _velocity: objects.Vector2;
        private _isGrounded: boolean = false;
        private _isThrown: boolean = false;
        private _mouseX: number;
        private _mouseY: number;
        private _speed: number = 15;

        constructor(imgString: string) {
            super(imgString);
            this.start();
        }

        public start(): void {
            this.gotoAndStop(6);
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(30, 0);
            this.scaleX = this.scaleX / 2;
            this.scaleY = this.scaleY / 2;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }

        public update(): void {

            //may change to config.Screen.CENTER_X
            this._mouseX = stage.mouseX - this.x;
            this._mouseY = stage.mouseY - this.y;

            if (this._isThrown) {
            this.rotation += 5;
            this.gotoAndStop(3);
                if (this._isGrounded) {
                    this._velocity.y = 0;
                    this._velocity.x = 0;
                    this.rotation = 0;
                    this._isThrown = false;
                } else {
                    this._velocity.y += this._gravity;
                }
            }

            if(this.position.y >= config.Screen.HEIGHT){
                this._isGrounded = true;
            }

            // Position
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y;

            //restraints
            if(this._velocity.x > this._speed){
                this._velocity.x = this._speed;
            }
            /*if(this._velocity.y < -this._speed){
                this._velocity.y = this._speed;
            }*/
            if (this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }

            console.log("Position" + this.position + " Vel: " + this._velocity);
            console.log("X: " + stage.mouseX + " Y: " + stage.mouseY);
            super.update();
        }

        public throw(): void {
            this.setIsGrounded(false);
            //will change depending on mouse
            this._velocity.x = this._mouseX/5;
            this._velocity.y = this._mouseY/5;
            this._isThrown = true;
        }

        /*public resetAcceleration(): void {
            this._velocity.x = 0;
            this.gotoAndStop("Tomahawk");
        }*/

        //getters and setters
        public getVelocity(): objects.Vector2 {
            return this._velocity;
        }
        public setVelocity(newVelocity: objects.Vector2) {
            this._velocity = newVelocity;
        }

        public getIsGrounded(): boolean {
            return this._isGrounded;
        }
        public setIsGrounded(b: boolean): void {
            this._isGrounded = b;
        }

        public getIsThrown(): boolean {
            return this._isThrown;
        }
        public setIsThrown(b: boolean): void {
            this._isThrown = b;
        }
    }
}