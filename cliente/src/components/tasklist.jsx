import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api"
import { TaskCard } from "./taskcard";

export function Tasklist(){

{/*crea un estado llamado tasks y una función para actualizarlo llamada setTasks. Inicializa tasks con un arreglo vacío.*/}
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks(){
            {/*Obiene los datos de la api */}
            const res =  await getAllTasks()

            {/*Acualiza el estado task con los datos obtenidos */}

            setTasks(res.data)
        }
        loadTasks()
    },[]);
    
    return (
    <div className="grid grid-cols-3 gap-3">
        {tasks.map(task =>(
            <TaskCard key={task.id} task={task}/>
        ))}
    </div>
    );
    
}
