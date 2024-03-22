from star_polygon import StarPolygon
from polygon_handler import PolygonHandler
from polygon_display import PolygonDisplay


def prep_handler(item):
    item.set_input([(10, 2), (10, 3), (10, 4)])


def main():
    width = 800
    height = 800
    display = PolygonDisplay(width, height)

    handler = PolygonHandler(StarPolygon)

    prep_handler(handler)

    display.run_with_handler(handler, (400, 400), 100)
    display.set_to_be_closed()
    display.wait()
    # display.close()


if __name__ == '__main__':
    main()
