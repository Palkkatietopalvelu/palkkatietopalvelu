// (Alareuna)
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Footer = () => {
  const [linkColor, setLinkColor] = useState('white')

  const footerStyle = {
    position: 'relative',
    marginTop:"50vh"
  }

  const textStyle = {
    paddingLeft: '80px',
    paddingRight: '160px',
    fontWeight: 'bold',
    color: 'white'
  }

  const containerStyle = {
    position: 'absolute',
    paddingTop: "70px",
    backgroundColor: '#055e05'
    //backgroundColor: 'rgb(13, 177, 13)'
  }

  const handleMouseOver = (event) => {
    event.persist()
    setLinkColor(event.target.style.color)
    event.target.style.color = 'purple'
  }

  const handleMouseOut = (event) => {
    event.persist()
    event.target.style.color = linkColor
  }

  return (
    <div>
        <footer class="footer" style={footerStyle}>
            <div class="container" style={containerStyle}>
        <section class="text-center p-5">
          <div class="col-md-20">
            <NavLink style={textStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/privacypolicy">TIETOSUOJASELOSTE</NavLink>
            <NavLink style={textStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/instructions">OHJEET</NavLink>
          </div>
        </section>
          <br/>

      <hr class="my-1" />

            <div class="text-center p-3" style={textStyle}>
            &copy; 2024 Reilu Hallinto Oy
            </div>
    </div>
        </footer>
    </div>
  );
};

export default Footer