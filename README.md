# svgglyphanimate
animate glyphs with javascript and render them on an svg canvas


The skeleton of an svgglyphanimate script is:
1. Define the `text` object and ask opentype.js to read it
2. Define the `animateSVG(text)` function with a `for` loop, and
3. End the `animateSVG(text)` function with the `renderText(text)` function and a `requestAnimationFrame(() => animateSVG(text))`

In your HTML, create an SVG element and define the viewbox, then fetch the scripts, as follows:
```
<svg
    id="svgglyphanimate"
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    viewbox="0 -100 1000 1000"
></svg>
<script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
<script src="svgglyphanimate.js"></script>
<script src="yourscript.js"></script>
```


Here's an example script:
```
const text = {
    fontfile:"fonts/Taters0.2-Baked.otf",
    content: "my name jeff",
    x: 0,
    y: 200,
    size: 150,
    fill: "#fff",
    stroke: "black",
    strokewidth: 2
};
opentypeLoad(text);


let g=5;

function animateSVG(text) {
    g+=.2;
    for (let i = 0; i < text.points.length; i++) {
        const item = text.points[i];

        item.y += .3*Math.sin(item.x+g);

    }
    renderText(text);
    requestAnimationFrame(() => animateSVG(text))
}
```

`opentypeLoad(text)` defines an array of points, `text.points` in an SVG-path-like object. Each `item` in the
