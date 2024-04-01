//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// TO-DO: add event listener to return keypress
// TO-DO: add recent search list, maybe to localStorage?

const button = document.querySelector('button')
const drinkContainer = document.querySelector('#hidden')
drinkContainer.setAttribute('id', 'hidden')

button.addEventListener('click', getDrink)

function getDrink() {
  const drink = document.querySelector('input').value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      showCocktailInfo(data)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

function showCocktailInfo(data) {
  
  drinkContainer.removeAttribute('id')

  const cocktail = data.drinks[0]
      console.log(cocktail)
      document.querySelector('.drink').innerText = cocktail.strDrink
      document.querySelector('#cocktailThumb').src = cocktail.strDrinkThumb
      document.querySelector('.instructions').innerText = cocktail.strInstructions
      const ingredients = document.querySelector('.ingredients')

      // document.querySelectorAll('li').forEach( currLi => currLi.remove() )
      
      Object.entries(cocktail).map(([key, val] ) => {
        location.replace(location.href)

        if ( key.startsWith('strMeasure') && (val !== null) ) {
          document.querySelector('.measures').appendChild( document.createElement('li')).textContent = val
          
        }
        if ( key.startsWith('strIngredient') && (val !== null) ) {
          document.querySelector('.ingredients').appendChild( document.createElement('li')).textContent = val  
        }
      })
}