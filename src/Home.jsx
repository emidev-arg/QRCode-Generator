import React, { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import "./styles/Home.css"
import Icon from './assets/qrcode-icon.webp'
import { Grid } from 'react-loader-spinner'

const Home = () => {

  const [text, setText] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])


  const isValidURL = urlString => {
    var patronURL = new RegExp(
          // valida protocolo
          '^(https?:\\/\\/)?'+
          // valida nombre de dominio
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
          // valida OR direccion ip (v4)
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
          // valida puerto y path
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
          // valida queries
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
          // valida fragment locator
      '(\\#[-a-z\\d_]*)?$','i'); 
    return !!patronURL.test(urlString);
  }


  const onSubmit = async (e) => {
    setImage(null)
    e.preventDefault()
    setLoading(true)

    const isValid = isValidURL(text)

    if(!isValid){
      setErrors([{message: "Ingresa una URL válida."}])
      setLoading(false)
      return;
    }

    setErrors([])

    try {
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&data=${text}`, {method: "POST"})

      if(res.status != 200) return setErrors([{message: "Ha ocurrido un error al generar el QR."}])

      console.log(res)

      setLoading(false)
      setImage(res.url)
    } catch (error) {
      console.log(error)
    }
  }

  const onclicked = async () => {
    const response = await fetch("https://api.extract.pics/v0/extractions/", {
      method: "POST",
      mode: 'no-cors',
      headers: new Headers({
        'Authorization': 'Bearer ' + 'G7dAjLI5gtjODHkukCaonYeeGfQqkZETfyQolHBjEA',
        'Content-Type': 'application/json'
      }),
      body: {url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&data=https://discord.com"}
    })

    console.log(response)
  }

  return (
    <>
      <Navbar />

      <main className="home">
        <div className="container-qr">
          <img src={Icon} width={200} />
          <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
            <button type='submit'>Generate</button>
          </form>
          {loading && <Grid visible={true} height="80" width="80" color="#007BFF" wrapperClass="grid-wrapper" />}
          {image != null ? <img className='qr-image' src={image} /> : ""}
          {errors.length > 0 && errors.map((error) => (<span style={{paddingTop: "30px", color: "red", fontSize: "0.9rem"}}>{error.message}</span>))}
          <button onClick={onclicked}>PROBAR NUEVO FETCH</button>
        </div>
      </main>
    </>
  )
}

export default Home