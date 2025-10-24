// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  // Définir ici les attributs de la 'classe'

  this.initX = 0;
  this.initY = 0;
  this.finalX = 0;
  this.finalY = 0;
  this.isClicked = false;
  this.interactor = interactor;

  // Developper les 3 fonctions gérant les événements
  this.mouseClick = function (event) {
    this.isClicked = true;
    const position = getMousePosition(canvas, event);
    this.initX = position.x;
    this.initY = position.y;
    this.interactor.onInteractionStart(this);
  }.bind(this);

  this.mouseMove = function (event) {
    if (!this.isClicked) return;
    const position = getMousePosition(canvas, event);
    this.finalX = position.x;
    this.finalY = position.y;
    this.interactor.onInteractionUpdate(this);
  }.bind(this);

  this.mouseRelease = function (event) {
    this.isClicked = false;
    this.interactor.onInteractionEnd(this);
  }.bind(this);

  // Associer les fonctions précédentes aux évènements du canvas.

  canvas.addEventListener("mousedown", this.mouseClick);
  canvas.addEventListener("mousemove", this.mouseMove);
  canvas.addEventListener("mouseup", this.mouseRelease);
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
