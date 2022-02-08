import {saveTask, getTask, onGetTaks, deleteTask} from './firebase.js'

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
                    <button class="btn-delete" data-id='${doc.id}'>Delete</button>
                </div>
            `
        })
    
        tasksContainer.innerHTML= html
        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
        console.log(btnsDelete)

        btnsDelete.forEach(btn => {
            // btn.addEventListener('click', (event)=>{
            //     console.log(event.target.dataset.id)
            // })
            // Misma funciones con destructuracion
            btn.addEventListener('click', ({target:{dataset}})=>{
                deleteTask(dataset.id)
            })
        })        
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