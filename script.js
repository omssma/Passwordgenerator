// Arry of types of characters to be included in password
var numChar = ["0123456789"];

var specialChar = ["`~!@#$%^&*()_+-=][|}{';:/.,<>?"];

var lowerCaseChar = ["qwertyuioplkjhgfdsazxcvbnm"];

var upperCaseChar = ["QWERTYUIOPLKJHGFDSAZXCVBNM"];

// Prompt user for password options
function getPasswordOptions() {
  var length = parseInt(
    prompt("How many characters would you like your password to contain?")
  );

  // Check if user input for password length is a number
  if (isNaN(length) === true) {
    alert("Password length must be provided as a numerical value");
    return;
  }

  // Check if password length is at least 8 characters long
  if (length < 8) {
    alert("Password length must be at least 8 characters");
    return;
  }

  // Check if password length is less than 128 characters long
  if (length > 128) {
    alert("Password length must less than 128 characters");
    return;
  }

  // Store boolean for special characters to be included
  var hasSpecialChar = confirm(
    "Click OK to confirm including special characters."
  );
  // Store boolean for numeric characters to be included
  var hasNumChar = confirm(
    "Click OK to confirm including numeric characters."
  );
  // Store boolean for lowercase characters to be included
  var hasLowerCaseChar = confirm(
    "Click OK to confirm including lowercase characters."
  );
  // Store boolean for uppercase characters to be included
  var hasUpperCaseChar = confirm(
    "Click OK to confirm including uppercase characters."
  );
  // Check if user does not include any types of characters
  if (
    hasSpecialChar === false &&
    hasNumChar === false &&
    hasLowerCaseChar === false &&
    hasUpperCaseChar === false
  ) {
    alert("You must select at least one character type");
    return;
  }

  // Store user input
  var passwordOptions = {
    length: length,
    hasSpecialChar: hasSpecialChar,
    hasNumChar: hasNumChar,
    hasLowerCaseChar: hasLowerCaseChar,
    hasUpperCaseChar: hasUpperCaseChar
  };

  return passwordOptions;
}

// Get a random element from an array
function getRandom(array) {
  var rand_Index = Math.floor(Math.random()*array.length);
  var rand_Element = array[rand_Index];

  return rand_Element;
}

// Generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  var result = [];

  // Array to store types of characters to contain each type of chosen character to include in password
  var characterType = [];

  var usedChar = [];

  // Add array of numeric characters into array of possible characters based on user input
  if (options.hasNumChar) {
    characterType = characterType.concat(numChar);
    usedChar.push(getRandom(numChar));
  }

  // Add array of special characters into array of possible characters based on user input
  if (options.hasSpecialChar) {
    characterType = characterType.concat(specialChar);
    usedChar.push(getRandom(specialChar));
  }

  // Add array of lowercase characters into array of possible characters based on user input
  if (options.hasLowerCaseChar) {
    characterType = characterType.concat(lowerCaseChar);
    usedChar.push(getRandom(lowerCaseChar));
  }

  // Add array of uppercase characters into array of possible characters based on user input
  if (options.hasUpperCaseChar) {
    characterType = characterType.concat(upperCaseChar);
    usedChar.push(getRandom(upperCaseChar));
  }

  // Iterate over the password length from the options object
  for (var i = 0; i < options.length; i++) {
    var characterType = getRandom(characterType);

    result.push(characterType);
  }

  // Mix in at least one of each guaranteed character in the result
  for (var i = 0; i < usedChar.length; i++) {
    result[i] = usedChar[i];
  }

  // Transform the result into a string to generate a password
  return result.join("");
}

// Get references to the #generate element
var generateButton = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var Text = document.querySelector("#password");

  Text.value = password;
}

// Add event listener to click button
generateButton.addEventListener("click", writePassword);