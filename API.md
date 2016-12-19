Get sito.html
-----
Restituisce il file sito.html dove effettuare l'accesso su Facebook via OAuth.

* **URL**

`/`

* **METHOD**

`GET`

* **SUCCESS RESPONSE**

	* **Code**: 200 </br>
		**Content**: sito.html file

Get token
-----
Combinato con il code dell'OAuth di Facebook restituisce la pagina dove selezionare l'immagine da postare.

* **URL**

`/token`

* **METHOD**

`GET`

* **URL PARAMS**

	**Required**: </br>
		`code=[String]`

* **SUCCCESS RESPONSE**

	* **Code**: 200 </br>
		**Content**: Pagina dove selezionare il carlino da postare.
		
Get api
-----
Combinato con l'access token di Facebook e il paramentro `Message` contenente l'URL dell'immagine da postare esegue il post su Facebook e inoltra tramite RabbitMQ il messaggio ad un altro server.

* **URL**

`/api`

* **METHOD**

`GET`

* **URL PARAMS**

	**Required**:</br>
	  `access_token=[String]`</br>
		`message=[URL_String]`

* **SUCCESS RESPONSE**

	* **Code**: 200 </br>
	  **Content**: Messaggio di riuscito successo.

* **ERROR RESPONSE**

	* **Code**: 404 </br>
		**Content**: Il fallimento non è contemplato.
