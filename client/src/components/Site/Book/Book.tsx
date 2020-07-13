import React from 'react'
import cn from 'classnames'
import s from './Book.module.sass'

const Book = () => {
    return (
        <div>
            <div className={s.intro}>
                <div className={s.image}/>
                <div className={s.info}>
                    <div className="title title_lg">Гарри Поттер и Философский камень</div>
                    <ul className={s.options}>
                        <li className={s.options__item}>
                            <b>Жанр:</b> <a className="link" href="!#">Фантастика</a>
                        </li>
                        <li className={s.options__item}>
                            <b>Автор:</b> Дж. Роулинг
                        </li>
                        <li className={s.options__item}>
                            <b>Год:</b> 2000
                        </li>
                        <li className={s.options__item}>
                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                            ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        </li>
                    </ul>
                    <button className={cn("button", "button_primary", s.read)}>Читать</button>
                </div>
            </div>
            <div className={s.text}>
                <h1>Читать книгу Гарри Поттер бесплатно у нас</h1>

            </div>
        </div>
    )
}

export default Book