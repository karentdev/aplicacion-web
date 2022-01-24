import {API} from './index'

export async function actualizarCliente(body){
  const url = `${API}/cliente/actualizar`

  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const response = await request.json()
  return response
}

export async function eliminarCliente(id){
  const url = `${API}/cliente/${id}`

  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}

export async function leerCliente(){
  const url = `${API}/cliente`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}