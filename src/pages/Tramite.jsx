import { useState, useEffect } from 'react'
import {
  actualizarTramite,
  leerTramites,
  listarTransacciones
} from '../api/tramites'

const datos = {
  rtramite_pago: '',
  tramite_id: '',
  cliente_id: '',
  rtramite_fecha: ''
}

export function Tramite(){
  const [dataEstado, setDataEstado] = useState([])
  const [dataTransacciones, setDataTransacciones] = useState([])
  const [reload, setReload] = useState(false)
  const [form, setForm] = useState(datos)

  const enviarFormulario = async () =>{
    const respuesta = await actualizarTramite(form)
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

    if (!form.rtramite_pago || !form.tramite_id || !form.rtramite_fecha || !form.cliente_id) {
      alert('¡Llena todos los campos, por favor!')
      return
    }else{
      enviarFormulario()
    }
  }

  useEffect(function(){
    leerTramites().then(r => setDataEstado(r))
    listarTransacciones().then(t => setDataTransacciones(t))
  }, [reload])

  return(
    <>
    <h1 className='titulo'>Trámite</h1>
      <div className='mb-30'>
        <form onSubmit={handleSubmit}>
          <div className='select'>
              <label htmlFor="id">Trámite id: </label> 
              <input type="number" name="tramite_id" id="id"
              onChange={handleChange} value={form.tramite_id} className='ingreso w-20'/>

              <label htmlFor="id4" className='p-20'>Cliente id: </label> 
              <input type="number" name="cliente_id" id="id4"
              onChange={handleChange} value={form.cliente_id} className='ingreso w-20'/>  

              <label htmlFor="id2" className='p-20'>Trámite pago: </label> 
              <input type="number" name="rtramite_pago" id="id2"
              onChange={handleChange} value={form.rtramite_pago} className='ingreso w-20'/>

              <label htmlFor="id3" className='p-20'>Trámite fecha: </label> 
              <input type="date" name="rtramite_fecha" id="id3"
              onChange={handleChange} value={form.rtramite_fecha} className='ingreso'/>

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
                <th>Cliente id</th>
                <th>Nombres y apellidos</th>
                <th>Trámite</th>
                <th>Tipo</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Pagado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
            {
              dataTransacciones.map((t) => {
                return(
                  <tr key={t.cliente_id}>
                    <td>{t.cliente_id}</td>
                    <td>{t.cliente_fullname}</td>
                    <td>{t.cliente_tramite}</td>
                    <td>{t.tramite_tipo}</td>
                    <td>{t.tramite_costo}</td>
                    <td>{t.tramite_estado}</td>
                    <td>{t.rtramite_pago}</td>
                    <td>{t.rtramite_fecha.slice(0, 10)}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div>
          <h2 className='subtitulo'>Trámites</h2>
          <table className='c-table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Cliente id</th>
                <th>Tipo</th>
                <th>Costo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {
              dataEstado.map((e) => {
                return(
                  <tr key={e.tramite_id}>
                    <td>{e.tramite_id}</td>
                    <td>{e.cliente_id}</td>
                    <td>{e.tramite_tipo}</td>
                    <td>{e.tramite_costo}</td>
                    <td>{e.tramite_estado}</td>
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