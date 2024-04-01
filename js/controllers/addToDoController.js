import { addToDo } from '../models/toDoListModel'

let dialog
let exitButton
let form
let closeButton

export function addToDoController() {
    dialog = document.querySelector('#create-to-do')
    exitButton = dialog.querySelector('#exit')
    closeButton = dialog.querySelector('#close')
    form = dialog.querySelector('form')

    configureListeners()
    dialog.showModal()
}

function configureListeners() {
    exitButton.addEventListener('click', onCloseDialog)
    closeButton.addEventListener('click', onCloseDialog)
    form.addEventListener('submit', onAddToDoItem)
}

function onAddToDoItem(e) {
    e.preventDefault()
    const category = e.currentTarget.category.value.trim()
    const status = e.currentTarget.status.value.trim()
    const todo = e.currentTarget.todo.value.trim()

    console.log('Adding ToDo:', { category, status, todo })
    addToDo({ 
        category, 
        status, 
        todo 
    })

    render(getUpdatedTodos())
    onCloseDialog()
}

function onCloseDialog(e) {
    dialog.close()    
}

