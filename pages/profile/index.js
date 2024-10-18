import '/style.css'
import '/src/components/form/index'
import '/src/components/modal/index'

const btnEdit = document.querySelector('.form-button_edit');
const inputs = document.querySelectorAll('.form-input');

btnEdit.addEventListener('click', (e)=>{
    e.preventDefault();
    inputs.forEach(input=>{
        input.removeAttribute('disabled')
    })
})

const btnChangePass = document.querySelector('.form-button_change-pass');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.modal-overlay')

btnChangePass.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.style.display = 'block'
})

modal.addEventListener('click', (e)=>{
    if(e.target.className == 'modal-overlay'){
        modal.style.display = 'none';
    }
})
