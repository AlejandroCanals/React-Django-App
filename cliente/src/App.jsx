import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import {TasksPage} from './pages/TasksPage'
import {TaskFormPage} from './pages/TaskFormPage'
import { Navigation } from './components/navigation'
import {Toaster} from 'react-hot-toast'

function App() {
  return(
    <BrowserRouter>
    <div className='containter mx-auto'>
    <Navigation/>
    
    <Routes>
    <Route path='/' element = {<Navigate to ="/tasks" />}/>
    <Route path='/tasks' element = {<TasksPage/>}/>
    <Route path='/tasks-create' element = {<TaskFormPage/>}/>
    <Route path='/tasks/:id' element = {<TaskFormPage/>}/>

    </Routes>

    <Toaster></Toaster>
    </div>
  
    </BrowserRouter>

  );
}

export default App