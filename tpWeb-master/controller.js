var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
  this.currEditingMode = editingMode.line;
  this.currLineWidth = 5;
  this.currColour = "#000000";
  this.currentShape = 0;

  // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

  this.selectRectangleEditingMode = function () {
    this.currEditingMode = editingMode.rect;
  }.bind(this);

  this.selectLineEditingMode = function () {
    this.currEditingMode = editingMode.line;
  }.bind(this);

  this.selectColour = function (colour) {
    this.currColour = colour;
  }.bind(this);

  this.removeLastShape = function () {
    if (drawing.shapeArray.length == 0) return;
    drawing.shapeArray.pop();
    drawing.paint(ctx);
  };

  new DnD(canvas, this);

  // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
  this.onInteractionStart = function (dnd) {
    if (this.currEditingMode == editingMode.line) {
      this.currentShape = new Line();
    } else {
      this.currentShape = new Rectangle();
    }
  }.bind(this);

  this.onInteractionUpdate = function (dnd) {
    if (this.currEditingMode == editingMode.line) {
      this.currentShape = new Line(
        dnd.initX,
        dnd.initY,
        this.currLineWidth,
        this.currColour,
        dnd.finalX,
        dnd.finalY
      );
    } else {
      this.currentShape = new Rectangle(
        dnd.initX,
        dnd.initY,
        this.currLineWidth,
        this.currColour,
        dnd.finalY - dnd.initY,
        dnd.finalX - dnd.initX
      );
    }
    drawing.paint(ctx);
    this.currentShape.paint(ctx);
  }.bind(this);

  this.onInteractionEnd = function (dnd) {
    drawing.shapeArray.push(this.currentShape);
    drawing.paint(ctx);
  }.bind(this);
}
