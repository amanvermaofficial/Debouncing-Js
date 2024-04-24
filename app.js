const url = "https://randomuser.me/api/?page=3&results=10&seed=abc";
const inp = document.querySelector("#user-input")

function debounce(func,timeout){
    let timer;
return (...args)=>{
    clearTimeout(timer)
    timer=setTimeout(()=>{
        func.apply(this,args);
    },timeout)
}
}

// Function to fetch user data from randomuser.me API
async function fetchUser(query){
try {
    const response = await fetch(url)
    const data = await response.json();
    // console.log(data.results[0].name);
    return data.results.filter((user)=>{
        const fullName = `${user.name.first}  ${user.name.last} `
        return fullName.toLowerCase().includes(query.toLowerCase());
    })
} catch (error) {
    console.log(error);
}
}

// Function to display user cards
function displayUser(users){
const cardContainer = document.querySelector(".card-container");
cardContainer.innerHTML="";
users.forEach((user) => {
    cardContainer.innerHTML+=` <div class="user-card">
    <img src=  ${user.picture.large}  alt="">
    <h2>${user.name.first} ${user.name.last}</h2>
    <p>${user.email}</p>
  </div>`
});
}


// Function to handle search input
const fetchedData = debounce(async function(e){
    const query = e.target.value.trim();
    if(query.length>0){
        let userData = await fetchUser(query);
        displayUser(userData)
    }
    else{
        document.querySelector(".card-container").innerHTML=""
    }
},300)

// Event listener for search input
inp.addEventListener('input',fetchedData)