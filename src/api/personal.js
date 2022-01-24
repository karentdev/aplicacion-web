import {API} from './index'

export async function actualizarPersonal(body){
  const url = `${API}/personal/actualizar`

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

export async function eliminarPersonal(id){
  const url = `${API}/personal/${id}`

  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}

export async function leerPersonal(){
  const url = `${API}/personal`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}