# Cassandra

## Killrvideo

### Exercise 1

- Creare e usare il keyspace `killrvideo`

- Creare una tabella `videos` per  memorizzare i video  con le colonne indicate

- Caricare dati nella tabella. Fare riferimento al file `/root/labwork/exercise-2/videos.csv`

- Visualizzare i dati con una SELECT

- Contare i video

- Selezionare 10 video

### Exercise 2

- Creare una nuova tabella `videos_by_title_year` per memorizzare video con una  chiave composta. E' buona pratica dare alle tabelle un nome  che rispecchi il modo di interrogarle

- Caricare dati nella tabella. Fare riferimento al file `/root/labwork/exercise-3/videos_by_title_year.csv`

- Cercare un video per nome e anno

- Cercare video solo per nome o solo per anno

### Exercise 3

- Creare una nuova tabella `videos_by_tag_year` per  memorizzare video con una  chiave composta diversa
  - Obiettivo: interrogare la tabella sulla base dei campi tag e year e fare range queries su year
  - ATTENZIONE: un video può essere associate a tanti tag

- Caricare dati nella tabella. Fare riferimento al file `/root/labwork/exercise-4/videos_by_tag_year.csv`

- Selezionare i video con tag `trailer` e anno `2015`

- Selezionare i video con tag `cql` prima del `2015`

- Selezionare i video prima del `2015`

- Selezionare i video con tag `cql` 

### Exercise 4

- Troncare la tabella `videos`

- Estendere la tabella originale `videos` con una colonna `tags` come collezione di stringhe

- Ripopolare `videos` caricando i dati che comprendono i tag. Fare riferimento al file `/root/labwork/exercise-5/videos_encoding.csv`

- Estendere `videos` con una colonna una colonna `video_encoding` di tipo UDT e così composta

  | Field name | Data type |
  | ---------- | --------- | 
  | bit_rates  | set\<text\> |
  | encoding   | text      |
  | height     | int       |
  | width      | int       |

- Utilizzare sempre il commando copy per popolare solamente i valori della nuova colonna

- Selezionare 10 video


### Exercise 5

- Verificare le colonne presenti nel file .cql

- Creare una tabella `videos_count_by_tag` con un contatore che conteggi il numero di video a cui è assegnato un determinato tag

- Eseguire lo script `/root/labwork/exercise-6/videos_count_by_tag.cql`

- Selezionare 5 video

- Selezionare il tag `You Are Awesome`

- Aumentare di 10 il `video_count` per il tag `You Are Awesome` e anno `2015`

- Selezionare il tag `You Are Awesome`

### Exercise 6

- Modulare la relazione tra video e attori, considerate due query
  - Q1: restituire i video in cui compare un dato attore (a partire dal più recente)
  - Q2: restituire i video di un dato genere (a partire dal più recente)
  - Video 

    | Column name | Data type |
    |-|-|
    |video_id|timeuuid|
    |added_data|timestamp|
    |description|text|
    |encoding|video_encoding|
    |tags|set\<text>|
    |title|text|
    |user_id|uuid|

  - Attori

    | Column name | Data type |
    |-|-|
    |actor|text|
    |character|text|
    |genre|text|

### Final exercise

- Aprire lo script `/root/labwork/exercise-16/killrvideo.cql`. Nelle prime 4 tabelle, inserire il tipo di dato corretto al posto di "CQL TYPE"

- Eseguire lo script

- Popolare le tabelle

- Query: visualizzare i 50 video più recenti dalla tabella latest_videos. Cercare l'ID del film `Gone Girl` ("L'amore bugiardo")

- Query: visualizzare i dati del film dalla tabella `videos`. Quando è stato rilasciato il film? A quali generi appartiene?

- Query: visualizzare gli attori coinvolti nel film e i personaggi da loro interpretati dalla tabella `actors_by_video`. Quale attore ha interpretato il personaggio `Desi Collings`?

- Query: cercare il trailer del film dalla tabella `trailers_by_video`. Il trailer_id è un ID che riconduce alla tabella `videos`

- Query: visualizzare i dati del trailer dalla tabella `videos`
