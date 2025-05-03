const poke_container = document.querySelector(".poke-container")
const search = document.querySelector(".search")
const searchBtn = document.querySelector(".searchBtn")
const searchInput = document.querySelector(".searchInput")

const pokemon_count = 151

const bg_color = {
    grass: "#8BD674",
    fire: "#FFA756",
    water: "#58ABF6",
    bug: "#8BD674",
    normal: "#B5B9C4",
    poison: "#9F6E97",
    electric: "#F2CB55",
    ground: "#F78551",
    fairy: "#F471C0",
    psychic: "#A974BC",
    rock: "#D4C294",
    ghost: "#8571BE",
    ice: "#91D8DF",
    dragon: "#7383B9",
    // istediğin kadar tür ekleyebilirsin
  };



searchBtn.addEventListener('click', () => {
    search.classList.toggle('active')
})

//searchInput.addEventListener('input', (e) => {
    //console.log(searchInput.value)
  //  const searchValue = searchInput.value.toLowerCase()
    //const pokemonNames = document.querySelectorAll('.poke-name')
    //console.log(pokemonNames)

   // pokemonNames.forEach((pokemonName) => {
     // if(!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
     //   pokemonName.parentElement.parentElement.style.display = 'block'
     // } else{
         // pokemonName.parentElement.parentElement.style.display = 'none'
       
        
    //  }
  // })

 // })
 

const fetchPokemons = async()=> {
  document.querySelector('.poke-container').innerHTML = '';
    for(let i=1; i < pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
   // console.log(data)
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

    const pokemonId = pokemon.id.toString().padStart(3, '0');

    const pokemonType=pokemon.types[0].type.name
    const pokemonBg = bg_color[pokemonType]
    pokemonDiv.style.backgroundColor = pokemonBg;
    
        

  
    const pokemonDivInnerHTML = `
      <div class="image-container">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      </div>
      <div class="poke-info">
        <span class="poke-id">#${pokemon.id.toString().padStart(3, '0')}</span>
        <h3 class="poke-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <div class="small">
          <small class="poke-exp">
            <i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp
          </small>
          <small class="poke-weight">
            <i class="fa-solid fa-weight-hanging"></i> ${pokemon.weight} kg
          </small>
        </div>
        <div class="poke-type">
          <i class="fa-brands fa-uncharted"></i> ${pokemon.types[0].type.name}
        </div>
      </div>
    `;
  
    pokemonDiv.innerHTML = pokemonDivInnerHTML;
    document.querySelector('.poke-container').appendChild(pokemonDiv);
  };

fetchPokemons();

searchInput.addEventListener('input', (e) => {
   // console.log(searchInput.value)
    const searchValue = searchInput.value.toLowerCase().trim()
    const pokemonNames = document.querySelectorAll('.poke-name')
    //console.log(pokemonNames)

    pokemonNames.forEach((pokemonName) => {
      const nameText = pokemonName.textContent.toLowerCase()
      
      if (nameText.includes(searchValue)) {
        pokemonName.parentElement.parentElement.style.display = 'block'
      } else{
          pokemonName.parentElement.parentElement.style.display = 'none'
       
        
      }
   })

  })
 
