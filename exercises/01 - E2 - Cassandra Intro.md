# Cassandra

## Killrvideo

### Exercise 1

- Creare e usare il keyspace `killrvideo`


      CREATE KEYSPACE killrvideo WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor' : 1 };

      USE killrvideo;

- Creare una tabella `videos` per  memorizzare i video  con le colonne indicate

      CREATE TABLE videos( 
        video_id TIMEUUID, 
        added_date TIMESTAMP,
        description TEXT, 
        title TEXT, 
        user_id uuid,
        PRIMARY KEY (video_id) 
      );

- Caricare dati nella tabella. Fare riferimento al file `/root/labwork/exercise-2/videos.csv`

      COPY videos
      FROM '/root/labwork/exercise-2/videos.csv' 
      WITH HEADER=true;

- Visualizzare i dati con una SELECT

      SELECT * FROM videos; 

- Contare i video

      SELECT COUNT(*) FROM videos; 

- Selezionare 10 video

      SELECT * FROM videos LIMIT 10;

### Exercise 2

- Creare una nuova tabella `videos_by_title_year` per  memorizzare video con una  chiave composta. E' buona pratica dare alle tabelle un nome  che rispecchi il modo di interrogarle

      CREATE TABLE videos_by_title_year(  
        title TEXT, 
        added_year int,
        added_date TIMESTAMP,
        description TEXT,
        user_id uuid,
        video_id TIMEUUID,
        PRIMARY KEY ((title, added_year)) 
      );

- Caricare dati nella tabella. Fare riferimento al file `/root/labwork/exercise-3/videos_by_title_year.csv`

      COPY videos_by_title_year
      FROM '/root/labwork/exercise-3/videos_by_title_year.csv' 
      WITH HEADER=true;

- Cercare un video per nome e anno

      SELECT * 
      FROM videos_by_title_year 
      WHERE title = 'Sleepy Grumpy Cat'
      AND added_year = 2015; 


- Cercare video solo per nome o solo per anno

    SELECT * 
    FROM videos_by_title_year 
    WHERE added_year = 2015; 


### Exercise 3

- Creare una nuova tabella `videos_by_tag_year` per  memorizzare video con una  chiave composta diversa
  - Obiettivo: interrogare la tabella sulla base dei campi tag e year e fare range queries su year
  - ATTENZIONE: un video può essere associate a tanti tag

        CREATE TABLE videos_by_tag_year(  
          tag TEXT, 
          added_year int,
          added_date TIMESTAMP,
          title TEXT, 
          description TEXT,
          user_id uuid,
          video_id TIMEUUID,
          PRIMARY KEY ((tag), added_year, video_id) 
        ) WITH CLUSTERING ORDER BY (added_year DESC);

- Caricare dati nella tabella. Fare riferimento al file `/root/labwork/exercise-4/videos_by_tag_year.csv`

      COPY videos_by_tag_year
      FROM '/root/labwork/exercise-4/videos_by_tag_year.csv' 
      WITH HEADER=true;

- Selezionare i video con tag `trailer` e anno `2015`

      SELECT *
      FROM videos_by_tag_year
      WHERE tag= 'trailer' AND added_year = 2015; 

- Selezionare i video con tag `cql` prima del `2015`

      SELECT *
      FROM videos_by_tag_year
      WHERE tag='cql' AND added_year < 2015; 

- Selezionare i video prima del `2015`

      SELECT * FROM videos_by_tag_year
      WHERE added_year < 2015
      ALLOW FILTERING;

- Selezionare i video con tag `cql` 

      SELECT *
      FROM videos_by_tag_year
      WHERE tag='cql'; 


### Exercise 4

- Troncare la tabella `videos`

      TRUNCATE videos;
      SELECT * FROM VIDEOS;

- Estendere la tabella originale `videos` con una colonna `tags` come collezione di stringhe

      ALTER TABLE videos ADD tags SET<TEXT>;

- Ripopolare `videos` caricando i dati che comprendono i tag. Fare riferimento al file `/root/labwork/exercise-5/videos_encoding.csv`

    COPY videos FROM '/root/labwork/exercise-5/videos.csv' WITH HEADER=true;

- Estendere `videos` con una colonna una colonna `video_encoding` di tipo UDT e così composta

  | Field name | Data type |
  | ---------- | --------- | 
  | bit_rates  | set\<text\> |
  | encoding   | text      |
  | height     | int       |
  | width      | int       |

      CREATE TYPE video_encoding ( 
        bit_rates SET<TEXT>, 
        encoding text, 
        height int, 
        width int
      ); 

      ALTER TABLE videos ADD encoding FROZEN<video_encoding>;

- Utilizzare sempre il commando copy per popolare solamente i valori della nuova colonna

      COPY videos (video_id, encoding)
      FROM '/root/labwork/exercise-5/videos_encoding.csv' 
      WITH HEADER=true;

- Selezionare 10 video

      SELECT * FROM videos LIMIT 10;


### Exercise 5

- Verificare le colonne presenti nel file .cql

- Creare una tabella `videos_count_by_tag` con un contatore che conteggi il numero di video a cui è assegnato un determinato tag

      CREATE TABLE videos_count_by_tag(  
        tag TEXT, 
        added_year int,
        video_count COUNTER,
        PRIMARY KEY ((tag), added_year) 
      );

- Eseguire lo script `/root/labwork/exercise-6/videos_count_by_tag.cql`

      SOURCE '/root/labwork/exercise-6/videos_count_by_tag.cql';

- Selezionare 5 video

      SELECT * 
      FROM videos_count_by_tag 
      LIMIT 5;

- Selezionare il tag `You Are Awesome`

      SELECT *
      FROM videos_count_by_tag
      WHERE tag = 'You Are Awesome';

- Aumentare di 10 il `video_count` per il tag `You Are Awesome` e anno `2015`

      UPDATE videos_count_by_tag 
      SET video_count = video_count + 10
      WHERE tag = 'You Are Awesome' AND added_year = 2015;

- Selezionare il tag `You Are Awesome`

      SELECT *
      FROM videos_count_by_tag
      WHERE tag = 'You Are Awesome';


### Exercise 6

- Modullare la relazione tra video e attori, considerate due query
  - Q1: restituire i video in cui compareun dato attore (a partire dal più recente)
  - Q2: restituire i video di un datogenere (a partire dal più recente)
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

        CREATE TABLE videos_by_actor ( 
          actor text, 
          added_date timestamp,
          video_id timeuuid,  
          character_name text,
          description text,
          encoding frozen<video_encoding>,
          tags set<text>, 
          title text, 
          user_id uuid,
          PRIMARY KEY ((actor), added_date, video_id, character_name) 
        ) WITH CLUSTERING ORDER BY (added_date DESC, video_id ASC, character_name ASC);

        COPY videos_by_actor 
        FROM '/root/labwork/exercise-7/videos_by_actor.csv' 
        WITH HEADER=true;

        SELECT * 
        FROM videos_by_actor 
        WHERE actor = 'Tom Hanks';

        SELECT actor, added_date
        FROM videos_by_actor 
        WHERE actor = 'Tom Hanks';

        CREATE TABLE videos_by_genre ( 
          genre text, 
          added_date timestamp,
          video_id timeuuid, 
          description text,
          encoding frozen<video_encoding>,
          tags set<text>, 
          title text, 
          user_id uuid,
          PRIMARY KEY ((genre), added_date, video_id) 
        ) WITH CLUSTERING ORDER BY (added_date DESC, video_id ASC);

        COPY videos_by_genre 
        FROM '/root/labwork/exercise-7/videos_by_genre.csv' 
        WITH HEADER=true;

        SELECT * 
        FROM videos_by_genre 
        WHERE genre = 'Time travel';

### Final exercise

- Aprire lo script `/root/labwork/exercise-16/killrvideo.cql`. Nelle prime 4 tabelle, inserire il tipo di dato corretto al posto di "CQL TYPE"

- Eseguire lo script

      SOURCE '/root/labwork/exercise-16/killrvideo.cql';

- Popolare le tabelle

      USE killr_video;
      COPY videos FROM '/root/labwork/exercise-16/videos.csv' WITH HEADER=true;
      COPY latest_videos FROM '/root/labwork/exercise-16/latest_videos.csv' WITH HEADER=true;
      COPY trailers_by_video FROM '/root/labwork/exercise-16/trailers_by_video.csv' WITH HEADER=true;
      COPY actors_by_video FROM '/root/labwork/exercise-16/actors_by_video.csv' WITH HEADER=true;

- Query: visualizzare i 50 video più recenti dalla tabella latest_videos. Cercare l'ID del film `Gone Girl` ("L'amore bugiardo")

      SELECT * FROM latest_videos LIMIT 50;

- Query: visualizzare i dati del film dalla tabella `videos`. Quando è stato rilasciato il film? A quali generi appartiene?

      SELECT *
      FROM videos 
      WHERE video_id = 8a657435-0ef2-11e5-91b1-8438355b7e3a;

- Query: visualizzare gli attori coinvolti nel film e i personaggi da loro interpretati dalla tabella `actors_by_video`. Quale attore ha interpretato il personaggio `Desi Collings`?

      SELECT *
      FROM actors_by_video 
      WHERE video_id = 8a657435-0ef2-11e5-91b1-8438355b7e3a;

- Query: cercare il trailer del film dalla tabella `trailers_by_video`. Il trailer_id è un ID che riconduce alla tabella `videos`

      SELECT *
      FROM trailers_by_video 
      WHERE video_id = 8a657435-0ef2-11e5-91b1-8438355b7e3a;

- Query: visualizzare i dati del trailer dalla tabella `videos`

      SELECT *
      FROM videos
      WHERE video_id = 8a65751c-0ef2-11e5-9cac-8438355b7e3a;
