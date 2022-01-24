import { useState, useEffect } from 'react'
import {
  leerPersonal,
  actualizarPersonal,
  eliminarPersonal
} from '../api/personal'

const datosIniciales = {
  personal_id: '',
  personal_nombre: '', 
  personal_apellido: '',
  personal_identificacion: '',
  personal_direccion: '', 
  personal_fechanacimiento: '',
  personal_fechaingreso: '',
  personal_telefono: '',
  personal_correo: ''
}

export function Personal() {
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
      !form.personal_id||
      !form.personal_nombre||
      !form.personal_apellido||
      !form.personal_identificacion||
      !form.personal_direccion||
      !form.personal_fechanacimiento||
      !form.personal_fechaingreso||
      !form.personal_telefono||
      !form.personal_correo
    ) {
      alert('¡Llena todos los campos, por favor!')
      return
    }else{
      const actualizacion = async () => {
        const res = await actualizarPersonal(form)
        alert(res.mensaje)
        setReload(!reload)
        setForm(datosIniciales)
      }
      actualizacion()
    }
  }

  useEffect(function(){
    leerPersonal().then(v => setData(v))
  }, [reload])

  return (
    <>
      <div>
        <h1 className='titulo'>Personal</h1>
        <div>
          <h2 className='sub'>Crea o actualiza un personal</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="personal_id" id="id"
              onChange={handleChange} value={form.personal_id} className='ingreso w-20'/>

              <label htmlFor="id3" className='p-20'>Nombres: </label> 
              <input type="text" name="personal_nombre" id="id3"
              onChange={handleChange} value={form.personal_nombre} className='ingreso'/>

              <label htmlFor="id4" className='p-20'>Apellidos: </label> 
              <input type="text" name="personal_apellido" id="id4"
              onChange={handleChange} value={form.personal_apellido} className='ingreso'/>

              <label htmlFor="id2" className='p-20'>Cédula: </label> 
              <input type="number" name="personal_identificacion" id="id2"
              onChange={handleChange} value={form.personal_identificacion} className='ingreso'/>

              <label htmlFor="id43" className='p-20'>Dirección: </label> 
              <input type="text" name="personal_direccion" id="id43"
              onChange={handleChange} value={form.personal_direccion} className='ingreso'/>

              <div className='top-10'>

              <label htmlFor="cantidad42">Fecha nacimiento: </label>
              <input type="date" name="personal_fechanacimiento" id="cantidad42"
              onChange={handleChange} value={form.personal_fechanacimiento} className='ingreso'/>

              <label htmlFor="cantidad41" className='p-20'>Fecha ingreso: </label>
              <input type="date" name="personal_fechaingreso" id="cantidad41"
              onChange={handleChange} value={form.personal_fechaingreso} className='ingreso'/>

              <label htmlFor="cantidad2" className='p-20'>Teléfono: </label>
              <input type="number" name="personal_telefono" id="cantidad2"
              onChange={handleChange} value={form.personal_telefono} className='ingreso'/>

              <label htmlFor="cantidad" className='p-20'>Correo: </label>
              <input type="email" name="personal_correo" id="cantidad"
              onChange={handleChange} value={form.personal_correo} className='ingreso'/>

              <input type="submit" value="Enviar" className='enviar p-20'/>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h2 className='sub'>Listar personal</h2>
          <table className='c-table'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cédula</th>
            <th>Dirección</th>
            <th>Fecha de nacimiento</th>
            <th>Fecha ingreso</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((c) => {
              return(
                <tr key={c.personal_id}>
                  <td>{c.personal_id}</td>
                  <td>{c.personal_nombre}</td>
                  <td>{c.personal_apellido}</td>
                  <td>{c.personal_identificacion}</td>
                  <td>{c.personal_direccion}</td>
                  <td>{c.personal_fechanacimiento.substring(0, 10)}</td>
                  <td>{c.personal_fechaingreso.substring(0, 10)}</td>
                  <td>{c.personal_telefono}</td>
                  <td>{c.personal_correo}</td>
                  <td>
                      <button className='buttone mr-5'
                        onClick={() => {
                          c.personal_fechaingreso = c.personal_fechaingreso.substring(0, 10)
                          c.personal_fechanacimiento = c.personal_fechanacimiento.substring(0, 10)
                          setForm(c)
                        }}
                      >Editar</button>

                      <button className='buttone'
                        onClick={ async () => {
                          const res = await eliminarPersonal(c.personal_id)
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