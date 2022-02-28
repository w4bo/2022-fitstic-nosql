# MongoDB  - Esercitazione (Find)

## Restaurants
1. Visualizzare tutti i ristoranti. 

    ```
    db.restaurants.find()
    ```

2. Visualizzare quartiere (borough) e tipo di cucina (cuisine) di tutti i ristoranti. 

    ```
    db.restaurants.find({}, {borough: 1, cuisine: 1})
    ```

3. Visualizzare quartiere (borough) e tipo di cucina (cuisine) di tutti i ristoranti, ma senza _id. 

    ```
    db.restaurants.find({}, {borough: 1, cuisine: 1, _id: 0})
    ```

4. Visualizzare quartiere (borough), tipo di cucina (cuisine) e via (address.street) di tutti i ristoranti. 

    ```
    db.restaurants.find({}, {borough: 1, "cuisine": 1, "address.street": 1})
    ```

5. Visualizzare iI ristorante il cui zipcode è 11225

    ```
    db.restaurants.find({"address.zipcode": "11225"})
    ```

6. Visualizzare i ristoranti il cui tipo di cucina è Hamburgers 

    ```
    db.restaurants.find({cuisine: "Hamburgers"})
    ```

7. Visualizzare i ristoranti il cui tipo di cucina NON è Hamburgers 

    ```
    db.restaurants.find({cuisine: {$ne: "Hamburgers"} })
    db.restaurants.find({cuisine: {$not: { $in: ["Hamburgers"] } } })
    ```

8. Visualizzare i ristoranti il cui tipo di cucina è tra Hamburgers, Bakery o Irish 

    ```
    db.restaurants.find({cuisine: {$in: ["Hamburgers", "Bakery", "Irish"]})
    db.restaurants.find({$or: [{cuisine: "Hamburgers"}, {cuisine: "Bakery"}]})
    ```

9. Visualizzare i ristoranti il cui tipo di cucina NON è tra Hamburgers, Bakery o Irish 

    ```
    db.restaurants.find({cuisine: {$nin: ["Hamburgers", "Bakery", "Irish"]} }
    db.restaurants.find({cuisine: {$not: {$in: ["Hamburgers", "Bakery", "Irish"]}} })
    ```

10. Visualizzare i ristoranti il cui tipo di cucina non esiste 

    ```
    db.restaurants.find({cuisine:  {$exists: false} })
    ```

## Yelp business
11. Visualizzare tutti i business che hanno ricevuto almeno 10 recensioni (review_count) E si trovano in Arizona o in Nevada (state = NV o AZ) 

    ```
    db.yelpbusiness.find({review_count: {$gte: 10 }, state: {$in: ["NV","AZ"]} })
    -> 37113 risultati
    ```

12. Visualizzare tutti i business che hanno ricevuto almeno 10 recensioni (review_count) O si trovano in Arizona o in Nevada (state = NV o AZ) 

    ```
    db.yelpbusiness.find({$or: [{review_count: {$gte: 10 } }, {state: {$in: ["NV","AZ"]} }]})
    -> 79898 risultati
    ```

13. Visualizzare tutti i business che hanno Grocery tra le categorie 

    ```
    db.yelpbusiness.find({categories: "Grocery"})
    db.yelpbusiness.find({categories: {$in: ["Grocery"]} })
    -> 2850 risultati
    ```

14. Visualizzare tutti i business che hanno Grocery E Barbeque tra le categorie 

    ```
    db.yelpbusiness.find({categories: {$all: ["Grocery", "Barbeque"]} })
    -> 4 risultati
    ```

15. Visualizzare tutti i business che hanno Grocery o Barbeque tra le categorie 

    ```
    db.yelpbusiness.find({categories: {$in: ["Grocery", "Barbeque"]} })
    -> 4125 risultati
    ```

16. Visualizzare tutti i business che hanno SOLAMENTE Grocery E Barbeque tra le categorie 

    ```
    db.yelpbusiness.find({categories: ["Grocery", "Barbeque"]})
    db.yelpbusiness.find({categories: {$all: ["Grocery", "Barbeque"], $size: 2} })
    -> 0 risultati
    ```

17. Visualizzare tutti i business che hanno 5 categorie 

    ```
    db.yelpbusiness.find({categories: {$size: 5 } })
    -> 17227 risultati
    ```

18. Visualizzare tutti i business che hanno 5 categorie e la quinta categoria è Food 

    ```
    db.yelpbusiness.find({$and: [{categories: {$size: 5 } }, {"categories.4": "Food"} ] })
    db.yelpbusiness.find({categories: {$size: 5 }, "categories.4": "Food"} )
    -> 604 risultati
    ```

19. Visualizzare le prime due categorie di ogni business 

    ```
    db.yelpbusiness.find({}, {categories: {$slice: 2} })
    -> 144072 risultati (tutti: si tratta solo di modificare la proiezione)
    ```

20. Visualizzare unicamente le categorie dei business del Nevada 

    ```
    db.yelpbusiness.find({state: "NV"}, {"categories": 1, "state": 1})
    -> 28214 risultati
    ```

21. Visualizzare i valori distinti del campo city

    ```
    db.yelpbusiness.distinct("city")
    -> 1 array con 878 valori distinti
    ```

22. Visualizzare i valori distinti del campo city nello stato del Nevada

    ```
    db.yelpbusiness.distinct("city", {state: "NV"})
    -> 1 array con 41 valori distinti
    ```

23. Visualizzare i valori distinti dell'array categories

    ```
    db.yelpbusiness.distinct("categories")
    -> 1 array con 1192 valori distinti
    ```

## Games

24. Visualizzare le partite disputate nel 2010.

    ```
    db.games.find({date: {$gte: new Date("2010-01-01"), $lte: new Date("2010-12-31")} })
    db.games.find({$where: function(){ return this.date.getFullYear() == 2010 } })
    ```

25. Visualizzare le partite in cui una delle squadre ha totalizzato almeno 160 punti

    ```
    db.games.find({teams: {$elemMatch: {score: {$gte: 160} } } })
    db.games.find({"teams.score": {$gte: 160} })
    ```
26. Visualizzare le partite in cui la squadra di casa ha perso

    ```
    db.games.find({teams: {$elemMatch: {won: 0, home: true} } })
    NO: db.games.find({teams: {won: 0, home: true} }) match esatto
    NO: db.games.find({"teams.won": 0, "teams.home": true}) condizioni in OR
    ```

27. Visualizzare le partite in cui ha giocato Michael Jordan

    ```
    db.games.find({box: {$elemMatch: {players: {$elemMatch: {player: "Michael Jordan"} } } } })
    db.games.find({box: {$elemMatch: {"players.player": "Michael Jordan"} } })
    db.games.find({"box.players.player": "Michael Jordan"} )
    ```

28. Visualizzare le partite in cui Michael Jordan ha segnato più di 60 punti 

    ```
    db.games.find({box: {$elemMatch: {players: {$elemMatch: {player: "Michael Jordan", pts: {$gt: 60} } } } } })
    db.games.find({"box.players": {$elemMatch: {player: "Michael Jordan", pts: {$gt: 60} } } })
    ```
29. Visualizzare le prime 10 partite memorizzate nella collection

    ```
    db.games.find().limit(10)
    ```
30. Visualizzare le prime 10 partite in ordine di data
    ```
    db.games.find().sort({date: 1}).limit(10)
    ```
31. Visualizzare le prime 10 partite del 2010 in ordine di data

    ```
    db.games.find({date: {$gte: new Date("2010-01-01"), $lt: new Date("2011-01-01")} })
    .sort({date: 1}).limit(10)
    ```
32. Visualizzare le seconde 10 partite (dalla 11°) del 2010 in ordine di data

    ```
    db.games.find({date: {$gte: new Date("2010-01-01"), $lte: new Date("2010-12-31")} })
    .sort({date: 1}).skip(10).limit(10)
    ```

## Esercizi aggiuntivi
33. [Restaurants] Visualizzare i ristoranti che hanno ricevuto almeno un punteggio (grades.score) maggiore di 10

    ```
    db.restaurants.find({"grades.score": {"$gt": 10} })
    ```

34. [Restaurants] Visualizzare i ristoranti che hanno ricevuto almeno un punteggio (grades.score) maggiore di 10 nel 2014

    ```
    db.restaurants.find({"grades": {"$elemMatch": {"score": {"$gt": 10}, "date":{"$gte": new Date("2014-01-01"), "$lt": new Date("2015-01-01")} }}})
    ```

35. [Yelpbusiness] Contare i business di categoria Yoga che hanno ricevuto almeno 4 di punteggio (stars) e che sono aperti (is_open=1)

    ```
    db.yelpbusiness.find({ "categories": "Yoga", "stars": { "$gte": 4 }, "is_open": 1 })
    ```
36. [Games] Visualizzare le partite in cui la squadra di casa ha perso pur totalizzando più di 120 punti

    ```
    db.games.find({"teams": {"$elemMatch": {"home": true,"won": 0, score : {"$gte": 120}}}})
    ```
37. [Games] Visualizzare l'elenco distinto di date in cui una delle squadre ha totalizzato almeno 160 punti

    ```
    db.games.distinct( "date", { "teams": { "$elemMatch": { "score": {"$gte": 160}}}})
    ```

38. [Games] Visualizzare le partite in cui una delle due squadre ha sbagliato tutti i tiri liberi (box.team.ft=0) pur avendone provati almeno 2 (box.team.fta>=2)

    ```
    db.games.find({ "box": {"$elemMatch": { "team.ft": 0, "team.fta": {"$gte": 2}}}})
    ```