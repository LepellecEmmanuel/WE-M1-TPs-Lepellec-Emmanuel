const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const butRectElement = document.getElementById("butRect");
const butLineElement = document.getElementById("butLine");
const colourElement = document.getElementById("colour");
const undoBtnElement = document.getElementById("undoBtn");

canvas.width = 800;
canvas.height = 600;

// Code temporaire pour tester le DnD
//new DnD(canvas);
ctx.fillStyle = "#F0F0F0";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const drawing = new Drawing();
const pencil = new Pencil(ctx, drawing, canvas);

butRectElement.addEventListener("click", () => {
  pencil.selectRectangleEditingMode();
});

butLineElement.addEventListener("click", () => {
  pencil.selectLineEditingMode();
});

colourElement.addEventListener("change", (event) => {
  pencil.selectColour(event.target.value);
});

undoBtnElement.addEventListener("click", () => {
  pencil.removeLastShape();
});
