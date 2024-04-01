import { ref, set, get, push, child, remove, update} from 'firebase/database'
import { db } from '../lib/firebase/config/firebaseInit'
import { createStore, removeFromStore, updateStore} from './store'
 
let observers = []
 
export function subscribe(fn) {
    observers.push(fn)
    console.log(observers)
}
 
export function notify(data) {
    observers.forEach((observer) => observer(data))
}
 
export async function getToDoData() {
    const dbRef = ref(db, 'todos')
    const response = await get(dbRef)
    let payload = await response.val()
    payload = Object.entries(payload)
    let toDoItems = payload.map((item) => {
        return { ...item[1], uid: item[0] }
    })
    if (await createStore(toDoItems)) {
        notify(toDoItems)
    }
}
 
export function deleteToDo(uid) {
    const dbRef = ref(db, `todos/${uid}`)
    set(dbRef, null)
    const store = removeFromStore(uid)
    notify(store)
}

export function updateToDo(updatedToDo) {
    let payload = updatedToDo
    const dbRef = ref(db, `todos/${payload.uid}`)
    update(dbRef, payload)
    const store = updateStore(payload)
    notify(store)
}

export function addToDo(newToDo) {
    const newToDoRef = push(ref(db, 'todos'))
    set(newToDoRef, newToDo)
        .then(() => {
            newToDo.uid = newToDoRef.key
            const store = addToStore(newToDo)
            notify(store)
        })
        .catch(error => {
            console.error("Error adding new to-do item:", error)
        })
        notify(store)
}


