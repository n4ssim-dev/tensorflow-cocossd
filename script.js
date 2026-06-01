const chooseFiles = document.getElementById('chooseFiles');
const selectedImg = document.getElementById('selectedImg');
const identifyObjectsButton = document.getElementById('identifyObjectsButton');
const imgDiv = document.getElementById('imgDiv');
const tbody = document.getElementById('tbody');

// Chargement du modèle et des données sémantiques
var model;
var semanticData = {};
Promise.all([
  cocoSsd.load(),
  fetch('semantic.json').then(r => r.json())
]).then(([cocoSsdModel, data]) => {
  model = cocoSsdModel;
  semanticData = data;
});

chooseFiles.onchange = evt => {
  //Clear le container de l'image 
  for(let i = 0; i < imgDivChildren.length; i++) {
    imgDiv.removeChild(imgDivChildren[i]);
  }

  // Affiche l'image sélectionné et active le bouton identifyObjects
  const [file] = chooseFiles.files
  if (file) {
    selectedImg.src = URL.createObjectURL(file)
    identifyObjectsButton.disabled = false;
  }
};

// Déclare imgDiv qui abrite les predicitions et leurs zones associés dans l'image
var imgDivChildren = [];
var inventaire = []

// Lorsque le bouton identifyObjects est appuyé l'analyse se lance
identifyObjectsButton.addEventListener('click', function() {
    // si le modèle est load
    if(model) {
        // Utilise la fonction Detect de tfjs avec comme
        // parametre selectedImg et produits des predictions avec
        // la fonction prediction de tensorflow
        model.detect(selectedImg).then(predictions => {
        console.log("Predictions: ", predictions);

        // Peuple imgDivChildren des predictions associés à une zone (Header, boxDiv, imgDiv)
        imgDivChildren = [];
        for(let i = 0; i < predictions.length; i++) {

           const boxHeader = document.createElement("p");
           boxHeader.setAttribute("class", "boxHeader");
           boxHeader.innerText = predictions[i].class  + " - " 
                                // Pourcentage de confiance dans la prédiction 
                                + Math.round(parseFloat(predictions[i].score) * 100) 
                                + "% confidence";

        // Modifie les attributs de style du header de la boîte
        // de prédiction grâce aux coordonnées rendu par prédiction
           boxHeader.style = "margin-left: " + predictions[i].bbox[0] + "px; " +
                            "margin-top: " + (predictions[i].bbox[1] - 20) + "px;" +
                            "width: " + (predictions[i].bbox[2] - 10) + "px; " + 
                            "top: 0; " +
                            "left: 0;";


        // Définis la balise qui englobe les prédiction avec les coordonnées 
        // renvoyés dans bbox[1-3] dans le json de prediction, et application
        // de ces coordo dans le css
            const boxDiv = document.createElement("div");
            boxDiv.setAttribute("class", "box");
            boxDiv.style = "left: " + predictions[i].bbox[0] + "px; " + 
                         "top: " + predictions[i].bbox[1] + "px; " +
                         "width: " + predictions[i].bbox[2] + "px; " +
                         "height: " + predictions[i].bbox[3] + "px;"

            inventaire.push(predictions[i].class)
          

            imgDiv.appendChild(boxDiv);
            imgDiv.appendChild(boxHeader);
            imgDivChildren.push(boxDiv);
            imgDivChildren.push(boxHeader);

            identifyObjectsButton.disabled = true;

            var objetsInventaire = Array.from(new Set(inventaire)).map(a =>
            ({objet:a, nb: inventaire.filter(f => f === a).length}));
        }   

        const tableBody = document.getElementById("tbody")

        for (let i=0; i< objetsInventaire.length; i++) {
            var row = tableBody.insertRow(i)
            var rownb = row.insertCell(0)
            var rowname = row.insertCell(1)

            rownb.innerHTML = objetsInventaire[i]["nb"]
            rowname.innerHTML = objetsInventaire[i]["objet"]
        }
        
        
        let phrase = `Selon mes prédictions, dans cette image il y a : `
        for (let i=0; i< objetsInventaire.length; i++) {
            const obj = objetsInventaire[i];
            const info = semanticData[obj.objet];
            const nom = info
                ? (obj.nb === 1
                    ? `${info.article} ${info.traduction}`
                    : `${obj.nb} ${info.traduction}s`)
                : `${obj.nb} ${obj.objet}`;
            phrase += `${nom}. `;
        }
        console.log(phrase)

        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = "fr-FR";
        utterance.rate = 1;
        utterance.pitch = 2;
        speechSynthesis.speak(utterance);
      });
    }
});
