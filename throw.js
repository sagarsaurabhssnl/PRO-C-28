class Throw {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.02,
            length: 0
        }

        this.body = Matter.Constraint.create(options);
        this.pointB = pointB
        World.add(world, this.body);
    }

    throw() {
        this.body.bodyA = null;
    }

    attach(body) {
        this.body.bodyA = body;
    }

    display() {
        if (this.body.bodyA) {
            var pointA = this.body.bodyA.position
            var pointB = this.pointB
            strokeWeight(5);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
    }
}