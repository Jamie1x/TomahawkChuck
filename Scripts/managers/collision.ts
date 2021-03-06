//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 5, 2016

module managers {
    export class Collision {
        constructor() {
            this.start();
        }

        public start() {

        }

        public update() {

        }

        public check(coll: objects.GameObject, objColliding: objects.Enemy, container: createjs.Container) {
            // Check distance between LASER and enemy

            if ((coll.x + coll.getBounds().width * 0.5) > (objColliding.x - objColliding.getBounds().width * 0.5) &&
                (coll.y - coll.getBounds().height * 0.5) < (objColliding.y + objColliding.getBounds().height * 0.5) &&
                (coll.y + coll.getBounds().height * 0.5) > (objColliding.y - objColliding.getBounds().height * 0.5) &&
                (coll.x - coll.getBounds().width * 0.5) < (objColliding.x + objColliding.getBounds().width * 0.5)) {
                this.destroy(objColliding, container);
            }

            if ((coll.x + coll.getBounds().width * 0.5) > (objColliding.x - objColliding.getBounds().width * 0.5)) {
                //console.log("passed left");
            }
            if ((coll.y - coll.getBounds().height * 0.5) < (objColliding.y + objColliding.getBounds().height * 0.5)) {
                //console.log("passed bottom");
            }
            if ((coll.y + coll.getBounds().height * 0.5) > (objColliding.y - objColliding.getBounds().height * 0.5)) {
                //console.log("passed top");
            }
            if ((coll.x - coll.getBounds().width * 0.5) < (objColliding.x + objColliding.getBounds().width * 0.5)) {
                //console.log("passed back");
            }
        }

        private destroy(objToDestroy: objects.Enemy, objDestroyedFrom: createjs.Container): void {
            //objToDestroy.y = 1000;
            if (objToDestroy.getIsDead() == false) {
                objToDestroy.Destroy();
            }
        }

        public checkChuck(coll: objects.Enemy, objColliding: createjs.Bitmap, container: createjs.Container) {
            // Check distance between LASER and enemy

            if ((coll.x + coll.getBounds().width * 0.5) > (objColliding.x - objColliding.getBounds().width * 0.5) &&
                (coll.y - coll.getBounds().height * 0.5) < (objColliding.y + objColliding.getBounds().height * 0.5) &&
                (coll.y + coll.getBounds().height * 0.5) > (objColliding.y - objColliding.getBounds().height * 0.5) &&
                (coll.x - coll.getBounds().width * 0.5) < (objColliding.x + objColliding.getBounds().width * 0.5)) {
                if (!coll.getIsDead()) {
                    scene = config.Scene.GAMEOVER;
                    changeScene();
                }
            }
        }
    }
}