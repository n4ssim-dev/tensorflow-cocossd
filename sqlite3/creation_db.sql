CREATE TABLE results (
    result_id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_time DATETIME NOT NULL,
    image VARCHAR(250),
    inventaire_id VARCHAR(250)
);

CREATE TABLE objets (
    objet_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_objet VARCHAR(250),
    qte_objet INTEGER
);

CREATE TABLE objet_contenu (
    objet_contenu_id INTEGER PRIMARY KEY AUTOINCREMENT,
    result_id INTEGER,
    objet_id INTEGER,
    FOREIGN KEY (result_id) REFERENCES results(result_id),
    FOREIGN KEY (objet_id) REFERENCES objets(objet_id)
);
