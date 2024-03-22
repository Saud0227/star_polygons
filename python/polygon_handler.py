from star_polygon import StarPolygon


class PolygonHandler:

    def __init__(self, polygon_class):
        self.polygon = polygon_class
        self.standards = {'scaler': 1, 'transform': (0, 0)}
        self.to_execute = []
        self.inputs = []
        self.outputs = []

    def set_scaler(self, scaler):
        self.standards['scaler'] = scaler

    def set_transform(self, transform):
        self.standards['transform'] = transform

    def add_to_execute(self, function):
        if not hasattr(self.polygon, function):
            raise AttributeError(f'{function} is not a method of {self.polygon.__class__.__name__}')
        self.to_execute.append(function)

    def add_input(self, values: tuple):
        self.inputs.append(values)

    def set_input(self, full_input: list):
        self.inputs = full_input

    def execute(self):
        for values in self.inputs:
            item = self.polygon(*values)

            for key, value in self.standards.items():
                setattr(item, key, value)

            returns = []
            for function in self.to_execute:
                returns.append(getattr(item, function)())
            if len(returns) == 1:
                returns =  returns[0]
            self.outputs.append([item, returns])


def main():
    handler = PolygonHandler(StarPolygon)
    handler.set_scaler(100)
    handler.set_transform((400, 400))
    handler.add_to_execute('get_points_real_position')
    handler.add_input((5, 2))
    handler.add_input((5, 4))
    handler.execute()
    for row in handler.outputs:
        print(row)


if __name__ == '__main__':
    main()