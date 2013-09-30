
var storage = chrome.storage.local;

// Get at the DOM controls used in the sample.
var resetButton = document.querySelector('button.reset');
var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');

// Load any wordlist that may have previously been saved.
loadChanges();

submitButton.addEventListener('click', saveChanges);
resetButton.addEventListener('click', reset);

function saveChanges() {
  // Get the current wordList from the form.
  var wordList = textarea.value;
  // Check that there's some code there.
  if (!wordList) {
    message('Error: No wordlist specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'words': wordList}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

function loadChanges() {
  storage.get('words', function(items) {
    // To avoid checking items.words we could specify storage.get({words: ''}) to
    // return a default value of '' if there is no words value yet.
    if (items.words) {
      textarea.value = items.words;
      message('Loaded saved wordlist.');
    }
  });
}

function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove('words', function(items) {
    message('Reset stored wordlist');
  });
  // Refresh the text area.
  textarea.value = '';
}

function message(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
