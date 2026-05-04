import { HashLink } from 'react-router-hash-link'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container-fluid">
        <a href="/" className="navbar-brand brand">City Reporter</a>

        <div className="ms-auto nav-links">
          <a href="/#home">Home</a>
          <a href="/#report">Report Issue</a>
          <a href="/#list">Issues</a>
        </div>
      </div>
    </nav>
  );
}

  
export default Navbar;