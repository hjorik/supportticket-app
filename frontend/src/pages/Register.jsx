import React from 'react';
import { useState } from 'react';
import { FaUser } from "react-icons/fa"

export default function Register() {

    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })

    //Destructure
    const {name, email, password, password2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

  return (
    <>
    <section className="heading">
        <h1>
            <FaUser/> Registrieren
        </h1>
        <p>Bitte erstelle einen Account</p>
    </section>
    <section className="form">
        <form>
            <div className="form-group">
                <input type="text" className="form-controll" id="name" value={name} name='name' onChange={onChange} placeholder='Name'/>
                <input type="email" className="form-controll" id="email" value={email} name='email' onChange={onChange} placeholder='E-Mail'/>
                <input type="password" className="form-controll" id="password" value={password} name='password' onChange={onChange} placeholder='Passwort'/>
                <input type="password" className="form-controll" id="password" value={password2} name='password2' onChange={onChange} placeholder='Passwort wiederholen'/>
            </div>
        </form>
    </section>
    </>
  )
}
