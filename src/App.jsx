import { Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './templates/Home';
import Single from './templates/Single';
import { useMediaQuery } from 'react-responsive';
import './scss/style.scss';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';


  const isMobile = useMediaQuery({ query: '(max-width: 50em)' });

  return (
    <>
      <header id="masthead" className="site-header">
         {/* for media query */}
         <div className="container">
        <div className={`${isMobile ? 'mobile' : 'desktop'} centered-div`}>
        <Link to="/"><img src='/assets/logo.svg' alt='logo' id='logo' /></Link>
        </div>
        </div>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<Single />} />
        </Routes>
      </main>
      <footer>
        <nav className="site-navigation">
        <ul className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
  {isHomePage ? (
    <>
      <li><a href="#home"><img className='nav-icon' src='/assets/home.png' alt="Home" id='home'/>Home</a></li>
      <li><a href="#about"><img className='nav-icon' src='/assets/about.png' alt="About" id='about'/>About</a></li>
      <li><a href="#work"><img className='nav-icon' src='/assets/works.png' alt="Works" id='works'/>Works</a></li>
      <li id='contact'><a href="#contact"><img className='nav-icon' src='/assets/mail.png' alt="Contact" id='mail' />Contact</a></li>
    </>
  ) : (
    <>
      <li><Link to='/#home'><img className='nav-icon' src='/assets/home.png' alt="Home" id='home' />Home</Link></li>
      <li><Link to='/#about'><img className='nav-icon' src='/assets/about.png' alt="About" id='about'/>About</Link></li>
      <li><Link to='/#work'><img className='nav-icon' src='/assets/works.png' alt="Works" id='works'/>Works</Link></li>
      <li><Link to='/#contact'><img className='nav-icon' src='/assets/mail.png' alt="Contact" id='mail' />Contact</Link></li>
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