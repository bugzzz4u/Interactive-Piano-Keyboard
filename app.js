let numberofOctaves = 3;
const octaveWidth = 560;

const SVG = `<svg
    width="100%"
    viewBox = "0 0 ${numberofOctaves * octaveWidth} 400"
    version ="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <g id ="piano-keyboard">
    </g>
</svg>`;

const piano = document.querySelector("#piano");

const app = {
    setupPiano(){
        //Add main SVG to piano div
        piano.innerHTML = SVG;
        const pianoKeyboard = document.querySelector("piano-keyboard");

        //Create octaves 
        for(let i = 0;i<numberofOctaves;i++){
                const octave = util.createSVGElement("g");
                octave.classList.add("octave");
                octave.setAttribute("transform", `translate(${i * octaveWidth}, 0)`);


                let whiteKeyXPosition = 0;
                //Add white keys to octave
                for(let i = 0;i<7;i++){
                    const whiteKey = utils.createSVGElement("rect");
                    whiteKey.classList.add("white-key");
                    whiteKey.setAttribute("x", whiteKeyXPosition);
                    whiteKey.setAttribute("width", 80);
                    whiteKey.setAttribute("height", 400);
                    whiteKeyXPosition += 80;
                    octave.appendChild(whiteKey);
                    
                }
                pianoKeyboard.appendChild(octave);
        }
    }
}

const utils = {
    createSVGElement(el){
        const element = document.createElementNS("http://www.w3.org/2000/svg", el);
        return element;
    }
}

app.setupPiano()