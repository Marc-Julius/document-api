document.addEventListener("DOMContentLoaded" ,()=>{
    
const dropdown = document.getElementById('dropdown');
const button = document.querySelector('button#menu-button');

button.addEventListener("click", (event) =>{
    dropdown.classList.toggle("hidden");
})

document.addEventListener("click", (event)=>{
    if (!dropdown.classList.contains("hidden") && !button.contains(event.target)){
        dropdown.classList.add("hidden");
    }
})
})