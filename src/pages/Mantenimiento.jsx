import { useState, useEffect } from 'react'
import {
  actualizarMantenimiento,
  leerMantenimiento,
  listarTransacciones
} from '../api/mantenimiento'

const datos = {
  iglesia_id: '',
  mantenimiento_id: '',
  rmantenimiento_valor: '',
  rmantenimiento_fecha: ''
}

export function Mantenimiento(){
  const [dataEstado, setDataEstado] = useState([])
  const [dataTransacciones, setDataTransacciones] = useState([])
  const [reload, setReload] = useState(false)
  const [form, setForm] = useState(datos)

  const enviarFormulario = async () =>{
    const respuesta = await actualizarMantenimiento(form)
    alert(respuesta.mensaje)
    setReload(!reload)
    setForm(datos)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.iglesia_id || !form.mantenimiento_id || !form.rmantenimiento_valor || !form.rmantenimiento_fecha) {
      alert('¡Llena todos los campos, por favor!')
      return
    }else{
      enviarFormulario()
    }
  }

  useEffect(function(){
    leerMantenimiento().then(r => setDataEstado(r))
    listarTransacciones().then(t => setDataTransacciones(t))
  }, [reload])

  return(
    <>
    <h1 className='titulo'>Mantenimiento</h1>
      <div className='mb-30'>
        <form onSubmit={handleSubmit}>
          <div className='select'>

              <label htmlFor="id4">Mantenimiento id: </label> 
              <input type="number" name="mantenimiento_id" id="id4"
              onChange={handleChange} value={form.mantenimiento_id} className='ingreso w-20'/>  

              <label htmlFor="id" className='p-20'>Iglesia id: </label> 
              <input type="number" name="iglesia_id" id="id"
              onChange={handleChange} value={form.iglesia_id} className='ingreso w-20'/>

              <label htmlFor="id2" className='p-20'>Pago: </label> 
              <input type="number" name="rmantenimiento_valor" id="id2"
              onChange={handleChange} value={form.rmantenimiento_valor} className='ingreso w-20'/>

              <label htmlFor="id3" className='p-20'>Fecha: </label> 
              <input type="date" name="rmantenimiento_fecha" id="id3"
              onChange={handleChange} value={form.rmantenimiento_fecha} className='ingreso'/>

              <input type="submit" value="Generar transacción" className='enviar p-20'/>
          </div>
        </form>

      </div>
      <div className='flex-entregas'>
        <div>
          <h2 className='subtitulo'>Transacciones</h2>
          <table className='c-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Tipo mantenimiento</th>
                <th>Costo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
            {
              dataTransacciones.map((t) => {
                return(
                  <tr key={t.iglesia_id}>
                    <td>{t.iglesia_id}</td>
                    <td>{t.iglesia_nombre}</td>
                    <td>{t.iglesia_estado}</td>
                    <td>{t.mantenimiento_tipo}</td>
                    <td>{t.mantenimiento_costo}</td>
                    <td>{t.rmantenimiento_fecha.slice(0, 10)}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div>
          <h2 className='subtitulo'>Mantenimiento</h2>
          <table className='c-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Iglesia id</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
            {
              dataEstado.map((e) => {
                return(
                  <tr key={e.mantenimiento_id}>
                    <td>{e.mantenimiento_id}</td>
                    <td>{e.iglesia_id}</td>
                    <td>{e.iglesia_estado}</td>
                    <td>{e.mantenimiento_tipo}</td>
                    <td>{e.mantenimiento_costo}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}