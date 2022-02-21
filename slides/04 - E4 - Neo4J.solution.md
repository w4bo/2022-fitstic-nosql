# Neo4j - Soluzioni

Manuale Cypher https://neo4j.com/docs/cypher-manual/current/ 

## Movie graph

### Pattern semplici

1. Restituire tutti i nodi e le relazioni nel database

    ```
    MATCH (n) RETURN n
    ```

2. Contare i nodi e gli archi presenti

    ```
    MATCH (n) WITH COUNT(n) AS numVertices
    MATCH (a)-[e]->(b)
    RETURN numVertices, COUNT(e) AS numEdges
    ```

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

Il codice crea:
- L'istanza del film (proprietà: title, released)
- 3 attori principali (proprietà: name, born) 
- Le rispettive relazioni ACTED_IN (proprietà: role)

4. Restituire il film The Departed e tutti i nodi ad esso collegati

    ```
    MATCH (n:Movie {title:'The Departed'})<--(m) RETURN n, m
    ```

5. Restituire tutte le 134 persone collegate ad un film

    ```
    MATCH (n:Person)-->(:Movie) RETURN n
    ```

6. Restituire i 104 attori, ossia persone che hanno recitato (ACTED_IN) in un film

    ```
    MATCH (n:Person)-[:ACTED_IN]->(:Movie) RETURN n
    ```

7. Restituire i 5 attori che sono anche direttori, ossia hanno diretto (DIRECTED) un film (:Movie)

    ```
    MATCH (n:Person)-[:ACTED_IN]->(:Movie),(n:Person)-[:DIRECTED]->(:Movie) RETURN n


    MATCH (n:Person)-[:ACTED_IN]->(:Movie)
    MATCH (n:Person)-[:DIRECTED]->(:Movie)
    RETURN n
    ```

8. Restituire i 3 attori che hanno anche diretto un film in cui hanno recitato (ACTED_IN); restituire anche il relativo film

    ```
    MATCH (n:Person)-[:ACTED_IN]->(m:Movie),(n:Person)-[:DIRECTED]->(m:Movie) RETURN n, m
    ```

9. Restituire i 3 revisori, ossia le persone che hanno recensito (REVIEWED) un film

    ```
    MATCH (n:Person)-[:REVIEWED]->(:Movie) RETURN n

    MATCH (n:Person)-[:REVIEWED]->(m:Movie) RETURN n, m
    ```

10. Restituire i 2 film che sono stati recensiti da recensori diversi; restituire anche questi ultimi

    ```
    MATCH (p:Person)-[:REVIEWED]->(m:Movie)<-[:REVIEWED]-(p2:Person) RETURN p, p2, m
    ```

11. Restituire il film rilasciato (released) dopo il 2010 

    ```
    MATCH (m:Movie) WHERE m.released > 2010 RETURN m
    ```

12. Restituire gli attori che hanno recitato nel film rilasciato dopo il 2010; restituire anche il film

    ```
    MATCH (p:Person)-[:ACTED_IN]->(m:Movie) WHERE m.released > 2010 RETURN m, p
    ```

13. Restituire tutte le coppie di attori che hanno recitato nello stesso film rilasciato dopo il 2010; restituire anche il film. Come cambia il risultato di questa query da quello della query precedente?

    ```
    MATCH (p:Person)-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(p2:Person) WHERE m.released > 2010 RETURN m, p, p2
    ```

14. Restituire tutte le coppie di attori che hanno recitato insieme in più di un film

    ```
    MATCH (p:Person)-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(p2:Person)-[:ACTED_IN]->(m2:Movie)<-[:ACTED_IN]-(p) RETURN p, p2, m, m2
    ```

15. Restituire, per ogni revisore, tutti i revisori seguiti direttamente o indirettamente attraverso un altro revisore

    ```
    MATCH (p:Person)-[:FOLLOWS*1..2]->(p2:Person) RETURN p, p2

    MATCH (m:Movie)<-[:REVIEWED]-(r1)-[:FOLLOWS*1..2]->(r2)-[:REVIEWED]->(:Movie) RETURN m, r1, r2

    NO: MATCH (p:Person)-[:FOLLOWS]->(p1:Person)-[:FOLLOWS]->(p2:Person) RETURN p, p2
    ```

16. Restituire i 12 nodi raggiungibili con un massimo di 3 salti (in qualunque direzione) a partire da Clint Eastwood

    ```
    MATCH (p:Person {name: 'Clint Eastwood'})-[*..3]-(m) RETURN p, m
    ```

### Aggregazioni

17. Restituire l'età degli attori che hanno recitato nel film Apollo 13 (fare la differenza tra la release date del film e l'anno di nascita dell'attore)

    ```
    MATCH (m:Movie {title: 'Apollo 13'})<-[:ACTED_IN]-(p:Person) RETURN m, p, m.released - p.born
    ```

18. Calcolare l'età media degli attori che hanno recitato nel film Apollo 13

    ```
    MATCH (m:Movie {title: 'Apollo 13'})<-[:ACTED_IN]-(p:Person) RETURN m, AVG(m.released - p.born)
    ```

19. Calcolare l'età media degli attori per ogni film

    ```
    MATCH (m:Movie)<-[:ACTED_IN]-(p:Person) RETURN m, AVG(m.released - p.born)
    ```

20. Restituire la top-10 dei film con l'età media più bassa (usare le clausole order by e limit)

    ```
    MATCH (m:Movie)<-[:ACTED_IN]-(p:Person) RETURN m, AVG(m.released-p.born) as av ORDER BY av DESC LIMIT 10
    ```

## Northwind

- See: https://neo4j.com/developer/example-data/#demo-server
- Access Northwind: https://demo.neo4jlabs.com:7473/browser/?dbms=neo4j://northwind@demo.neo4jlabs.com&db=northwind

21. Restituire, per ogni prodotto (:Product), il numero di ordini ricevuti 

    ```
    MATCH (p:Product)<--(o:Order) RETURN p, COUNT(o)
    ```

22. Restituire, per il cliente (:Customer) con contactName Francisco Chang, i prodotti ordinati da altri clienti che hanno acquistato un prodotto acquistato in comune

    ```
    MATCH (c1:Customer {contactName: 'Francisco Chang'})-->(:Order)-->(p1:Product)<--(:Order)<--(c2:Customer)-->(:Order)-->(p2:Product) WHERE c1<>c2 and p1<>p2 RETURN DISTINCT p2
    ```

23. Restituire, per il prodotto con productName Mascarpone Fabioli, i 3 prodotti più ordinati insieme ad esso

    ```
    MATCH (p:Product {productName: 'Mascarpone Fabioli'})--(:Order)--(p2:Product) WHERE p<>p2 RETURN p2, COUNT (*) AS c ORDER BY c DESC LIMIT 3
    ```

24. Restituire le 4 coppie di prodotti più ordinati insieme in assoluto

    ```
    MATCH (p:Product)--(:Order)--(p2:Product) WHERE p<>p2 RETURN p, p2, COUNT(*) AS c ORDER BY c DESC LIMIT 4
    ```
