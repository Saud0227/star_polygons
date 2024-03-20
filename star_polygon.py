import math


class StartPolygon:

    def __init__(self, val_n, val_step):
        self.n = val_n
        self.step = val_step
        self.loops = 1
        if self.n < self.step:
            raise ValueError('n must be greater than step')

        self.points_position = self.calculate_points_position()
        self.sides = self.calc_sides_paths()
        self.sides_position = self.calc_sides_position()

    def calculate_points_position(self):
        points = []
        for i in range(0, self.n):
            x = 1 * math.cos(2 * math.pi * i / self.n)
            y = 1 * math.sin(2 * math.pi * i / self.n)
            points.append((x, y))

        return points

    def calc_sides_paths(self):
        points_number = {i: 0 for i in range(0, self.n)}
        sides = []
        n = 0
        self.loops = 1
        while len(points_number) > 0:
            new_n = (n + self.step) % self.n
            if n not in points_number.keys():
                n = list(points_number.keys())[0]
                self.loops += 1
                continue
            sides.append((n, new_n))
            points_number.pop(n)
            n = new_n

        return sides

    def calc_sides_position(self):
        points = self.points_position
        sides = self.sides
        sides_position = []
        for side in sides:
            sides_position.append((points[side[0]], points[side[1]]))

        return sides_position

    def get_sides_by_loops(self):
        number_of_sides = len(self.sides)
        number_per_loop = number_of_sides // self.loops
        formatted_output = []
        print(number_per_loop)
        for loop in range(0, self.loops):
            formatted_output.append([])
            for item in range(0, number_per_loop):
                formatted_output[loop].append(self.sides[item + loop * number_per_loop])

        return formatted_output

if __name__ == '__main__':
    star = StartPolygon(7, 2)
    print(star.get_sides_by_loops())
    star1 = StartPolygon(7, 5)
    print(star1.get_sides_by_loops())