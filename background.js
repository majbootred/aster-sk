
var replacement;
var storedWords;


// get storage
chrome.storage.local.get('words', function(items) {
//  console.log(items);
  storedWords = items.words;
});


//make wordArray from stored values
function makeWordList(input){
	return input.split(",");
}


// Find and Replace für alle Wörter, im Text, exklusive innerhalb von HTML-Code und in Linktexten (Linktexte werden weiter unten extra entfernt)
// still some of this code I don't understand - why does this affect img src? (maj)
function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'gi') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,link,meta,script,object,iframe,src';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}




// für Wörter, die in Linktexten stehen
function replaceLinks() {
	var links = document.getElementsByTagName("a");
 	var arrayOfWords = makeWordList(storedWords);

 	//für jeden links auf der Seite
 	for (var l = 0; l < links.length; l++){

 		//für jedes Wort in der gespeicherten Liste
 		for (var i=0; i<arrayOfWords.length; i++) {
 			var re = new RegExp(arrayOfWords[i],"gi");
 			replacement =  arrayOfWords[i].charAt(0) + Array(arrayOfWords[i].length-1).join("*") + arrayOfWords[i].charAt(arrayOfWords[i].length-1);
 			links[l].innerHTML = links[l].innerHTML.replace(re,replacement);
 		}
 	}
}

/*
// single
function replaceLinks() {
    var links = document.getElementsByTagName("a");
    var arrayOfWords = makeWordList(storedWords);

    //für jeden links auf der Seite
    for (var l = 0; l < links.length; l++){

        //für jedes Wort in der gespeicherten Liste
        for (var i=0; i<arrayOfWords.length; i++) {
            var re = new RegExp(arrayOfWords[i],"gi");
            replacement =  arrayOfWords[i].charAt(0) + Array(arrayOfWords[i].length-1).join("*") + arrayOfWords[i].charAt(arrayOfWords[i].length-1);
            links[l].innerHTML = links[l].innerHTML.replace(re,replacement);
        }
    }
*/


function replaceContent() {
	var arrayOfWords = makeWordList(storedWords);

	for (var i=0; i<arrayOfWords.length; i++) { 
		replacement =  arrayOfWords[i].charAt(0) + Array(arrayOfWords[i].length-1).join("*") + arrayOfWords[i].charAt(arrayOfWords[i].length-1);
		findAndReplace(arrayOfWords[i], replacement);
	}

	
}



//erst ausführen, wenn die Seite komplett geladen ist
window.onload = function(){
	replaceContent();
	replaceLinks();
}
