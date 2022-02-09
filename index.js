import {saveTask, getTask, onGetTaks, deleteTask, getOneTask, editTask} from './firebase.js'

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')
let editStatus=false
let id=""

//Evento para arrancar toda la pagina
window.addEventListener('DOMContentLoaded', async ()=>{
    //const querySnapshot = await getTask();
    onGetTaks((querySnapshot)=>{
        let html = ''
    
        querySnapshot.forEach(doc => {
            const task = doc.data()
            html += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
                        <button class="btn-delete btn-primary" data-id='${doc.id}'>Delete</button>
                        <button class="btn-edit btn-btn-secondary" data-id='${doc.id}'>Edit</button>
                    </div>
                </div>
            `
        })
    
        tasksContainer.innerHTML= html
        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')

        btnsDelete.forEach(btn => {
            // btn.addEventListener('click', (event)=>{
            //     console.log(event.target.dataset.id)
            // })
            // Misma funciones con destructuracion
            btn.addEventListener('click', ({target:{dataset}})=>{
                deleteTask(dataset.id)
            })
        })    
        
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async({target:{dataset}})=>{
                const doc = await getOneTask(dataset.id)
                const task = doc.data()
                taskForm['task-title'].value=task.title
                taskForm['task-description'].value=task.description
                editStatus=true
                id=dataset.id
                taskForm['btn-task-save'].innerText = 'Update'
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

    if(editStatus){
        editTask(id,
        {   title:title.value,
            description:description.value
        })
        editStatus=false
        taskForm['btn-task-save'].innerText = 'Save'
    }else{
        saveTask(title.value,description.value)
    }

    taskForm.reset()
})