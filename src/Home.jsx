import React, { useState } from 'react'

//STYLES
import "./styles/Home.css"

// ICONS - IMAGES
import { IoReload } from "react-icons/io5";
import Icon from './assets/qrcode-icon.webp'

// COMPONENTS
import Navbar from './components/Navbar'
import Select from 'react-select'
import { Grid } from 'react-loader-spinner'

const Home = () => {

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState("png")
  const [errors, setErrors] = useState([])


  const isValidURL = urlString => {
    var patronURL = new RegExp(
      // valida protocolo
      '^(https?:\\/\\/)?' +
      // valida nombre de dominio
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      // valida OR direccion ip (v4)
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      // valida puerto y path
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      // valida queries
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      // valida fragment locator
      '(\\#[-a-z\\d_]*)?$', 'i');
    return !!patronURL.test(urlString);
  }

  const emptyValues = () => {
    setText('')
    setImage(null)
    setErrors([])
  }

  const onSubmit = async (e) => {
    setImage(null)
    e.preventDefault()
    setLoading(true)

    const isValid = isValidURL(text)

    if (!isValid) {
      setErrors([{ message: "Ingresa una URL válida." }])
      setLoading(false)
      return;
    }

    setErrors([])

    try {
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&data=${text}`, { method: "POST" })

      if (res.status != 200) return setErrors([{ message: "Ha ocurrido un error al generar el QR." }])

      setImage(res.url)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const downloadImage = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&data=${text}`, { method: "GET" })

      if (res.status != 200) return setErrors([{ message: "Ha ocurrido un error al obtener el QR." }])

      const responseBlob = await res.blob()
      const url = URL.createObjectURL(responseBlob)

      const a = document.createElement("a")
      a.href = url
      a.download = `qrcode-${text}.${format}`
      a.click()

      a.append()
    } catch (error) {
      console.log(error)
    }
  }

  const optionsSelect = [
    {
      value: "png", label: ".png"
    },
    {
      value: "jpg", label: ".jpg"
    },
    {
      value: "jpeg", label: ".jpeg"
    },
    {
      value: "gif", label: ".gif"
    },
    {
      value: "eps", label: ".eps"
    }
  ]

  return (
    <>
      <Navbar />

      <main className="home">
        <div className="container-qr">
          <div className="image">
            <img src={Icon} width={130} />
            <IoReload size={35} onClick={emptyValues} className='icon'/>
          </div>
          <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
            <button type='submit'>Generar</button>
          </form>
          {loading && <Grid visible={true} height="80" width="80" color="#007BFF" wrapperClass="grid-wrapper" />}
          {image != null ? <img className='qr-image' src={image} /> : ""}
          {errors.length > 0 && errors.map((error) => (<span style={{ paddingTop: "30px", color: "red", fontSize: "0.9rem" }}>{error.message}</span>))}
          {image != null &&
            <div className='container-download'>
              <label>Extensión del archivo*</label>
              <Select options={optionsSelect} onChange={(e) => setFormat(e.value)} className="basic-single" classNamePrefix="select" defaultValue={optionsSelect[0]} />
              <button onClick={downloadImage} className='download-button'>Descargar imagen</button>
            </div>
          }
        </div>
      </main>
    </>
  )
}

export default Home