
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




function replaceContent() {
	
	var newContent = document.body.innerHTML;
	
	var arrayOfWords = makeWordList(storedWords);



	for (var i=0; i<arrayOfWords.length; i++) { 

		var re = new RegExp(arrayOfWords[i],"gi");
		replacement =  arrayOfWords[i].charAt(0) + Array(arrayOfWords[i].length-1).join("*") + arrayOfWords[i].charAt(arrayOfWords[i].length-1);
		newContent = newContent.replace(re, replacement); 
	}

	return newContent;
}

//erst ausführen, wenn die Seite komplett geladen ist
window.onload = function(){
	document.body.innerHTML = replaceContent();
}





