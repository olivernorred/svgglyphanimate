const text = {
    fontfile: "fonts/Taters0.2-Baked.otf",
    content: "my name jeff",
    x: 0,
    y: 200,
    size: 150,
    fill: "#fff",
    stroke: "black",
    strokewidth: 2,
};
opentypeLoad(text);

let g = 5;

function animateSVG(text) {
    g += 0.2;
    for (let i = 0; i < text.points.length; i++) {
        const item = text.points[i];
        item.y += 0.3 * Math.sin(item.x + g);
    }
    renderText(text);
    requestAnimationFrame(() => animateSVG(text));
}
