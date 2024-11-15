const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const sharpNotes = ["C", "D", "F", "G", "A"]; // Notes that have sharps
const flatNotes = ["D", "E", "G", "A", "B"]; // Notes that have flats

const range = ["C3", "C5"];
const synth = new Tone.Synth().toDestination();

const piano = document.querySelector("#piano");

const app = {
    setupPiano() {
        const allNaturalNotes = this.getAllNaturalNotes(range);
        const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

        // Create main SVG
        const SVG = this.createMainSVG(pianoWidth, pianoHeight);

        // Add white keys
        let whiteKeyPositionX = 0;
        allNaturalNotes.forEach((noteName) => {
            const whiteKeyGroup = utils.createSVGElement("g");

            const whiteKey = this.createKey({
                className: "white-key",
                width: whiteKeyWidth,
                height: pianoHeight,
                x: whiteKeyPositionX,
                note: noteName,
            });

            const text = utils.createText(noteName, whiteKeyPositionX + whiteKeyWidth / 2, 380);

            whiteKeyGroup.appendChild(whiteKey);
            whiteKeyGroup.appendChild(text);
            SVG.appendChild(whiteKeyGroup);

            whiteKeyPositionX += whiteKeyWidth; // Increment spacing
        });

        // Add black keys
        let blackKeyPositionX = 60; // Initial position for black keys
        allNaturalNotes.forEach((noteName, index, array) => {
            if (index === array.length - 1) return; // Skip the last key

            const currentNote = noteName[0];
            const nextNote = array[index + 1][0];

            // Skip black keys for E and B
            if ((currentNote === "E" && nextNote === "F") || (currentNote === "B" && nextNote === "C")) {
                blackKeyPositionX += whiteKeyWidth;
                return;
            }

            // Create black key
            const blackKeyGroup = utils.createSVGElement("g");

            const blackKey = this.createKey({
                className: "black-key",
                width: whiteKeyWidth / 2,
                height: pianoHeight * 0.6,
                x: blackKeyPositionX,
                note: `${currentNote}#${noteName[1]}`,
            });

            // Add sharp and flat text
            const sharpText = utils.createText(`${currentNote}#`, blackKeyPositionX + whiteKeyWidth / 4, 215);
            const flatText = utils.createText(`${nextNote}b`, blackKeyPositionX + whiteKeyWidth / 4, 235);

            sharpText.classList.add("black-key-text");
            flatText.classList.add("black-key-text");

            blackKeyGroup.appendChild(blackKey);
            blackKeyGroup.appendChild(sharpText);
            blackKeyGroup.appendChild(flatText);
            SVG.appendChild(blackKeyGroup);

            // Increment spacing for black keys
            blackKeyPositionX += whiteKeyWidth;
        });

        piano.appendChild(SVG);
    },

    createKey({ className, width, height, x, note }) {
        const key = utils.createSVGElement("rect");
        utils.setAttributes(key, {
            class: `${className} key`,
            width,
            height,
            x,
            rx: className === "white-key" ? 15 : 8,
            ry: className === "white-key" ? 15 : 8,
            "data-note": note,
        });
        key.addEventListener("click", () => this.playSound(note));
        return key;
    },

    getAllNaturalNotes([firstNote, lastNote]) {
        const [firstNoteName, firstOctave] = [firstNote[0], parseInt(firstNote[1])];
        const [lastNoteName, lastOctave] = [lastNote[0], parseInt(lastNote[1])];
        const firstNoteIndex = naturalNotes.indexOf(firstNoteName);
        const lastNoteIndex = naturalNotes.indexOf(lastNoteName);

        const notes = [];
        for (let octave = firstOctave; octave <= lastOctave; octave++) {
            if (octave === firstOctave) {
                notes.push(...naturalNotes.slice(firstNoteIndex).map(n => n + octave));
            } else if (octave === lastOctave) {
                notes.push(...naturalNotes.slice(0, lastNoteIndex + 1).map(n => n + octave));
            } else {
                notes.push(...naturalNotes.map(n => n + octave));
            }
        }
        return notes;
    },

    createMainSVG(width, height) {
        const svg = utils.createSVGElement("svg");
        utils.setAttributes(svg, {
            width: "100%",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            viewBox: `0 0 ${width} ${height}`,
        });
        return svg;
    },

    playSound(noteName) {
        synth.triggerAttackRelease(noteName, "8n");
    },
};
const utils = {
    createSVGElement(tag) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    },
    setAttributes(el, attrs) {
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    },
    createText(content, x, y) {
        const text = this.createSVGElement("text");
        text.textContent = content;
        this.setAttributes(text, { x, y, "text-anchor": "middle", class: "key-text" });
        return text;
    },
};

// Set up the piano
app.setupPiano();





// const whiteKeyWidth = 80;
// const pianoHeight = 400;

// const naturalNotes = ["C","D","E","F","G","A","B"];
// const naturalNotesSharps = ["C","D","F","G","A"];
// const naturalNotesFlats = ["D","E","G","A","B"];

// const range = ["A0","C6"];

// const piano = document.querySelector("#piano");

// const app = {
//     setupPiano(){
//         const allNaturalNotes = this.getAllNaturalNotes(range);
//         const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

//         const SVG = this.createMainSVG(pianoWidth, pianoHeight);
        

//         // Add white keys
//         let whiteKeyPositionX = 0;

//         allNaturalNotes.forEach((noteName) => {
//             const whiteKeyTextGroup = utils.createSVGElement("g");
//             const whiteKey = this.createKey({className:"white-key", width: whiteKeyWidth, height: pianoHeight});
//             const text = utils.createSVGElement("text");

//             utils.addTextContent(text, noteName);
//             utils.setAttributes(whiteKeyTextGroup,{"width" : whiteKeyWidth});
//             utils.setAttributes(text,{
//                 "x": whiteKeyPositionX + whiteKeyWidth/2,
//                 "y": 380, 
//                 "text-anchor": "middle"
//             });
//             utils.setAttributes(whiteKey,{
//                 "x":whiteKeyPositionX, 
//                 "data-note-name": noteName,
//                 "rx": "15",
//                 "ry" : "15"
//             });

//             text.classList.add("white-key-text");
//             whiteKeyTextGroup.appendChild(whiteKey);
//             whiteKeyTextGroup.appendChild(text);
//             SVG.appendChild(whiteKeyTextGroup);
            
//             //Increment spacing between keys
//             whiteKeyPositionX += whiteKeyWidth;
//         });
//         // Add black keys
//         let blackKeyPositionX = 60;
//         allNaturalNotes.forEach((naturalNote, index, array) =>{
//             // if last iteration of keys, do not add black key
//             if(index === array.length - 1 ){
//                 return;
//             }

//             const blackKeyTextGroup = utils.createSVGElement("g");
//             const blackKey = this.createKey({className:"black-key", width: whiteKeyWidth/2, height :pianoHeight/ 1.6});
//             const flatNameText = utils.createSVGElement("text");
//             const sharpNameText = utils.createSVGElement("text");

//             utils.setAttributes(blackKeyTextGroup,{"width": whiteKeyWidth/2});

//             for(let i = 0;i< naturalNotesSharps.length;i++){
//                 let naturalSharpNoteName = naturalNotesSharps[i];
//                 let naturalFlatNoteName = naturalNotesSharps[i];
//                 if (naturalSharpNoteName === naturalNote[0]){
//                     utils.setAttributes(blackKey,{
//                         "x": blackKeyPositionX,
//                         "data-sharp-name":`${naturalSharpNoteName}#${naturalNote[1]}`,
//                         "data-flat-name" :`${naturalFlatNoteName}b${naturalNote[1]}`,
//                         "rx":"8",
//                         "ry":"8"
//                     });

//                     utils.setAttributes(sharpNameText,{
//                         "text-anchor":"middle",
//                         "y": 215,
//                         "x": blackKeyPositionX + (whiteKeyWidth/4)
//                     });

//                     utils.setAttributes(flatNameText,{
//                         "text-anchor":"middle",
//                         "y": 235,
//                         "x": blackKeyPositionX + (whiteKeyWidth/4)
//                     });

//                     utils.addTextContent(sharpNameText,`${naturalSharpNoteName}#`);
//                     utils.addTextContent(flatNameText,`${naturalFlatNoteName}b`);

//                     flatNameText.classList.add("black-key-text");
//                     sharpNameText.classList.add("black-key-text");

//                     // Add double spacing between D# and A#
//                     if(naturalSharpNoteName === "D" || naturalSharpNoteName === "A"){
//                         blackKeyPositionX += whiteKeyWidth * 2;
//                     } else{
//                         blackKeyPositionX += whiteKeyWidth;
//                     }

//                     blackKeyTextGroup.appendChild(blackKey);
//                     blackKeyTextGroup.appendChild(flatNameText);
//                     blackKeyTextGroup.appendChild(sharpNameText);
                    
//                 }
//             }
//             SVG.appendChild(blackKeyTextGroup);
//         });
//         //Add main SVG to piano div
//         piano.appendChild(SVG);
//     },
//     createOctave(octaveNumber){
//         const octave = utils.createSVGElement("g");
//         octave.classList.add("octave");
//         utils.setAttributes(octave,{
//             "transform": `translate(${ octaveNumber * octaveWidth}, 0)`
//         });
//         return octave;
//     },
//     createKey({className, width, height}){
//         const key = utils.createSVGElement("rect");
//         key.classList.add(className, "key");
//         utils.setAttributes(key,{
//             "width": width,
//             "height": height
//         });
//         return key;

//     },
    
//     getAllNaturalNotes([firstNote, lastNote]){
//         // Assign octave number, notes and precisions to variables
//         const firstNoteName = firstNote[0];
//         const firstOctaveNumber = parseInt(firstNote[1]);

//         const lastNoteName = lastNote[0];
//         const lastOctaveNumber = parseInt(lastNote[1]);

//         const firstNotePosition = naturalNotes.indexOf(firstNoteName);
//         const lastNotePosition = naturalNotes.indexOf(lastNoteName);

//         const allNaturalNotes = [];
//         for(let octaveNumber = firstOctaveNumber; octaveNumber <= lastOctaveNumber; octaveNumber++){
//             // Handles first octave
//             if(octaveNumber === firstOctaveNumber){
//                 const firstOctave  = naturalNotes.slice(firstNotePosition).map((noteName) =>{
//                     allNaturalNotes.push(noteName + octaveNumber); 
//                 });
                
//             // Handles last octave
//             } else if (octaveNumber === lastOctaveNumber){
//                 const lastOctave = naturalNotes.slice(0, lastNotePosition + 1).map((noteName) =>{
//                     allNaturalNotes.push(noteName + octaveNumber);
//                 });
                
//             } else{
//                 naturalNotes.forEach((noteName) =>{
//                     allNaturalNotes.push(noteName + octaveNumber);
//                 });
//             } 
//         }
//         return allNaturalNotes;
//     },
//     createMainSVG(pianoWidth, pianoHeight){
//         const svg = utils.createSVGElement("svg");
//         utils.setAttributes(svg,{
//             "width":"100%",
//             "version":"1.1",
//             "xmlns":"http://www.w3.org/2000/svg",
//             "xmlns:xlink":"http://www.w3.org/1999/xlink",
//             "viewBox": `0 0 ${pianoWidth} ${pianoHeight}`
//         });

//         return svg;
//     },

//     displayNotes(notes){
//         const pianoKeys = document.querySelectorAll(".key");
//         utils.removeClassFromNodeCollection(pianoKeys, "show");

//         notes.forEach(noteName => {
//             pianoKeys.forEach(key => {
//                 const naturalName = key.dataset.noteName;
//                 const sharpName = key.dataset.sharpName;
//                 const flatName = key.dataset.flatName;

//                 if(naturalName === noteName || sharpName === noteName || flatName === noteName){
//                     key.classList.add("show");
//                 }
//             });

//         });
//     }
// }
// const utils = {
//     createSVGElement(el){
//         const element = document.createElementNS("http://www.w3.org/2000/svg", el);
//         return element;
//     },
//     setAttributes(el, attrs){
//         for(let key in attrs){
//             el.setAttribute(key, attrs[key]);
//         }
//     },
//     addTextContent(el, content){
//         el.textContent = content;
//     },
//     removeClassFromNodeCollection(nodeCollection, classToRemove){
//         nodeCollection.forEach(node =>{
//             if(node.classList.contains(classToRemove)){
//                 node.classList.remove(classToRemove);
//             }
//         })
//     }
// }

// app.setupPiano();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             