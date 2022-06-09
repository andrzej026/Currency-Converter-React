import React from 'react'
import banklogo from '../../../images/banklogo.svg'
import classes from './Navbar.module.css'

const Navbar = ({ headlist }) => {
    return (
        <nav>
            <img src={banklogo} alt="banklogo" />
            <ul className={classes.headlist}>
                {headlist.map((element) => (
                    <li key={element}>{element}</li>
                ))}
            </ul>
            <button className={classes.enterbutton}>Enter</button>
        </nav>
    )
}

export default Navbar
