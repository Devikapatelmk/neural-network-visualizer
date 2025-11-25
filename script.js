function loadNetwork() {
    fetch("/api/model")
        .then(r => r.json())
        .then(data => drawNetwork(data.layers));
}

function drawNetwork(layers) {
    const svg = document.getElementById("canvas");
    svg.innerHTML = "";

    const width = 1000;
    const height = 600;
    const layerGap = width / (layers.length + 1);

    layers.forEach((neurons, layerIndex) => {
        const x = (layerIndex + 1) * layerGap;

        for (let i = 0; i < neurons; i++) {
            const y = (i + 1) * (height / (neurons + 1));

            // Draw neuron
            let c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("cx", x);
            c.setAttribute("cy", y);
            c.setAttribute("r", "18");
            c.setAttribute("fill", "rgba(255,255,255,0.2)");
            c.setAttribute("stroke", "#0ff");
            c.setAttribute("stroke-width", "2");
            c.style.filter = "drop-shadow(0 0 10px #00eaff)";
            svg.appendChild(c);

            // Draw connections
            if (layerIndex > 0) {
                let prev = layers[layerIndex - 1];
                for (let p = 0; p < prev; p++) {
                    const prevY = (p + 1) * (height / (prev + 1));

                    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", x - layerGap);
                    line.setAttribute("y1", prevY);
                    line.setAttribute("x2", x);
                    line.setAttribute("y2", y);
                    line.setAttribute("stroke", "#0ff");
                    line.setAttribute("stroke-width", "1.5");
                    svg.appendChild(line);
                }
            }
        }
    });
}
