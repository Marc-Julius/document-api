document.addEventListener("DOMContentLoaded" ,()=>{
    
const dropdown = document.getElementById('dropdown');
const button = document.querySelector('button#menu-button');
const dropdown2 = document.getElementById('dropdown2');
const button2 = document.querySelector('button#menu-button2');
button.addEventListener("click", (event) =>{
    dropdown.classList.toggle("hidden");
})

document.addEventListener("click", (event)=>{
    if (!dropdown.classList.contains("hidden") && !button.contains(event.target)){
        dropdown.classList.add("hidden");
    }
})

button2.addEventListener("click", (event) =>{
    dropdown2.classList.toggle("hidden");
})

document.addEventListener("click", (event)=>{
    if (!dropdown2.classList.contains("hidden") && !button2.contains(event.target)){
        dropdown2.classList.add("hidden");
    }
})
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');

const toggleModal = () => modal.classList.toggle('hidden');
const toggleFlex = () => modal.classList.toggle('flex');

openBtn.onclick = () => { toggleModal(); toggleFlex(); };
closeBtn.onclick = () => { toggleModal(); toggleFlex(); };

})