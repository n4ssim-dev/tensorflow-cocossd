const chooseFiles = document.getElementById('chooseFiles');
const selectedImg = document.getElementById('selectedImg');
const identifyObjectsButton = document.getElementById('identifyObjectsButton');
const exportJsonButton = document.getElementById('exportJsonButton');
const imgDiv = document.getElementById('imgDiv');
const tbody = document.getElementById('tbody');
const phrasePrediction = document.getElementById('phrase-prediction')
var imageLink;

// Chargement du modèle et des données sémantiques
var model;
var semanticData = {};

cocoSsd.load().then(m => { model = m; });
fetch('semantic.json').then(r => r.json()).then(data => { semanticData = data; });

chooseFiles.onchange = evt => {
  //Clear le container de l'image 
  for(let i = 0; i < imgDivChildren.length; i++) {
    imgDiv.removeChild(imgDivChildren[i]);
  }

  // Affiche l'image sélectionné et active le bouton identifyObjects (Analyse)
  const [file] = chooseFiles.files
  if (file) {
    selectedImg.src = URL.createObjectURL(file)
    var imgLink = selectedImg.src
    identifyObjectsButton.disabled = false;
    imageLink = imgLink
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
            // renvoyés dans bbox[0-3] dans le json de prediction, et application
            // de ces coordo dans le css (espace avec le gauche et droite + largeur et hauteur)
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

        var result = {
          "date": new Date().toLocaleString(),
          "image": imageLink,
          "inventaire": objetsInventaire.map(item => ({
            "nom": item.objet,
            "qte": item.nb
          }))
        }

        // Cible les objets préexistants déja push dans le local storage
        // et lui ajoute l'objet result
        var existing = JSON.parse(localStorage.getItem('results') || '[]');
        existing.push(result);
        localStorage.setItem('results', JSON.stringify(existing));
        console.log("Objet stocké avec succès dans le localStorage.")

        exportJsonButton.disabled = false;

        const tableBody = document.getElementById("tbody")

        // Stockage des values de objetsInventaire dans des row de la table
        // du HTML
        for (let i=0; i< objetsInventaire.length; i++) {
            var row = tableBody.insertRow(i)
            var rownb = row.insertCell(0)
            var rowname = row.insertCell(1)

            rownb.innerHTML = objetsInventaire[i]["nb"]
            rowname.innerHTML = objetsInventaire[i]["objet"]
        }
        
        // Grepher à la fin de la 'phrase' les objets et leurs nombre
        // avec enrichissement sémantique
        let phrase = `Selon mes prédictions, dans cette image il y a : `
        for (let i=0; i< objetsInventaire.length; i++) {
            const obj = objetsInventaire[i];
            const info = semanticData[obj.objet];
            // Opérateur ternaire , si obj.nb === 1 => ligne1(?), sinon ligne2(:)
            // Si l'objet n'est pas dans info, on affiche {nb}{objet}
            const nom = info
                ? (obj.nb === 1
                    ? `${info.article} ${info.traduction}, c'est ${info.description}`
                    : `${obj.nb} ${info.traduction}s, c'est ${info.description}`)
                : `${obj.nb} ${obj.objet}`;
            phrase += `${nom}. `;
        }

        phrasePrediction.innerText = phrase
        console.log(phrase)

        // TTS de la phrase
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = "fr-FR";
        utterance.rate = 1;
        utterance.pitch = 2;
        speechSynthesis.speak(utterance);
      });
    }
});

exportJsonButton.addEventListener('click', function() {
    var existing = JSON.parse(localStorage.getItem('results') || '[]');
    var blob = new Blob([JSON.stringify(existing, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'results.json';
    a.click();
    URL.revokeObjectURL(url);
});

// ---- !
// Généré par IA dans une balise script dans le HTML initialement
// ---- !

function initUI() {
    selectedImg.addEventListener('load', () => imgDiv.classList.add('has-image'));

    const emptyRow = tbody.querySelector('.empty-row');
    new MutationObserver(() => {
        if (emptyRow) emptyRow.style.display = tbody.querySelectorAll('tr:not(.empty-row)').length > 0 ? 'none' : '';
    }).observe(tbody, { childList: true });

    [identifyObjectsButton, exportJsonButton].forEach(btn => {
        new MutationObserver(() => btn.setAttribute('aria-disabled', String(btn.disabled)))
            .observe(btn, { attributes: true, attributeFilter: ['disabled'] });
    });
}

initUI();
