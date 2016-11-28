/*
    Object module to group all user-defined objects under the same "namespace aka module"
    Button class extends the createjs bitmap class and provides a clean interface for creating clickable objects
*/

module objects {
    export class Button extends createjs.Bitmap {
        width: number;
        height : number;

        constructor(pathString: string, x:number, y:number) {
            super(assets.getResult(pathString));
            // Set the position of the button
            this.x = x;
            this.y = y;

            // Set the size of the button
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            // Set the registration point of the button. This is used for transformations
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            // Register mouseover and mouseout event listeners. 
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }

        // Modify the bitmaps alpha value when hovering over the button
        overButton(event: createjs.MouseEvent) : void {
            //this.rotation += 15;
            this.setTransform(this.x, this.y, this.scaleX * 1.1, this.scaleY * 1.1, this.rotation + 15, this.skewX, this.skewY, this.regX, this.regY);
        }
        
        // Modify the bitmaps alphave when mouse is not hovering
        outButton(event:createjs.MouseEvent) : void {
            //this.rotation -= 15;
            this.setTransform(this.x, this.y, this.scaleX / 1.1, this.scaleY / 1.1, this.rotation - 15, this.skewX, this.skewY, this.regX, this.regY);

        }
    }
}