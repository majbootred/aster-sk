
var replacement;
var storedWords;


// get storage
chrome.storage.local.get('css', function(items) {
//  console.log(items);
  storedWords = items.css;
});



//make wordArray from stored values
function makeWordList(input){
	return input.split(",");
}



//alert("zwei");

console.log("testtesttest");


function replaceContent() {
	
	var newContent = document.body.innerHTML;
	
	var words = makeWordList(storedWords);

	for (var i=0; i<words.length; i++) { 
		replacement =  words[i].charAt(0) + Array(words[i].length-1).join("*") + words[i].charAt(words[i].length-1);
		newContent = newContent.replace(words[i], replacement); 
	}

	return newContent;
}

window.onload = function(){
document.body.innerHTML = replaceContent();
}





