# Cassandra modellazione

## Esercizio 1

Data questa tabella

    create table movies_by_review (
        movie_id int,
        movie_name text,
        website_name text,
        stars int,
        primary key ((website_name), stars, movie_id)
    )
    with clustering
    order by (stars desc, movie_id asc);

Quali query posso eseguire su di essa?

1. `select * from movies_by_review where stars > 3;`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes';`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes' and stars > 3;`
1. `select * from movies_by_review where movie_name = 'Eternals';`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes' and stars > 3 and movie_id = 1;`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes' and stars = 3 and movie_id = 1;`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes' and stars = 3 and movie_id > 1;`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes' and stars > 3 and movie_id = 1 and movie_name = 'Eternals';`
1. `select * from movies_by_review where movie_name > 'Eternals';`
1. `select * from movies_by_review where website_name = 'Rotten Tomatoes' and stars = 3;`

## Esercizio 2

Data questa query

    select * from ? where year = 2010 and actor = 'Tom Hanks';

Su quali delle seguenti tabelle la posso eseguire?

1.
        create table movies1 (
            movie_id uuid,
            year int, 
            actor text,
            primary key (movie_id) 
        );

        select * from movies1 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies2 (
            movie_id uuid,
            year int, 
            actor text,
            primary key (movie_id, year, actor) 
        );

        select * from movies2 where year = 2010 and actor = 'Tom Hanks';


1.
        create table movies3 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((movie_id), year, actor) 
        );

        select * from movies3 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies4 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((movie_id, year, actor))
        );

        select * from movies4 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies5 (
            movie_id uuid,
            year int, 
            actor text,
            primary key (year)
        );

        select * from movies5 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies6 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((year, actor))
        );

        select * from movies6 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies7 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((year), actor)
        );

        select * from movies7 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies8 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((year), actor, movie_id)
        );

        select * from movies8 where year = 2010 and actor = 'Tom Hanks';


1.
        create table movies9 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((year, actor), movie_id)
        );

        select * from movies9 where year = 2010 and actor = 'Tom Hanks';

1.
        create table movies10 (
            movie_id uuid,
            year int, 
            actor text,
            primary key ((year, actor, movie_id))
        );

        select * from movies10 where year = 2010 and actor = 'Tom Hanks';