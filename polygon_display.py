from tkinter import Tk, Canvas
from time import sleep

from star_polygon import StarPolygon
from polygon_handler import PolygonHandler


class PolygonDisplay:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.root = Tk()
        self.canvas = Canvas(self.root, width=width, height=height)
        self.canvas.pack()
        self.root.update()

        self.polygon = None
        self.lines = None
        self.circle = None

    def draw_polygon(self, polygon, color):
        if self.polygon is not None:
            self.clear()
        points = []
        for p in polygon:
            points.append(p[0])
            points.append(p[1])
        self.polygon = self.canvas.create_polygon(points, outline=color, fill='', width=4)
        self.root.update()

    def draw_line(self, start, end, color):
        line_item = self.canvas.create_line(start[0], start[1], end[0], end[1], fill=color, width=4)
        self.root.update()

        return line_item

    def draw_lines(self, lines, color):
        if self.lines is not None:
            for line in self.lines:
                self.canvas.delete(line)
        self.lines = []
        for line_chords in lines:
            new_line = self.draw_line(line_chords[0], line_chords[1], color)
            self.lines.append(new_line)

    def draw_star_polygon(self, polygon_data, color):
        # self.draw_polygon(polygon_data[0], color)
        self.draw_lines(polygon_data[1], color)
        self.root.update()

    def draw_dotted_circle(self, center, radius, color):
        if self.circle is not None:
            self.canvas.delete(self.circle)
        x, y = center
        circle = self.canvas.create_oval(x - radius, y - radius, x + radius, y + radius, outline=color, width=4,
                                         dash=(4, 4))
        self.root.update()

    def clear(self):
        self.canvas.delete("all")
        self.root.update()

    def wait(self):
        self.root.mainloop()

    def close(self):
        self.root.destroy()

    def close_event(self, event):
        self.close()
        quit()

    def set_to_be_closed(self):
        self.root.bind('<Button-1>', self.close_event)
        self.root.bind('<FocusOut>', self.close_event)
        self.root.update()

    def run_with_handler(self, handler, position: tuple, scaler: int):
        # provide handler with input
        handler.set_scaler(scaler)
        handler.set_transform(position)
        self.draw_dotted_circle(position, scaler, 'black')
        handler.add_to_execute('get_points_real_position')
        handler.add_to_execute('get_sides_real_position')
        handler.execute()
        for row in handler.outputs:
            polygon, polygon_data = row
            print(repr(polygon))
            self.draw_star_polygon(polygon_data, 'black')
            sleep(1)


def main():
    width = 800
    height = 800
    display = PolygonDisplay(width, height)

    handler = PolygonHandler(StarPolygon)

    handler.set_input([(a, b) for a in range(3, 10) for b in range(1, a)])

    display.run_with_handler(handler, (400, 400), 100)
    display.set_to_be_closed()
    display.wait()
    # display.close()


if __name__ == '__main__':
    main()
