# GUIDE DE FONCTIONNEMENT Daidtech


<strong>Architecture du projet</strong>

```
.
├── assets      # images à prédire
│   ├── image1
│   ├── image2
│   ├── image3
│   ├── image4
│   ├── image5
│   └── image6
├── guides      # Livrables
│   ├── guide_fonctionnement
│   └── guide_utilisation
├── CONTRIBUTING.md
├── index.html
├── README.md
├── script.js
├── semantic.json
└── style.css

```
<strong>Structure des prédictions (JSON)</strong>

Prédictions : tableau d'objets (une entrée par détection).

Chaque objet de détection :
class (string) — label prédict (ex: "person", "bottle").
score (number, 0..1) — confiance (ex: 0.8473).
bbox (array de 4 nombres) — boîte englobante [x, y, width, height] en pixels :
x : coordonnée gauche (px)
y : coordonnée haut (px)
width : largeur de la boîte (px)
height : hauteur de la boîte (px)


<strong>Pipeline complet (image → prédiction → inventaire → voix)</strong> 
Image dectection/ Analyse (faire tableau)

Aquisition de l'image (prendre ou charger la photo)
 Normalisation de l'image
Detection/Analyse de l'image 
Construction de l'inventaire + Enrichissement
Synthèse vocale




<strong>Gestion du JSON sémantique</strong>

L’utilisateur choisit une image → selectedImg.src = URL.createObjectURL(file).
L’utilisateur clique sur "identify" → model.detect(selectedImg).
Pour chaque detection :
On crée et positionne une boîte et un label (bbox, class, score).
On ajoute le label class au tableau inventaire.
On agrège inventaire pour obtenir objetsInventaire [{objet, nb}].
On remplit le tableau HTML (tbody) avec counts.
On construit une phrase enrichie via semanticData et on la lit avec SpeechSynthesis.


<strong>Piste(s) d’amélioration technique(s) </strong>

 Prendre une photo d'une scène à analyser :
 
    GetUserMedia → capture frame via canvas.drawImage → canvas.toBlob() (photo depuis la caméras)

    Sauvegarder naturalWidth/naturalHeight et displayedWidth/Height (garder ses dimensions); 

    Gérer orientation EXIF et compression/resizing configurable.(reduire la taille si besoins).