import pathlib
import anywidget
import traitlets

class Ellipse(anywidget.AnyWidget):
    content = traitlets.Float(0).tag(sync=True)
    _esm =  pathlib.Path(__file__).parent / "ellipse.js"
    _css=  pathlib.Path(__file__).parent / "ellipse.css"
