function in_array(el,arr) {
	if(typeof arr!=='object'){return;}
	for(var i=0; i < arr.length; i++) {
		if(arr[i] === el){
			return true;
		}
	}
	return false;
}

function randomIndex(maxExclusive) {
	var cryptoSource = window.crypto;
	if (cryptoSource && cryptoSource.getRandomValues && typeof Uint32Array !== 'undefined') {
		var randomValue = new Uint32Array(1);
		var range = 4294967296;
		var limit = Math.floor(range / maxExclusive) * maxExclusive;
		try {
			do {
				cryptoSource.getRandomValues(randomValue);
			} while (randomValue[0] >= limit);
			return randomValue[0] % maxExclusive;
		} catch (error) {
			// Mantiene l'estrazione utilizzabile nei browser che non espongono Crypto correttamente.
		}
	}
	return Math.floor(Math.random() * maxExclusive);
}

	function createBar(){

	this.bar=function(){
		setTimeout(function(){
			var bar=document.querySelector("#bar");
			//console.log(bar);
			bar.style.width="100%";
		}, 1500);
	}
	this.cursorBody=function(){
		if(document.querySelector('#progress-bar')){
			return;
		}
		var contenitore=document.createElement('div');
		contenitore.setAttribute('id','progress-bar');
		var bar=document.createElement('span');
		bar.setAttribute('id','bar');
		contenitore.appendChild(bar);
		document.getElementsByTagName('body')[0].appendChild(contenitore);
		this.bar();
		this.closeBar();
	}

	this.closeBar=function(){
		if(document.querySelector('#progress-bar')){
			setTimeout(function(){
			   document.querySelector('#progress-bar').parentNode.removeChild(document.querySelector('#progress-bar'));
			}, 11000);
		}
	}

}
	

	function estraiTutti(){
		index=0;
		maxForm=document.querySelector("#max");
		premi=document.querySelector("#premi");
		maxVal=Number(maxForm.value);
		var premiVal=Number(premi.value);
		if (!Number.isSafeInteger(maxVal) || maxVal < 1 ||
			!Number.isSafeInteger(premiVal) || premiVal < 1) {
			alert("Inserisci un numero intero positivo per i biglietti venduti e per i premi.");
			return;
		}
		if (maxVal > 15000) {
			alert("Il numero massimo di biglietti venduti è 15.000.");
			return;
		}
		var local={};
		var listaPremi=document.getElementById('listaPremi');
		var numeriNulli=document.getElementById('numeriNulli');
		listaPremiArray = listaPremi.value.split("\n");
		listaNumeriNulli = numeriNulli.value.split("\n").map(Number);
		console.log(listaNumeriNulli);
		//console.log(typeof listaNumeriNulli[0]);
		//console.log("Numero lista premi: "+listaPremiArray.length);
		//console.log("Numero premi: "+premi.value);
		if(listaPremiArray.length!=premiVal){
			alert("E' necessario indicare un numero di premi uguale alla lista dei premi!! ");
			return;
		}
		//console.log(typeof premiVal);
		//console.log(typeof maxVal);
		if(premi.value>maxVal){
			alert("E' necessario indicare un numero di premi minore dei biglietti venduti"); 
			return;
		}


		var numeriNulliValidi = [];
		var numeriEsclusi = [];
		for (var n = 0; n < listaNumeriNulli.length; n++) {
			var numeroEscluso = listaNumeriNulli[n];
			if (numeroEscluso >= 1 && numeroEscluso <= maxVal &&
				Math.floor(numeroEscluso) === numeroEscluso &&
				!numeriEsclusi[numeroEscluso]) {
				numeriNulliValidi.push(numeroEscluso);
				numeriEsclusi[numeroEscluso] = true;
			}
		}

		var bigliettiDisponibili = maxVal - numeriNulliValidi.length;
		if (premiVal > bigliettiDisponibili) {
			alert("I premi richiesti (" + premiVal + ") superano i biglietti disponibili dopo le esclusioni (" + bigliettiDisponibili + "). Riduci il numero dei premi o modifica i numeri esclusi.");
			return;
		}

		// Evita di avviare più estrazioni se si fa doppio clic durante la barra di avanzamento.
		document.querySelector("#estraiTutti").removeEventListener("click", estraiTutti);
		document.querySelector("#estraiTutti").disabled=true;
		document.querySelector("#header").style.display='none';
		createBar=new createBar();
		createBar.cursorBody();
		setTimeout(function(){
		
		// Crea il contenitore dei biglietti validi una volta sola.
		var numeriDisponibili = [];
		for (var numero = 1; numero <= maxVal; numero++) {
			if (!numeriEsclusi[numero]) {
				numeriDisponibili.push(numero);
			}
		}

		// Fisher-Yates parziale: ogni estrazione sposta il biglietto scelto fuori
		// dall'area ancora estraibile, quindi non può uscire una seconda volta.
		lista = [];
		for (var i = 0; i < premiVal; i++) {
			var indiceCasuale = i + randomIndex(numeriDisponibili.length - i);
			var numeroEstratto = numeriDisponibili[indiceCasuale];
			numeriDisponibili[indiceCasuale] = numeriDisponibili[i];
			numeriDisponibili[i] = numeroEstratto;
			lista.push(numeroEstratto);
		}

		index=lista.length-1;
		// Salva subito il prossimo premio da mostrare, così un recupero prima
		// del primo clic non riutilizza l'indice di una sessione precedente.
		localStorage.setItem('index',index);
		//console.log("Index e': "+index);
		//console.log("[363] :"+lista);
		document.querySelector("#corpo").style.display='block';
		
		document.querySelector("#primoP").innerText=listaPremiArray[0];//.substr(0,80);
		document.querySelector("#secondoP").innerText=listaPremiArray[1];//.substr(0,80);
		document.querySelector("#terzoP").innerText=listaPremiArray[2];//.substr(0,80);
		var primiPremi=document.querySelectorAll(".primiPremi");
		/*for(h in primiPremi){
			primiPremi[h].querySelectorAll("span")[1].innerText=listaPremiArray[h].substr(0,80);
			//console.log('prop: '+i);
		}*/
		//accoda();
		//localStorage.setItem('index',index);
		localStorage.setItem('maxVal',maxVal);
		localStorage.setItem('premiVal',premiVal);

		local['lista']=lista;
		local['listaPremi']=listaPremiArray;
		//local['listaNumeriNulli']=listaNumeriNulli;
		console.log("[383] "+local);
		localStorage.setItem('localList',JSON.stringify(local));
		//document.querySelector('#estr').addEventListener("click", rolling);
		enabledExtraction();
		//document.querySelector('#openList').addEventListener('click',function(){apriLista();});
		//document.querySelector('#openListSort').addEventListener('click',function(){apriTabella();});
		//document.querySelector('#openList').disabled=false;
		//document.querySelector('#openListSort').disabled=false;
		}, 11100);
		
	}
	function disabledExtraction(){
		document.querySelector("#corpo").removeEventListener("click", rolling);
		//document.querySelector("#estr").disabled=true;
		control=0;
		var contolButton=document.querySelector("#control");
			contolButton.style.width="200px";
			contolButton.style.height="20px";
			contolButton.style.color="#fff";
			contolButton.style.background="red";
			contolButton.innerHTML="Estrazione non attiva";
		contolButton.removeEventListener("click", disabledExtraction);	
		contolButton.addEventListener("click", enabledExtraction);	
	}
	
	function enabledExtraction(noMess){
		if(index==-1){
			if(noMess==1){
					console.log('Sono stati estratti tutti i numeri!!');
				}else{
					alert('Sono stati estratti tutti i numeri!!');
				}
			return;
		}
		document.querySelector("#corpo").addEventListener("click", rolling);
		//document.querySelector("#estr").disabled=false;
		control=1;
		var contolButton=document.querySelector("#control");
			contolButton.style.background="green";
			contolButton.innerHTML="Estrazione attiva";
		contolButton.removeEventListener("click", enabledExtraction);	
		contolButton.addEventListener("click", disabledExtraction);	
	}
	
	function keyControl(e){
		var x = e.which ||e.keyCode;
		if (x == 113){
			if(control){
				disabledExtraction();
			}else{
				enabledExtraction();
			}
		}
	}
	
	function accoda(){
		//console.log("[391]Numero lista premi: "+listaPremiArray.length);
		disabledExtraction();
		if(index<1){
			document.querySelector('#openList').addEventListener('click',function(){apriLista();});
			document.querySelector('#openListSort').addEventListener('click',function(){apriTabella();});
			document.querySelector('#openList').disabled=false;
			document.querySelector('#openListSort').disabled=false;
		}
		if(index<3){
			
			var primiPremi=document.querySelectorAll(".first");
			var primiPremiTxt=document.querySelectorAll(".firstTxt");
			primiPremi[index].innerText=lista[index];
			primiPremi[index].parentNode.parentNode.style.background='red';
			//primiPremi[index].parentNode.style.height='250px';
			primiPremi[index].parentNode.parentNode.style.paddingTop='60px';
			
			if(primiPremiTxt[index+1]){
				primiPremiTxt[index+1].classList.remove('blinking');
			}
			primiPremiTxt[index].classList.add('blinking');
			//document.querySelector('#list').firstChild.querySelector('div').className='inLista';


		}else{
			var newItem = document.createElement("LI");
			newItem.classList.add('lista');
			newItem.classList.add('liFirst');
			var parentesi = document.createElement("span");
			parentesi.setAttribute("style","margin-right:20%");
			parentesi.appendChild(document.createTextNode((parseInt(index)+1)+'°)  '));
			var numPremio = document.createElement("span");
			numPremio.appendChild(document.createTextNode(lista[index]+" "));
    			//var numList=document.createTextNode((parseInt(index)+1)+'°)  '+lista[index]+" ");
			//newItem.appendChild(numList);
			var premioDiv = document.createElement("div");
			premioDiv.classList.add('inLista');
			var premioLista=document.createTextNode(listaPremiArray[index]);//.substr(0,80));
			premioDiv.appendChild(premioLista);
			newItem.appendChild(parentesi);
			newItem.appendChild(numPremio);
			newItem.appendChild(premioDiv);
			document.querySelector('#list').insertBefore(newItem,document.querySelector('#list').firstChild);
			var plin = new Audio("audio/notification.wav");
			plin.play();

		}
		
		var panel=document.querySelector("#panel");
		panel.classList.add('panelTemp');
		panel.innerHTML=lista[index];
		var lis=document.querySelector('#list').getElementsByClassName('lista');
		//console.log(lis.length);
		setTimeout(function () { 
			panel.classList.remove('panelTemp');
			panel.style.opacity='0';
			if (lis.length > 0) {
				lis[0].classList.remove('liFirst');
				if(lis[1]){
					lis[1].querySelector('div').classList.remove('blinking');
				}
				lis[0].querySelector('div').classList.add('blinking');
			}
			/*for(prop in lis) {
	 			
				try {
    					lis[prop].classList.remove('liFirst');
				}
				catch(err) {
    					console.log(err.message);
				}
			} */

			
		}, 1000);
		setTimeout(function () { 
			panel.style.display='none';
		}, 2500);

		index--;
		localStorage.setItem('index',index); 
		setTimeout(function(){enabledExtraction(1);},8000);

	}	

	function rolling(){
		/*document.querySelector("#estr").removeEventListener("click", rolling);
		document.querySelector("#estr").disabled=true;*/
		disabledExtraction();
		premi=document.querySelector("#premi").value;
		var click = new Audio("audio/click.wav");
		var fireworks = new Audio("audio/fireworks.mp3");

		click.play();
		var rullo = new Audio("audio/rulloTamburi2.mp3");
		//console.log("Premi "+index);
		//console.log("lista.length "+lista.length);
	
		if(index==-1){
			alert('Sono stati estratti tutti i numeri!!');
			return;
		}
		var roll=setInterval(function(){
			maxVal=document.querySelector("#max").value;
			maxVal=(maxVal>0)?maxVal:5000;
			var numTemp=Math.floor((Math.random() * maxVal) + 1);
			panel.style.display='block';
			panel.style.opacity='1';
			panel.innerHTML=numTemp;
			disabledExtraction();
			if(index<3){
				var primiPremi=document.querySelectorAll(".first");
				primiPremi[index].innerText=numTemp;
				//primiPremi[index].parentNode.parentNode.style.background='red';
				//primiPremi[index].parentNode.style.height='250px';
				//primiPremi[index].parentNode.parentNode.style.paddingTop='60px';
				
				rullo.play();
			}
		},60);
		var timeRoll=(index<3)?9000:4000;
		setTimeout(function () {
			clearInterval(roll);

		/*if(index!=0){
			setTimeout(function () {
				document.querySelector("#estr").disabled=false;
				document.querySelector('#estr').addEventListener("click", rolling);
			}, 3000);
		}*/

			accoda();
			if(index<0){
				
				var fire=setInterval(function(){
					createFirework(25,187,5,1,null,null,null,null,false,true);
				},400);
				setTimeout(function () {
					fireworks.play();
				},3000);
				setTimeout(function () {
					clearInterval(fire);
				},20000);
			}
		}, timeRoll);
		
	}
 
function recupera(){ 
  if(confirm("Vuoi ripristinare l'ultima sessione?")){
	document.querySelector('#list').innerHTML='';
	var localList=JSON.parse(localStorage.getItem('localList')); 
	console.log(localList);
	console.log('lista: '+localList.lista);
	console.log('Lunghezza lista: '+localList.lista.length);
	console.log('Premi: '+localList.listaPremi);
	console.log('Index: '+localStorage.getItem('index'));
	for(var i=(localList.lista.length-1);i>localStorage.getItem('index');i--){
		console.log(localList.lista[i]);
		if(i<3){
			var primiPremi=document.querySelectorAll(".first");
			primiPremi[i].innerText=localList.lista[i];
			primiPremi[i].parentNode.parentNode.style.background='red';
			//primiPremi[i].parentNode.style.height='150px';
			primiPremi[i].parentNode.parentNode.style.paddingTop='60px';
		}else{
			var newItem = document.createElement("LI");
			newItem.classList.add('lista');
			//newItem.classList.add('liFirst');
			var parentesi = document.createElement("span");
			parentesi.setAttribute("style","margin-right:20%");
			parentesi.appendChild(document.createTextNode((parseInt(i)+1)+'°)  '));
			var numPremio = document.createElement("span");
			numPremio.appendChild(document.createTextNode(localList.lista[i]+" "));
    			//var numList=document.createTextNode((parseInt(i)+1)+'°)  '+localList.lista[i]+" ");
			//newItem.appendChild(numList);
			var span = document.createElement("div");
			span.classList.add('inLista');
			var premioLista=document.createTextNode(localList.listaPremi[i]);//.substr(0,80));
			span.appendChild(premioLista);
			newItem.appendChild(parentesi);
			newItem.appendChild(numPremio);
			newItem.appendChild(span);
			document.querySelector('#list').insertBefore(newItem,document.querySelector('#list').firstChild);
			var panel=document.querySelector("#panel");
			panel.classList.add('panelTemp');
			panel.innerHTML=localList.lista[i];
		}

	}
		
		document.querySelector("#header").style.display='none';
		document.querySelector("#estraiTutti").removeEventListener("click", estraiTutti);
		document.querySelector("#estraiTutti").disabled=true;
		document.querySelector("#corpo").style.display='block';
		//document.querySelector("#estr").disabled=false;
		//document.querySelector('#estr').addEventListener("click", rolling);
		document.querySelector("#primoP").innerText=localList.listaPremi[0];//.substr(0,80);
		document.querySelector("#secondoP").innerText=localList.listaPremi[1];//.substr(0,80);
		document.querySelector("#terzoP").innerText=localList.listaPremi[2];//.substr(0,80);
		//ripristino variabili globali
		index=localStorage.getItem('index');
		maxVal=localStorage.getItem('maxVal');
		premiVal=localStorage.getItem('premiVal');
		lista=localList.lista;
		listaPremiArray=localList.listaPremi;
		enabledExtraction(1);
		if(localStorage.getItem('index')<1){
			document.querySelector('#openList').addEventListener('click',function(){apriLista();});
			document.querySelector('#openListSort').addEventListener('click',function(){apriTabella();});
			document.querySelector('#openList').disabled=false;
			document.querySelector('#openListSort').disabled=false;
		}
  }
};

function apriLista(){
        //var winStyle = "top=10, left=10, width=400, height=800, scrollbars=1, status=no, menubar=no, toolbar=no";
        var win = document.createElement('div');
	winStyle="z-index:1;position:absolute;top:0px;background:#fff;text-align:center;width:98%;height:100%";
	win.setAttribute('style',winStyle);
	var winClose = document.createElement('div');
	winCloseStyle="color:#fff;cursor:pointer;text-align:center;padding-top:15px;padding-bottom:15px;background:red;";
	winClose.setAttribute('style',winCloseStyle);
	winClose.appendChild(document.createTextNode('Chiudi'));
	winClose.addEventListener('click',function(){
		this.parentNode.parentNode.removeChild(this.parentNode);
		document.querySelector("#corpo").style.display='block';
	});
	var html="<table border='1' style=\"background:#fff;width:100%\">";
	for(var i=0;i<lista.length;i++){
		var num=parseInt(i)+parseInt(1);

		html+="<tr><td class=\"tdList\">"+num+"° premio: </td><td class=\"tdList\">"+lista[i]+" </td><td class=\"tdList\">"+listaPremiArray[i]+"</td></tr>";
	}
	html+=("</table>");
	win.innerHTML=html;
	win.insertBefore(winClose,win.firstChild);
	document.querySelector('body').appendChild(win);
	document.querySelector("#corpo").style.display='none';
}

function apriTabella(){
	var listaOrd=new Array();
	for(var e in lista){
		listaOrd.push(parseInt(lista[e]));
	}
	listaOrd.sort(function(a, b){return a-b});
        var win = document.createElement('div');
	winStyle="z-index:1;position:absolute;top:0px;background:#fff;text-align:center;width:98%;height:100%";
	win.setAttribute('style',winStyle);
	var winClose = document.createElement('div');
	winCloseStyle="color:#fff;cursor:pointer;text-align:center;padding-top:15px;padding-bottom:15px;background:red;";
	winClose.setAttribute('style',winCloseStyle);
	winClose.appendChild(document.createTextNode('Chiudi'));
	winClose.addEventListener('click',function(){
		this.parentNode.parentNode.removeChild(this.parentNode);
		document.querySelector("#corpo").style.display='block';
	});
	var html="<table border='1' style=\"background:#fff;width:100%;height:100%;\">";
	html+="<tr>";
	html+="<td class=\"tdList\">";
	console.log(maxVal);
	for(var i=0,r=0,c=0;i<=maxVal;i++,r++,c++){
		if(in_array(i,listaOrd)){
			html+=i+"<br>";
		}
		if(c==100){
			console.log(c);
			html+="</td><td class=\"tdList\">";
			c=0;
		}
		if(r==1000){
			html+="</td></tr><tr><td class=\"tdList\">";
			r=0;
		}
	}
	html+="</td>";
	html+="</tr>";
	html+="</table>";
	win.innerHTML=html;
	win.insertBefore(winClose,win.firstChild);
	document.querySelector('body').appendChild(win); 
	document.querySelector("#corpo").style.display='none'; 
}

window.addEventListener('load',function(){
	//document.querySelector('#estr').addEventListener("click", rolling);
	document.querySelector('#recove').disabled=true;
	if(localStorage.getItem('localList')!=null){
		document.querySelector('#recove').addEventListener('click',function(){
			recupera();
		});
		document.querySelector('#recove').disabled=false;
	}

	document.querySelector('#estraiTutti').addEventListener('click',estraiTutti);
	document.querySelector('#reloadPage').addEventListener('click',function(){location.reload();});
	document.querySelector('#openInstructions').addEventListener('click',function(){
		window.open('Istruzioni.html','_blank');
	});
	//document.querySelector('#openList').addEventListener('click',function(){apriLista();});
	//document.querySelector('#openListSort').addEventListener('click',function(){apriTabella();});
	window.addEventListener('keyup',keyControl);
	lista=new Array();
	
	document.querySelector("#estraiTutti").disabled=false;
	//document.querySelector("#estr").disabled=false;
	document.querySelector('#openList').disabled=true;
	document.querySelector('#openListSort').disabled=true;
});

window.onbeforeunload = function(){
   			return '0';

	}
