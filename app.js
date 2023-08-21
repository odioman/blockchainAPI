const name = document.querySelector('.name');
const symbol = document.querySelector('.symbol');
const rank = document.querySelector('.rank');
const priceUSD = document.querySelector('.priceUSD');
const priceChange1D = document.querySelector('.priceChange1D');
const input = document.querySelector('.input')
const submit = document.querySelector('.submit')
const card = document.querySelector('.card');
const select = document.querySelector('.cryptocurrencies');

let coins;

submit.addEventListener('click', async (event) => {
    event.preventDefault();
    const userInput = input.value.trim();

        if (userInput !== "") {
            try {
                const response = await fetch (
                "https://api.coinstats.app/public/v1/coins?skip=0&limit=2000&currency=USD"
                );
                const data = await response.json()
                
                coins = data.coins

                populateCryptoSelect(data.coins);

                if (!isNaN(userInput)) {
                    displayAPI(coins, userInput)
                } else {
                    fetchName(coins, userInput)
                }
                input.value = ''; //clear the input
        } catch(err) {
            console.error("API not reached", err);
            card.textContent = "Something went wrong"
        }
    }
});

function populateCryptoSelect(coins) {
    select.innerHTML = '<option value="" selected>Choose a cryptocurrency</option>';

    coins.forEach((coin, index) => {
        const option = document.createElement('option');
        option.value = index.toString();
        option.textContent = coin.name;
        select.appendChild(option);
    })
}

select.addEventListener('change', () => {
    const selectedIndex = select.value;
    if (selectedIndex !== '') {
        displayAPI(coins, selectedIndex)
    }
})

function displayAPI(data, selectedIndex) {
   const selectedCoin = data[selectedIndex]; 
   name.textContent = 'Name: ' + selectedCoin.name
   symbol.textContent = 'Symbol: ' + selectedCoin.symbol
   rank.textContent = 'Rank: ' + selectedCoin.rank;
   priceUSD.textContent = 'Price (USD): ' + selectedCoin.price
   priceChange1D.textContent = 'Price Change 1 Day: ' + selectedCoin.priceChange1d 
}

async function fetchName(data, userInput) {
    try {
        const selectedCoin = data.find(coin => coin.name === userInput);
        if (selectedCoin) {
            const response = await fetch (
                `https://api.coinstats.app/public/v1/coins/${selectedCoin.id}?currency=USD`
            )
            const coinData = await response.json();
            console.log(coinData)
            name.textContent = 'Name: ' + coinData.coin.name
            symbol.textContent = 'Symbol: ' + coinData.coin.symbol
            rank.textContent = 'Rank: ' + coinData.coin.rank;
            priceUSD.textContent = 'Price (USD): ' + coinData.coin.price
            priceChange1D.textContent = 'Price Change 1 Day: ' + coinData.coin.priceChange1d 
        } else {
            console.error("Name not found")
        }
    } catch(error) {
        console.error("Error fetching coin details", error)
    }
}