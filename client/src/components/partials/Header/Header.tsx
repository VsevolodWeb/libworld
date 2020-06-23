import React from "react"
import {NavLink} from "react-router-dom"
import s from "./Header.module.sass"
import logo from "./logo.svg"

const Header: React.FC = () => {
    return <header className={s.wrapper}>
                <div className="container">
                    <div className={s.inner}>
                        <div>
                            <NavLink to="/">
                                <img src={logo} alt="LibWorld"/>
                            </NavLink>
                        </div>
                        <ul className={s.menu}>
                            <li>
                                <NavLink exact to="/" className={s.menu__link}>Главная</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin" className={s.menu__link}>Админ. панель</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
}

export default Header