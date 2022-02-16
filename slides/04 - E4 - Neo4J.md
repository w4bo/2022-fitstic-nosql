# Neo4j - Esercitazione

Manuale Cypher https://neo4j.com/docs/cypher-manual/current/ 

## Movie graph

### Pattern semplici

1. Restituire tutti i nodi e le relazioni nel database
    
2. Contare i nodi e gli archi presenti
    

3. Dato il film The Departed (https://www.imdb.com/title/tt0407887/?ref_=fn_al_tt_1) inserire i seguenti nodi ed i seguenti archi (ATTENZIONE: eseguire il codice in un unico blocco! Altrimenti, le istruzioni per creare gli archi devono essere precedute da un MATCH per recuperare i rispettivi nodi coinvolti). Cosa fa il seguente codice?

    ```
    CREATE (departed:Movie {title:'The Departed', released:2006, tagline:'Il bene e il male'})
    CREATE (leo:Person {name:'Leonardo Di Caprio', born: 1974})
    CREATE (matt:Person {name:'Matt Damon', born: 1970})
    CREATE (leo)-[:ACTED_IN {roles: ['Billy']}]->(departed)
    CREATE (matt)-[:ACTED_IN {roles: ['Colin Sullivan']}]->(departed);

    MATCH (jack:Person {name: 'Jack Nicholson'})
    MATCH (departed:Movie {title:'The Departed'})
    CREATE (jack)-[:ACTED_IN {roles: ['Frank Costello']}]->(departed)
    ```
4. Restituire il film The Departed e tutti i nodi ad esso collegati
5. Restituire tutte le 134 persone collegate ad un film

6. Restituire i 104 attori, ossia persone che hanno recitato (ACTED_IN) in un film


7. Restituire i 5 attori che sono anche direttori, ossia hanno diretto (DIRECTED) un film (:Movie)

8. Restituire i 3 attori che hanno anche diretto un film in cui hanno recitato (ACTED_IN); restituire anche il relativo film

9. Restituire i 3 revisori, ossia le persone che hanno recensito (REVIEWED) un film

10. Restituire i 2 film che sono stati recensiti da recensori diversi; restituire anche questi ultimi

11. Restituire il film rilasciato (released) dopo il 2010

12. Restituire gli attori che hanno recitato nel film rilasciato dopo il 2010; restituire anche il film

13. Restituire tutte le coppie di attori che hanno recitato nello stesso film rilasciato dopo il 2010; restituire anche il film. Come cambia il risultato di questa query da quello della query precedente?

14. Restituire tutte le coppie di attori che hanno recitato insieme in più di un film

15. Restituire, per ogni revisore, tutti i revisori seguiti direttamente o indirettamente attraverso un altro revisore

16. Restituire i 12 nodi raggiungibili con un massimo di 3 salti (in qualunque direzione) a partire da Clint Eastwood

### Aggregazioni

17. Restituire l'età degli attori che hanno recitato nel film Apollo 13 (fare la differenza tra la release date del film e l'anno di nascita dell'attore)

18. Calcolare l'età media degli attori che hanno recitato nel film Apollo 13

19. Calcolare l'età media degli attori per ogni film

20. Restituire la top-10 dei film con l'età media più bassa (usare le clausole order by e limit)

## Northwind

See: https://neo4j.com/developer/example-data/#demo-server
Access Northwind: https://demo.neo4jlabs.com:7473/browser/?dbms=neo4j://northwind@demo.neo4jlabs.com&db=northwind

21. Restituire, per ogni prodotto (:Product), il numero di ordini ricevuti 
22. Restituire, per il cliente (:Customer) con contactName Francisco Chang, i prodotti ordinati da altri clienti che hanno acquistato un prodotto acquistato in comune
23. Restituire, per il prodotto con productName Mascarpone Fabioli, i 3 prodotti più ordinati insieme ad esso
24. Restituire le 4 coppie di prodotti più ordinati insieme in assoluto
