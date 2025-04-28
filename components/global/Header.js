import Link from "next/link";
import { Navbar } from "react-bootstrap";
import { MdOutlineEmail, MdOutlineCall } from "react-icons/md";
import AuthButton from "./AuthButton" ; 
import { useState, useEffect } from 'react';
import Image from "next/image";
import { API_URL } from "../../config";

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
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      const userEmail = localStorage.getItem('userEmail');
      setIsLogged(!!token);
      console.log('Auth check - Token:', !!token, 'Email:', userEmail);

      if (token && userEmail) {
        try {
          const response = await fetch(`${API_URL}/api/fitfreaks-users?filters[email]=${encodeURIComponent(userEmail)}&populate=*`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('API Response:', response);
          if (response.ok) {
            const userData = await response.json();
            console.log('Full API Response:', userData);
            console.log('User data array:', userData.data);
            console.log('First user:', userData.data?.[0]);
            console.log('User attributes:', userData.data?.[0]?.attributes);
            const role = userData.data?.[0]?.attributes?.role;
            console.log('Detected role:', role);
            
            setUserRole(role || '');
            console.log('Set userRole to:', role);
          } else {
            console.error('API Response not OK:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    checkAuth();
  }, []);

  console.log ( "username in headers is " + username)
  console.log('Current role state:', userRole);
  return (
    <div className="header">
      <div className="container">
        <Navbar className="p-0" bg="none" expand="lg">
        
          <a>
              <Image src="/fitfreaks_logo_new.jpg" alt="FitFreaks Logo" width={150} height={50} />
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
                <Link className="nav-link" href="/about">
                  About
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
                <Link className="nav-link" href="/groups2">
                  Groups
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/coachCategories">
                  Coaches
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  Contact
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" href="/auth/garminConnect">
                  Garmin
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="/ecommerce">
                  Store
                </Link>
              </li>
              {console.log('Menu render - isLogged:', isLogged, 'userRole:', userRole)}
              {isLogged && (userRole === 'event_organiser' || userRole === 'platform_admin') && (
                <li className="nav-item">
                  <Link className="nav-link" href="/manage">
                    Content
                  </Link>
                </li>
              )}
            
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
                    <li className="nav-link">
                   
                    {!isLogged ? (
                      <span className="guest-text">Guest </span>
                    ):(
                      <span className="user-text">{username} </span>
                    )}

                    
                    </li>
            
              
            </ul>
           
            
            

           

          </Navbar.Collapse>

         
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
