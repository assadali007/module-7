let deckId
let computerScore = 0
let myScore = 0
const newDeckBtn = document.getElementById('new-deck')
const drawCardBtn = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const header = document.getElementById("header")
const remaining = document.getElementById("remaining")
function handleClick()
{
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
           deckId = data.deck_id
            console.log(data)
            console.log(deckId)
            remaining.textContent = `remaining cards ${data.remaining}`

        })
}
newDeckBtn.addEventListener("click",handleClick)
drawCardBtn.addEventListener("click",() => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card"  alt=""/>
            `
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" alt=""/>
            `
            console.log(data)
            remaining.textContent = `remaining cards ${data.remaining}`
            header.textContent = determinceCardWinner(data.cards[0], data.cards[1])

            if (data.remaining === 0)
            {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    // display "The computer won the game!"
                    header.textContent = "The computer won the game!"
                } else if (myScore > computerScore) {
                    // display "You won the game!"
                    header.textContent = "You won the game!"
                } else {
                    // display "It's a tie game!"
                    header.textContent = "It's a tie game!"
                }
            }
        })
})


function determinceCardWinner(card1,card2) {
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1Value1ndex = valueOptions.indexOf(card1.value)
   // console.log(card1Value1ndex) // 1
    const card2ValueIndex = valueOptions.indexOf(card2.value)
   // console.log(card2ValueIndex) // 8

    if (card1Value1ndex > card2ValueIndex) {
        computerScore++;
        document.getElementById('computer-score').textContent = `Computer score: ${computerScore}`

        return "computer wins"

    } else if (card1Value1ndex < card2ValueIndex) {
        myScore++;
        document.getElementById('my-score').textContent =  ` my score : ${myScore}`

        return "you win"
    } else {
        return "war"
    }
}

