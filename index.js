let flipping = false
let firstCard = undefined
let secondCard = undefined
let cardsFlipped = 0
let cardAmount = 6
let clicks = 0
let pokemons = [];
let pairsMatched = 0
let pairsLeft = cardAmount/2

const setup = async () => {
    $('#game_grid').empty()
    $('#stats').empty()

    $("#restart").on(("click"), function () {
        location.reload();
    })

    $("#start").on(("click"), async function () {
        var lastRandom = [-999]
        var random = -999
        for(i = 0; i < cardAmount/2; i++) {
            while(lastRandom.includes(random)){
                random = Math.floor(Math.random() * 810) 
            }
            lastRandom.push(random)
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);
            pokemons.push(response.data);
            pokemons.push(response.data);
        }
        console.log(pokemons);
    
        for(i = 0; i < cardAmount; i++) {
            var random = Math.floor(Math.random() * pokemons.length)
            var pokemon = pokemons[random]
            $('#game_grid').append(`<div class="card">
            <img id="img${i}" class="front_face" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <img class="back_face" src="back.webp" alt="">
            </div>`)
            pokemons.splice(random, 1)
        }
        $(".card").on(("click"), function () {
            if(firstCard != $(this).find(".front_face")[0] && !flipping) {
                clicks++;
          $(this).toggleClass("flip");
      
          if (!firstCard){
            firstCard = $(this).find(".front_face")[0]}
          else {
            secondCard = $(this).find(".front_face")[0]
            console.log(firstCard, secondCard);
            if (
              firstCard.src
              ==
              secondCard.src
            ){
              console.log("match")
              $(`#${firstCard.id}`).parent().off("click")
              $(`#${secondCard.id}`).parent().off("click")
              firstCard = undefined
              secondCard = undefined
              cardsFlipped = cardsFlipped + 2
              pairsMatched++
              pairsLeft--
              if(cardsFlipped == cardAmount) {
                alert("You win :D");
              }
            }
            else{
                flipping = true
              console.log("no match")
              setTimeout(() => {
                $(`#${firstCard.id}`).parent().toggleClass("flip")
                $(`#${secondCard.id}`).parent().toggleClass("flip")
                firstCard = undefined
                secondCard = undefined
                flipping = false
              }, 1000)
              
            }
          }
          $('#stats').empty()
            $('#stats').append(`<h2>Number of clicks: ${clicks}</h2>
            <h2>Pairs left: ${pairsLeft}</h2>
            <h2>Pairs matched: ${pairsMatched}/${cardAmount/2}`)
        }
        });
    })

   
    $('#stats').append(`<h2>Number of clicks: ${clicks}</h2>
    <h2>Pairs left: ${pairsLeft}</h2>
    <h2>Pairs matched: ${pairsMatched}/${cardAmount/2}`)
  }
  
  $(document).ready(setup)