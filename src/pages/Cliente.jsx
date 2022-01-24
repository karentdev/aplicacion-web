import { useState, useEffect } from 'react'
import {
  leerCliente,
  actualizarCliente,
  eliminarCliente
} from '../api/cliente'

const datosIniciales = {
  cliente_id: '',
  cliente_nombre: '', 
  cliente_apellido: '',
  cliente_direccion: '',
  cliente_telefono: '',
  cliente_correo: '',
  cliente_identificador: '',
  cliente_tramite: 'NO'
}

export function Cliente() {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)

  const [form, setForm] = useState(datosIniciales)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !form.cliente_id||
      !form.cliente_nombre||
      !form.cliente_apellido||
      !form.cliente_direccion||
      !form.cliente_telefono||
      !form.cliente_correo||
      !form.cliente_identificador
    ) {
      alert('¡Llena todos los campos, por favor!')
      return
    }else{
      const actualizacion = async () => {
        const res = await actualizarCliente(form)
        alert(res.mensaje)
        setReload(!reload)
        setForm(datosIniciales)
      }
      actualizacion()
    }
  }

  useEffect(function(){
    leerCliente().then(v => setData(v))
  }, [reload])

  return (
    <>
      <div>
        <h1 className='titulo'>Cliente</h1>
        <div>
          <h2 className='sub'>Crea o actualiza un cliente</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="cliente_id" id="id"
              onChange={handleChange} value={form.cliente_id} className='ingreso w-20'/>

              <label htmlFor="id3" className='p-20'>Nombres: </label> 
              <input type="text" name="cliente_nombre" id="id3"
              onChange={handleChange} value={form.cliente_nombre} className='ingreso'/>

              <label htmlFor="id4" className='p-20'>Apellidos: </label> 
              <input type="text" name="cliente_apellido" id="id4"
              onChange={handleChange} value={form.cliente_apellido} className='ingreso'/>

              <label htmlFor="id2" className='p-20'>Cédula: </label> 
              <input type="number" name="cliente_identificador" id="id2"
              onChange={handleChange} value={form.cliente_identificador} className='ingreso'/>

              <div className='top-10'>

              <label htmlFor="id43">Dirección: </label> 
              <input type="text" name="cliente_direccion" id="id43"
              onChange={handleChange} value={form.cliente_direccion} className='ingreso'/>

              <label htmlFor="cantidad2" className='p-20'>Teléfono: </label>
              <input type="number" name="cliente_telefono" id="cantidad2"
              onChange={handleChange} value={form.cliente_telefono} className='ingreso'/>

              <label htmlFor="cantidad" className='p-20'>Correo: </label>
              <input type="email" name="cliente_correo" id="cantidad"
              onChange={handleChange} value={form.cliente_correo} className='ingreso'/>

              <input type="submit" value="Enviar" className='enviar p-20'/>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h2 className='sub'>Listar clientes</h2>
          <table className='c-table'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Cédula</th>
            <th>Trámite</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((c) => {
              return(
                <tr key={c.cliente_id}>
                  <td>{c.cliente_id}</td>
                  <td>{c.cliente_nombre}</td>
                  <td>{c.cliente_apellido}</td>
                  <td>{c.cliente_direccion}</td>
                  <td>{c.cliente_telefono}</td>
                  <td>{c.cliente_correo}</td>
                  <td>{c.cliente_identificador}</td>
                  <td>{c.cliente_tramite}</td>
                  <td>
                      <button className='buttone mr-5'
                        onClick={() => {  
                          setForm(c)
                        }}
                      >Editar</button>

                      <button className='buttone'
                        onClick={ async () => {
                          const res = await eliminarCliente(c.cliente_id)
                          alert(res.mensaje)
                          setReload(!reload)
                        }}
                      >Eliminar</button>
                    </td>
                    
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