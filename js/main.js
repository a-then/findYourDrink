//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM


const button = document.querySelector('button')

button.addEventListener('click', getDrink)

function getDrink() {
  const drink = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      const drink = data.drinks[0]
      console.log(drink)
      document.querySelector('h2').innerText = drink.strDrink
      document.querySelector('#cocktailThumb').src = drink.strDrinkThumb
      document.querySelector('.instructions').innerText = drink.strInstructions

      let liIngred = document.createElement('li');
      let ulIngred = document.getElementById('ingredients')

      let entries = Object.entries(drink)
      entries.map(([key, val] = entry) => {
        if (key.startsWith('strIngredient') && (val !== null)) {
          liIngred.appendChild(document.createTextNode(val))
          console.log(liIngred);
          ulIngred.appendChild(liIngred)
        }
      })

    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}
