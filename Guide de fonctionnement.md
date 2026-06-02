.md
			GUIDE DE FONCTIONNEMENT DETEC'AID 


<strong>Architecture du projet</strong>

User Interface | 
               |--> Infrastructure --> DATA Acess -->
               |

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



<strong>Pistes d’amélioration techniques</strong>