import {saveTask, getTask, onGetTaks} from './firebase.js'

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

//Evento para arrancar toda la pagina
window.addEventListener('DOMContentLoaded', async ()=>{
    //const querySnapshot = await getTask();
    onGetTaks((querySnapshot)=>{
        let html = ''
    
        querySnapshot.forEach(doc => {
            const task = doc.data()
            html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                </div>
            `
        })
    
        tasksContainer.innerHTML= html
    })

})


taskForm.addEventListener('submit',(e)=>{
    //Cancela el refrecar la pagina
    e.preventDefault()

    //Inputs del HTML
    const title = taskForm['task-title']
    const description = taskForm['task-description']

    saveTask(title.value,description.value)

    taskForm.reset()
})