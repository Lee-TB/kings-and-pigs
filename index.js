const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024; // 64 x 16
canvas.height = 576; // 64 x 9
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
