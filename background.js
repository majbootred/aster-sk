
/*

var words = ["mean","disrespectful","places"];
var replacement = "";

function replaceContent() {

	var newContent = document.body.innerHTML;
	for (var i=0; i<words.length; i++) {
		replacement = words[i].charAt(0) + "***" + words[i].charAt(words[i].length-1;
		newContent = newContent.replace(words[i], "fubarfu"); 
  }

	return newContent;
}

document.body.innerHTML = replaceContent();
*/

var words = ["mean","disrespectful","places"];
var replacement;

function replaceContent() {
	
	var newContent = document.body.innerHTML;
	

	for (var i=0; i<words.length; i++) { 
		replacement =  words[i].charAt(0) + Array(words[i].length-1).join("*") + words[i].charAt(words[i].length-1);
		newContent = newContent.replace(words[i], replacement); 
	}

	return newContent;
}

//document.body.innerHTML = replaceContent();
document.body.innerHTML = replaceContent();



// first array test 
/*
var exchange = $('body');
var words=["me","you","we"];


var regexp = new RegExp( words.join( '|' ), 'g' );


exchange.html(exchange.html().replace(regexp, "****"));
*/


//single word
/*
var exchange = $('body');
var word = "me";
var re = new RegExp(word, "g");


exchange.html(exchange.html().replace(re, "Rumpelstielzchen"));
*/



