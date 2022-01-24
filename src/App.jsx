import { Route } from 'wouter'
import { Nav } from './components/Nav'
import { Tramite } from './pages/Tramite'
import { Cliente } from './pages/Cliente'
import { Personal } from './pages/Personal'
import { Mantenimiento } from './pages/Mantenimiento'



function App() {

  return (
    <div>
      <Nav/>
      <div className='App'>
        <Route path='/' component={Tramite}/>
        <Route path='/mantenimiento' component={Mantenimiento}/>
        <Route path='/personal' component={Personal}/>
        <Route path='/cliente' component={Cliente}/>
      </div>
    </div>
  )
}

export default App