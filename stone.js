class Stone {
    constructor(x, y, w, h) {
        var options = {
            restitution: 0.5,
            density: 10
        }
        this.body = Bodies.circle(x, y, w / 2, options);
        this.radius = w;
        World.add(world, this.body);
        this.image = loadImage("stone.png");
        this.height = h;
    }

    display() {
        var pos = this.body.position
        var angle = this.body.angle
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.radius, this.height);
        pop();
    }
}