async function chargerModele()  // Notions : async, await, variable globale 
{
    var model;
    cocoSsd.load().then(cocoSsdModel => {
    model = cocoSsdModel;
    });
}


async function chargerImage()   // Notions : addEventListener, URL.createObjectURL(), canvas, ctx.drawImage()
{

}

async function dessinerImage()   // Notions : canvas.width, canvas.height, ctx.drawImage()
{

}


async function chargerEnrichissement()   // Notions : fetch, await, .json(), variable globale
{

}

async function enrichirObjet(classe)   // Notions : accès objet JS, opérateur ?., || (fallback)
{

}


async function detecterObjets()   // Notions : async, await, model.detect(), console.log()
{

}


async function genererInventaire(predictions)   // Notions : forEach, objet JS, comptage { bottle: 2 }
{

}


async function afficherInventaire(inventaire)   // Notions : for...in, createElement(), textContent, appendChild()
{

}


async function genererPhrase(inventaire)   // Notions : for...in, concaténation, tableau + join()
{

}


async function lirePhrase(texte)    // Notions : SpeechSynthesisUtterance, speechSynthesis.speak(), lang
{
    // Aide pour la synthèse vocale
    const utterance = new SpeechSynthesisUtterance("Votre phrase ici");
    speechSynthesis.speak(utterance);
    utterance.lang = "fr-FR";
    utterance.rate = 1;
    utterance.pitch = 1;

}


async function dessinerBoundingBoxes(predictions)    // Notions : forEach, ctx.strokeRect(), ctx.fillText(), bbox [x, y, w, h]
{

}