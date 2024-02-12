import React from 'react'
import { FaGithub } from "react-icons/fa";
import Icon from '../assets/qrcode-icon.webp'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-transparent py-4 px-5" data-bs-theme="white">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img src={Icon} width={150}/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="https://github.com/emidev-arg"><FaGithub size={30}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar