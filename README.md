# Lotteria

Applicazione JavaScript per preparare un'estrazione di numeri vincenti e mostrarli uno alla volta. È pensata per eventi informali e non richiede una connessione a Internet.

> **Avvertenza:** questo programma è uno **strumento di estrazione** e non verifica che l'evento sia conforme alle norme applicabili. L'organizzatore è responsabile di informarsi sugli adempimenti previsti per il proprio evento e di provvedere, se richiesti, alle autorizzazioni, alle comunicazioni al Comune e agli altri obblighi applicabili. **Da usare solo per eventi autorizzati.** Il programma è fornito senza garanzie: l'autore non garantisce il funzionamento o l'idoneità del programma per uno specifico evento.

## Avvio

Scarica o clona il repository e apri `Lotteria.html` con un browser aggiornato. L'applicazione funziona localmente; non serve installare un server o un programma aggiuntivo.

## Preparare l'estrazione

Dalla schermata iniziale puoi cambiare l'intestazione mostrata nel programma e caricare un logo dell'evento in formato PNG, JPEG o WebP (massimo 5 MB). Il programma ridimensiona il logo entro 60×60 pixel e rifiuta PDF, documenti Word e altri file non immagine. Intestazione e logo restano nella sessione corrente del browser; le istruzioni aperte dal menù mostrano la stessa personalizzazione.

1. In **Numero di biglietti venduti** inserisci un numero intero da 1 a 15.000. I biglietti sono numerati da 1 fino al numero indicato.
2. In **Numero di premi** indica quanti premi vuoi assegnare.
3. Inserisci la **lista dei premi**, un premio per riga e nell'ordine desiderato. Il numero di righe deve corrispondere al numero dei premi; non aggiungere righe vuote alla fine.
4. Se vuoi escludere biglietti, ad esempio perché invenduti, scrivi i loro numeri in **Numeri nulli**, uno per riga. Sono considerate valide solo le esclusioni che sono numeri interi compresi tra 1 e il totale dei biglietti; i duplicati vengono contati una volta sola.

Il programma avvisa se, dopo le esclusioni, non ci sono abbastanza biglietti disponibili per tutti i premi.

## Estrarre e mostrare i numeri

1. Premi **Estrai tutto** e attendi il completamento della barra di avanzamento.
2. Il programma prepara in anticipo tutta la sequenza dei numeri vincenti, senza ripetizioni e rispettando le esclusioni.
3. Quando l'indicatore mostra **Estrazione attiva**, fai clic nell'area principale per mostrare il numero successivo. I premi vengono rivelati dall'ultimo al primo; i primi tre hanno riquadri dedicati.
4. Dopo ogni numero attendi che l'estrazione torni attiva prima di fare un altro clic. Puoi mettere in pausa o riattivare i clic premendo **F2** o facendo clic sull'indicatore in alto a destra.

## Recuperare una sessione

Dopo che è stato mostrato almeno un numero, la sequenza e l'avanzamento sono salvati nell'archivio locale del browser. Se la pagina si chiude o viene ricaricata, riaprila nello stesso browser e profilo e scegli **Recupera ultima sessione** dal menù. La pagina ricostruisce i numeri già mostrati; l'estrazione riparte in pausa, quindi premi **F2** o fai clic sull'indicatore per riattivarla.

Se l'interruzione avviene prima di iniziare a mostrare i numeri, scegli **Nuova estrazione** e avvia di nuovo il sorteggio.

Il recupero potrebbe non essere disponibile se cancelli i dati del browser, cambi browser o profilo.

## Consultare e conservare le liste

Quando l'estrazione arriva al primo premio, dal menù puoi aprire:

- **Apri lista premi**: numeri vincenti nell'ordine dei premi, con la descrizione di ciascun premio.
- **Apri lista ordinata**: numeri vincenti in ordine numerico crescente.

Per conservare una lista, aprila e usa la funzione di stampa del browser, di solito **Ctrl+P**. Nella finestra di stampa puoi scegliere anche il salvataggio in PDF, se disponibile. Durante l'estrazione è utile che una persona annoti a penna i numeri man mano che vengono mostrati.

La stessa guida è disponibile dal menù **Istruzioni** dell'applicazione.
