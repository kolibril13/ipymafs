import pathlib
import anywidget
import traitlets

class Ellipse(anywidget.AnyWidget):
    _esm =  pathlib.Path(__file__).parent / "ellipse.js"
    _css=  pathlib.Path(__file__).parent / "ellipse.css"

class Bezier(anywidget.AnyWidget):
    p1x = traitlets.Float(-5).tag(sync=True)
    _esm =  pathlib.Path(__file__).parent / "bezier.js"
    _css=  pathlib.Path(__file__).parent / "bezier.css"

class Line(anywidget.AnyWidget):
    my_vector = traitlets.Any([5,5]).tag(sync=True)
    _esm =  pathlib.Path(__file__).parent / "line.js"
    _css=  pathlib.Path(__file__).parent / "line.css"