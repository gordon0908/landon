import React, { useState, useEffect } from "react";
// import menu_links from './data/menu_links.json';

const Header = () => {
    const [menus, setMenus] = useState([]);

    const loadData = async () => {
        const data = await fetch("https://ihinej66mg.execute-api.us-east-1.amazonaws.com/Production/menulinks");
        const jsonData = await data.json();
        setMenus(jsonData);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <header id="intro">
          <article className="fullheight">
            <div className="hgroup">
              <h1>Landon Hotel</h1>
              <h2>West London</h2>
              <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow"/></a></p>
            </div>
          </article>

          <nav id="nav">
            <div className="navbar">
              <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
              <ul>
                  {menus.map((link, index) => <li key={index}><a className={`class ${link.class}`} href={link.href}><span>{link.text}</span></a></li>)}
              </ul>
            </div>
          </nav>
        </header>

    );
};

export default Header;