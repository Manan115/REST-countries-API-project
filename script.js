const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const DarkMode = document.querySelector('.theme-switcher')

let allCountriesData = []

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    if (savedTheme === 'dark') {
        document.body.classList.add('dark'); // Apply dark mode
        DarkMode.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'; // Update to light mode
    } else {
        DarkMode.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'; // Default to dark mode
    }
});

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data)=>{
        renderCountries(data)
        allCountriesData = data
    })  
    // renderCountries is a function that will render the countries
    filterByRegion.addEventListener('change', (e) => {
        targetValue = e.target.value
        fetch(`https://restcountries.com/v3.1/region/${targetValue}`)
        .then((res) => res.json())
        .then(renderCountries)  // renderCountries is a function that will render the countries
})

function renderCountries(data)
{
        countriesContainer.innerHTML = ''
            data.forEach((country) => {
                const countryCard = document.createElement('a')
                countryCard.classList.add('country-card')
                countryCard.href = `/country.html?name=${country.name.common}`
                countryCard.innerHTML = 
                `<img src="${country.flags.svg}" alt="${country.name.common} flag">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital}</p>
                    </div>`
                countriesContainer.append(countryCard)
            })
}

searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries); // Pass the filtered data to renderCountries
});

DarkMode.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark'); // Toggle dark mode
    if (isDarkMode) {
        DarkMode.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'; // Update to light mode
        localStorage.setItem('theme', 'dark'); // Save dark mode in local storage
    } else {
        DarkMode.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'; // Update to dark mode
        localStorage.setItem('theme', 'light'); // Save light mode in local storage
    }
});


