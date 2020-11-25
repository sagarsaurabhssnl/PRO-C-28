class Platform {
    constructor(x, y, w, h) {
        var options = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.width = w;
        this.height = h;
        World.add(world, this.body);
    }

    display() {
        push();
        rectMode(CENTER);
        strokeWeight(5);
        fill("brown");
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}