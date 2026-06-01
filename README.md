# Projet tensorflow cocossd

Créer une mini-application web capable de :

1. Recevoir une image (upload, URL, ou webcam en option)
    * Page HTML relié avec le CDN tensorflow-cocossd
    * Bouton permettant d'upload une image et l'afficher sur la page HTML
    * stocker le pointeur de l'image dans une variable
2. Analyser son contenu grâce à un modèle pré-entraîné TensorFlow.js

3. Générer un inventaire lisible (ex:"2 bouteilles, 1 ordinateur portable")
4. Produire une description vocale via le Web Speech API
5. Enrichir les objects détetés grâce à un fichier JSON sémantique
6. (Bonus) Stocker les réusltats pour une future analyse.