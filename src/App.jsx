
import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './templates/Home';
import Single from './templates/Single';

import './scss/style.scss';

function App() {
 

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
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/'>About</NavLink></li>
            <li><NavLink to='/'>Works</NavLink></li>
            <li><NavLink to='/'>Contact</NavLink></li>
          </ul>
        </nav>
        <p className="copyright">©2024 Matthew Lew </p>
      </footer>
    </>
  );
}

export default App;