import { Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './templates/Home';
import Single from './templates/Single';

import './scss/style.scss';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header id="masthead" className="site-header">
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<Single />} />
        </Routes>
      </main>
      <footer>
        <nav className="site-navigation">
          <ul>
            {isHomePage ? (
              <>
                <li><a href="#home"><img src='/src/images/home.svg'/>Home</a></li>
                <li><a href="#about"><img src='/src/images/about.svg'/>About</a></li>
                <li><a href="#work"><img src='/src/images/works.svg'/>Works</a></li>
                <li id='contact'><a href="#contact"><img src='/src/images/mail.svg' id='mail'/>Contact</a></li>
              </>
            ) : (
              <>
                <li><Link to='/#home'>Home</Link></li>
                <li><Link to='/#about'>About</Link></li>
                <li><Link to='/#work'>Works</Link></li>
                <li><Link to='/#contact'>Contact</Link></li>
              </>
            )}
          </ul>
        </nav>
        <p className="copyright">©2024 Matthew Lew </p>
      </footer>
    </>
  );
}

export default App;