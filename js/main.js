//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// TO-DO: add event listener to return keypress
// TO-DO: add recent search list, maybe to localStorage?
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Selecting DOM elements:

const button = document.querySelector('button')
const drinkContainer = document.querySelector('#hidden')

const drinkName = document.querySelector('.drink')
const drinkImg = document.querySelector('#cocktailThumb')
const measures = document.querySelector('.measures')
const ingredients = document.querySelector('.ingredients')
const instructions = document.querySelector('.instructions')


// adds the #hidden after showCocktailInfo() removes it
drinkContainer.setAttribute('id', 'hidden')


button.addEventListener('click', getDrink)

// Fetch data from the cocktailDB API
function getDrink() {
  const drink = document.querySelector('input').value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      showCocktailInfo(data)
    })
    .catch(err => {
      console.log(`error ${err}`)
      drinkContainer.setAttribute('id', 'hidden')
      document.querySelector('.error').innerText = `${drink} not found`
    });
}
// Add data to DOM
function showCocktailInfo(data) {

  drinkContainer.removeAttribute('id')
  clearIngredients()
  const cocktail = data.drinks[0]
  console.log(cocktail)
  drinkName.innerText = cocktail.strDrink
  drinkImg.src = cocktail.strDrinkThumb
  instructions.innerText = cocktail.strInstructions


  // document.querySelectorAll('li').forEach( currLi => currLi.remove() )

  Object.entries(cocktail).map(([key, val]) => {
    if (key.startsWith('strMeasure') && (val !== null)) {
      // location.replace(location.href)
      measures.appendChild(document.createElement('li')).textContent = val
    }
    if (key.startsWith('strIngredient') && (val !== null)) {
      document.querySelector('.ingredients').appendChild(document.createElement('li')).textContent = val
    }
  })
}

function clearIngredients() {
  while (measures.firstChild) {
    measures.removeChild(measures.firstChild)
  }
  while (ingredients.firstChild) {
    ingredients.removeChild(ingredients.firstChild)
  }
}