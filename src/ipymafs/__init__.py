import pathlib
import anywidget
import traitlets

class Mafs(anywidget.AnyWidget):
    content = traitlets.Unicode("Hi").tag(sync=True)
    _esm =  pathlib.Path(__file__).parent / "widget.js"
    _css=  pathlib.Path(__file__).parent / "widget.css"
