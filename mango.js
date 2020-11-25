class Mango {
    constructor(x, y, w, h) {
        var options = {
            isStatic: true,
            restitution: 0.2
        }

        this.body = Bodies.circle(x, y, w/2, options);
        this.radius = w;
        World.add(world, this.body);
        this.image = loadImage("mango.png");
        this.height = h;
    }

    display() {
        push();;
        imageMode(CENTER);
        image(this.image,this.body.position.x, this.body.position.y, this.radius, this.height);
        pop();
    }
}