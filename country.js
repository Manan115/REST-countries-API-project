const countryName = new URLSearchParams(location.search).get('name')
const flagImg = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.subregion')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currencies = document.querySelector('.currency')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const backButton = document.querySelector('.back-button')

backButton.addEventListener('click', () => {
    history.back();
})


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country);

        flagImg.src = country.flags.svg;
        countryNameH1.innerText = country.name.common;
        population.innerText = country.population.toLocaleString();
        region.innerText = country.region;
        domain.innerText = country.tld[0];


        if (country.subregion) {
            subregion.innerText = country.subregion;
        }
        else {
            subregion.innerText = 'No subregion';
        }

        if (country.capital) {
            capital.innerText = country.capital?.[0];   
        }
        else {
            capital.innerText = 'No capital';
        }

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common;
        } else {
            nativeName.innerText = country.name.common;
        }
 
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(', ');
        } else {
            currencies.innerText = 'No currency';
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ');
        } else {
            languages.innerText = 'No languages';
        }

        if (country.borders) {
            country.borders.forEach((border) => {
              fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((res) => res.json())
                .then(([borderCountry]) => {
                  // console.log(borderCountry)
                  const borderCountryTag = document.createElement('a')
                  borderCountryTag.innerText = borderCountry.name.common
                  borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                  borderCountries.append(borderCountryTag)
                })
            })
        } else {
            const noBorders = document.createElement('span');
            noBorders.innerText = 'No bordering countries';
            borderCountries.append(noBorders);
        }              
    })
    .catch((error) => {
        console.error('Error fetching country data:', error);
    });


    