import Link from "next/link";
import { Navbar } from "react-bootstrap";
import { MdOutlineEmail, MdOutlineCall } from "react-icons/md";
import AuthButton from "./AuthButton" ; 
import { useState, useEffect } from 'react';
import Image from "next/image";


let message = "           Welcome guest" ; 
//let username = localStorage.getItem('username');
//console.log( "Found username " + username ) ; 

const Header = ({username}) => {

  //const usr = "Guest" ; 
  var userMessage = ""; 
  if ( username == "" ) { 
   userMessage = "Wecome Guest" ;
  } 
  else  userMessage = "Welcome " + username ; 



  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
      setIsLogged(!!localStorage.getItem('jwt'));
  }, []);

  console.log ( "username in headers is " + username)
  return (
    <div className="header">
      <div className="container">
        <Navbar className="p-0" bg="none" expand="lg">
        
          <a>
              <Image src="/fitfreaks_logo.jpg" alt="FitFreaks Logo" width={150} height={50} />
            </a>

      
          <Navbar.Toggle
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="togler-icon-inner">
              <span className="line-1"></span>
              <span className="line-2"></span>
              <span className="line-3"></span>
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse
            className="collapse navbar-collapse main-menu pg-scroll justify-content-center float-root"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/events">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/blogs">
                  Blogs
                </Link>
              </li>
             
              <li className="nav-item">
                <Link className="nav-link" href="/groups">
                  Groups
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/coaches">
                  Coaches
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  Contact
                </Link>
              </li>
             
            
                    {!isLogged && ( 
                        <li className="nav-item">
                            <Link className="nav-link"href="/auth/register">
                                Register
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        {!isLogged ? (
                        
                          
                          <Link className="nav-link" href="/auth/login">
                                Login
                            </Link>
                        ) : (
                            <Link className="nav-link" href="/auth/logout">
                                Logout
                            </Link>
                        )}
                    </li>
                    <li className="nav-item">
                     
                    </li>
            
              
            </ul>
           
            
            

           

          </Navbar.Collapse>

         
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
