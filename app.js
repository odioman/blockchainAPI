import axios from 'axios';

const name = document.querySelector('.name');
const symbol = document.querySelector('.symbol');
const rank = document.querySelector('.rank');
const priceUSD = document.querySelector('.priceUSD');
const priceChange1D = document.querySelector('.priceChange1D');
const input = document.querySelector('.input')
const submit = document.querySelector('.submit')

submit.addEventListener('click', (event) => {
    event.preventDefault();
    let userInput = parseInt(input.value); //convert input into integer
    fetchChain(userInput)
    input.value = ''; //clear the input after submission
})

async function fetchChain(userInput) {
    try {
        const response = await axios.get(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=2000&currency=USD"
        )
        console.log(response);
        const data = await response.json()
        console.log(data)
        displayAPI(data.coins, userInput)
    } catch(err) {
        alert("Blockchain not reached");
    }
}


function displayAPI(data, userInput) {
   name.textContent = 'Name: ' + data[userInput - 1].name
   symbol.textContent = 'Symbol: ' + data[userInput - 1].symbol
   rank.textContent = 'Rank: ' + data[userInput - 1].rank;
   priceUSD.textContent = 'Price (USD): ' + data[userInput - 1].price
   priceChange1D.textContent = 'Price Change 1 Day: ' + data[userInput - 1].priceChange1d 
}
