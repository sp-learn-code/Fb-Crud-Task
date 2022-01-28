import {saveTask} from './firebase.js'

//Evento para arrancar toda la pagina
window.addEventListener('DOMContentLoaded',()=>{

})

const taskForm = document.getElementById('task-form')
taskForm.addEventListener('submit',(e)=>{
    //Cancela el refrecar la pagina
    e.preventDefault()

    //Inputs del HTML
    const title = taskForm['task-title']
    const description = taskForm['task-description']

    saveTask(title.value,description.value)

    taskForm.reset()
})