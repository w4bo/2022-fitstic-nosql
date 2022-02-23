# MongoDB  - Esercitazione (Find)

## Restaurants
1.	Visualizzare tutti i ristoranti. 


2.	Visualizzare quartiere (borough) e tipo di cucina (cuisine) di tutti i ristoranti. 


3.	Visualizzare quartiere (borough) e tipo di cucina (cuisine) di tutti i ristoranti, ma senza _id. 


4.	Visualizzare quartiere (borough), tipo di cucina (cuisine) e via (address.street) di tutti i ristoranti. 

5.	Visualizzare iI ristorante il cui zipcode è 11225


6.	Visualizzare i ristoranti il cui tipo di cucina è Hamburgers 


7.	Visualizzare i ristoranti il cui tipo di cucina NON è Hamburgers 


8.	Visualizzare i ristoranti il cui tipo di cucina è tra Hamburgers, Bakery o Irish 


9.	Visualizzare i ristoranti il cui tipo di cucina NON è tra Hamburgers, Bakery o Irish 


10.	Visualizzare i ristoranti il cui tipo di cucina non esiste 


## Yelp business
11.	Visualizzare tutti i business che hanno ricevuto almeno 10 recensioni (review_count) E si trovano in Arizona o in Nevada (state = NV o AZ) 

12.	Visualizzare tutti i business che hanno ricevuto almeno 10 recensioni (review_count) O si trovano in Arizona o in Nevada (state = NV o AZ) 

13.	Visualizzare tutti i business che hanno Grocery tra le categorie 

14.	Visualizzare tutti i business che hanno Grocery E Barbeque tra le categorie 

15.	Visualizzare tutti i business che hanno Grocery O Barbeque tra le categorie 

16.	Visualizzare tutti i business che hanno SOLAMENTE Grocery E Barbeque tra le categorie 

17.	Visualizzare tutti i business che hanno 5 categorie 

18.	Visualizzare tutti i business che hanno 5 categorie e la quinta categoria è Food 

19.	Visualizzare le prime due categorie di ogni business 

20.	Visualizzare unicamente le categorie dei business del Nevada 

21.	Visualizzare i valori distinti del campo city

22.	Visualizzare i valori distinti del campo city nello stato del Nevada

23.	Visualizzare i valori distinti dell’array categories

## Games

24.	Visualizzare le partite disputate nel 2010. 

25.	Visualizzare le partite in cui una delle squadre ha totalizzato almeno 160 punti

26.	Visualizzare le partite in cui la squadra di casa ha perso

27.	Visualizzare le partite in cui ha giocato Michael Jordan

28.	Visualizzare le partite in cui Michael Jordan ha segnato più di 60 punti 

29.	Visualizzare le prime 10 partite memorizzate nella collection

30.	Visualizzare le prime 10 partite in ordine di data

31.	Visualizzare le prime 10 partite del 2010 in ordine di data

32.	Visualizzare le seconde 10 partite (dalla 11°) del 2010 in ordine di data


## Esercizi aggiuntivi
33.	[Restaurants] Visualizzare i ristoranti che hanno ricevuto almeno un punteggio (grades.score) maggiore di 10

34.	[Restaurants] Visualizzare i ristoranti che hanno ricevuto almeno un punteggio (grades.score) maggiore di 10 nel 2014

35.	[Yelpbusiness] Contare i business di categoria Yoga che hanno ricevuto almeno 4 di punteggio (stars) e che sono aperti (is_open=1)

36.	[Games] Visualizzare le partite in cui la squadra di casa ha perso pur totalizzando più di 120 punti

37.	[Games] Visualizzare l’elenco distinto di date in cui una delle squadre ha totalizzato almeno 160 punti

38.	[Games] Visualizzare le partite in cui una delle due squadre ha sbagliato tutti i tiri liberi (box.team.ft=0) pur avendone provati almeno 2 (box.team.fta>=2)