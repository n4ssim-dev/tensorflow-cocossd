import sqlite3
import json

JSON_FILE = 'results.json'
DB_FILE = 'result.db'

with open(JSON_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

con = sqlite3.connect(DB_FILE)
cur = con.cursor()

for entry in data:
    cur.execute(
        "INSERT INTO results (date_time, image) VALUES (?, ?)",
        (entry['date'], entry['image'])
    )
    result_id = cur.lastrowid

    for item in entry['inventaire']:
        cur.execute(
            "INSERT INTO objets (nom_objet, qte_objet) VALUES (?, ?)",
            (item['nom'], item['qte'])
        )
        objet_id = cur.lastrowid

        cur.execute(
            "INSERT INTO objet_contenu (result_id, objet_id) VALUES (?, ?)",
            (result_id, objet_id)
        )

con.commit()
con.close()
print(f"{len(data)} résultat(s) importé(s) dans {DB_FILE}.")
