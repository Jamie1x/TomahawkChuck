//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 5, 2016
var managers;
(function (managers) {
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () {
        };
        Collision.prototype.update = function () {
        };
        Collision.prototype.check = function (coll, objColliding, container) {
            // Check distance between LASER and enemy
            if ((coll.x + coll.getBounds().width * 0.5) > (objColliding.x - objColliding.getBounds().width * 0.5) &&
                (coll.y - coll.getBounds().height * 0.5) < (objColliding.y + objColliding.getBounds().height * 0.5) &&
                (coll.y + coll.getBounds().height * 0.5) > (objColliding.y - objColliding.getBounds().height * 0.5) &&
                (coll.x - coll.getBounds().width * 0.5) < (objColliding.x + objColliding.getBounds().width * 0.5)) {
                this.destroy(objColliding, container);
            }
            if ((coll.x + coll.getBounds().width * 0.5) > (objColliding.x - objColliding.getBounds().width * 0.5)) {
            }
            if ((coll.y - coll.getBounds().height * 0.5) < (objColliding.y + objColliding.getBounds().height * 0.5)) {
            }
            if ((coll.y + coll.getBounds().height * 0.5) > (objColliding.y - objColliding.getBounds().height * 0.5)) {
            }
            if ((coll.x - coll.getBounds().width * 0.5) < (objColliding.x + objColliding.getBounds().width * 0.5)) {
            }
        };
        Collision.prototype.destroy = function (objToDestroy, objDestroyedFrom) {
            objDestroyedFrom.removeChild(objToDestroy);
            objToDestroy.y = 1000;
            score++;
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map