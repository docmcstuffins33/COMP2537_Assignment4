let flipping = false
let firstCard = undefined
let secondCard = undefined
let cardsFlipped = 0
let cardAmount = 0
let clicks = 0
let pokemons = [];
let pairsMatched = 0
let pairsLeft = 0
let seconds = 0
let timer = undefined

const setup = async () => {
    $('#game_grid').empty()
    $('#stats').empty()

    $("#restart").on(("click"), function () {
        location.reload();
    })


    $("#restart").on(("click"), function () {
        location.reload();
    })

    function second() {
        seconds++
        timer = setTimeout(second, 1000)
        if(Math.floor(Math.random() * 20) == 0 && firstCard == undefined && secondCard == undefined && !flipping) {
            console.log("powerup")
            flipping = true
            alert("Powerup!!!")
            $(".card").toggleClass("flip");
            flipping = true
              console.log("no match")
              setTimeout(() => {
                $(`.card`).toggleClass("flip")
                flipping = false
              }, 2000)
        }
        $('#stats').empty()
        $('#stats').append(`<h2>Time: ${seconds} seconds</h2>
        <h2>Number of clicks: ${clicks}</h2>
        <h2>Pairs left: ${pairsLeft}</h2>
        <h2>Pairs matched: ${pairsMatched}/${cardAmount/2}</h2>`)
    }

    $("#start").on(("click"), async function () {
        timer = setTimeout(second, 1000)
        var diff = document.getElementById('difficulty')

        console.log(diff.value)
        
        switch (diff.value) {
            case ("Easy"): cardAmount = 6
            break;
            case ("Medium"): cardAmount = 12
            break;
            case ("Hard"): cardAmount = 18
            break;
            default: cardAmount = 6
        }
        pairsLeft = cardAmount/2
        $(this).off("click")
        const grid = document.getElementById("game_grid");
        grid.setAttribute("style",`height:${200*cardAmount/3}px;`)
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
        $("#dark").on(("click"), function () {
            grid.setAttribute("style",`height:${200*cardAmount/3}px;background-color: black`)
        })
        $("#light").on(("click"), function () {
            grid.setAttribute("style",`height:${200*cardAmount/3}px;background-color: beige`)
        })
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
                clearTimeout(timer);
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
          $('#stats').append(`<h2>Time: ${seconds} seconds</h2>
          <h2>Number of clicks: ${clicks}</h2>
          <h2>Pairs left: ${pairsLeft}</h2>
          <h2>Pairs matched: ${pairsMatched}/${cardAmount/2}</h2>`)
        }
        });
        $('#stats').append(`<h2>Time: ${seconds} seconds</h2>
        <h2>Number of clicks: ${clicks}</h2>
        <h2>Pairs left: ${pairsLeft}</h2>
        <h2>Pairs matched: ${pairsMatched}/${cardAmount/2}</h2>`)
    })

   
  }
  
  $(document).ready(setup)