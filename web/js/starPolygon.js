class StarPolygon {
    constructor(val_n, val_step) {
        this.n = val_n;
        this.step = val_step;
        this.loops = 1;
        if (this.n < this.step) {
            throw new Error('n must be greater than step');
        }

        this.points_position = this.calculatePointsPosition();
        this.sides = this.calcSidesPaths();
        this.sides_position = this.calcSidesPosition();

        this.scaler = 1;
        this.transform = [0, 0];
    }

    toString() {
        return `StarPolygon(${this.n}, ${this.step})`;
    }

    calculatePointsPosition() {
        let points = [];
        for (let i = 0; i < this.n; i++) {
            let x = 1 * Math.cos(2 * Math.PI * i / this.n);
            let y = 1 * Math.sin(2 * Math.PI * i / this.n);
            points.push([x, y]);
        }

        return points;
    }

    calcSidesPaths() {
        let pointsNumber = {};
        for (let i = 0; i < this.n; i++) {
            pointsNumber[i] = 0;
        }

        let sides = [];
        let n = 0;
        this.loops = 1;
        while (Object.keys(pointsNumber).length > 0) {
            let newN = (n + this.step) % this.n;
            if (!(n in pointsNumber)) {
                console.log("Loop");
                n = Number(Object.keys(pointsNumber)[0]);
                this.loops++;
                continue;
            }
            sides.push([n, newN]);
            delete pointsNumber[n];
            n = newN;
        }

        return sides;
    }

    calcSidesPosition() {
        let points = this.points_position;
        let sides = this.sides;
        let sidesPosition = [];
        for (const side of sides) {
            sidesPosition.push([points[side[0]], points[side[1]]]);
        }

        return sidesPosition;
    }

    getSidesByLoops() {
        let numberOfSides = this.sides.length;
        let numberPerLoop = Math.floor(numberOfSides / this.loops);
        let formattedOutput = [];
        for (let loop = 0; loop < this.loops; loop++) {
            formattedOutput.push([]);
            for (let item = 0; item < numberPerLoop; item++) {
                formattedOutput[loop].push(this.sides[item + loop * numberPerLoop]);
            }
        }

        return formattedOutput;
    }

    getPointsRealPosition() {
        let points = this.points_position;
        let pointsByScale = points.map(([a, b]) => [a * this.scaler + this.transform[0], b * this.scaler + this.transform[1]]);
        return pointsByScale;
    }

    getSidesRealPosition() {
        let sides = this.sides_position;
        let sidesByScale = sides.map(([a, b]) => ([
            [a[0] * this.scaler + this.transform[0], a[1] * this.scaler + this.transform[1]],
            [b[0] * this.scaler + this.transform[0], b[1] * this.scaler + this.transform[1]]
        ]));
        return sidesByScale;
    }

    getSidesByLoopsRealPosition() {
        let sides = this.getSidesRealPosition();
        let splitParts = Math.ceil(sides.length / this.loops);
        let splittedSides = [];
        for (let i = 0; i < sides.length; i += splitParts) {
            splittedSides.push(sides.slice(i, i + splitParts));
        }
        return splittedSides;
    }

    getPointsByLoopsRealPosition() {
        let points = this.getPointsRealPosition();
        let splitParts = Math.ceil(points.length / this.loops);
        let splittedPoints = [];
        for (let i = 0; i < points.length; i += splitParts) {
            splittedPoints.push(points.slice(i, i + splitParts));
        }
        return splittedPoints;
    }
}
