class DotTrace {

    constructor(position_array, speed) {
        this.position_array = [];
        for (let i = 0; i < position_array.length; i++) {
            this.position_array.push(createVector(position_array[i][0][0], position_array[i][0][1]));
        }
        this.speed = speed;
        this.sections = position_array.length;
        this.sectionsDone = 0;
        this.drawPos = this.position_array[0].copy();
        this.position_array.push(this.drawPos.copy());
        this.traceDone = false
    }

    update() {
        if (this.traceDone) {
            return;
        }
        let delta = p5.Vector.sub(this.position_array[this.sectionsDone + 1], this.drawPos);
        if (delta.mag() < this.speed) {
            this.sectionsDone++;
            if (this.sectionsDone == this.sections) {
                this.traceDone = true;
                return;
            }
            this.drawPos = this.position_array[this.sectionsDone].copy();
        }
        else {
            delta.limit(this.speed);
            this.drawPos.add(delta);
        }
    }

    draw() {
        for (let i = 0; i < this.sectionsDone; i++) {
            line(this.position_array[i].x, this.position_array[i].y, this.position_array[i + 1].x, this.position_array[i + 1].y);
        }
        if (this.sectionsDone < this.sections) {
            line(this.position_array[this.sectionsDone].x, this.position_array[this.sectionsDone].y, this.drawPos.x, this.drawPos.y);
        }
    }


}