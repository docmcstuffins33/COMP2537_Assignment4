const setup = () => {
    let flipping = false
    let firstCard = undefined
    let secondCard = undefined
    $(".card").on(("click"), function () {
        if(firstCard != $(this).find(".front_face")[0] && !flipping) {
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
    }
    });
  }
  
  $(document).ready(setup)