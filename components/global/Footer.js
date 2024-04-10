/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = ({contactData}) => {
  //const contact_number = contactData.contact_number ; 
  return (
    // <!-- ========== Footer section End ========== -->
    <>
      <div className="footer">
        <div className="container">
          <section className="footer__top">
            <div className="row">
              <div className="footer__top__content">
                <h2>
                  Do you have any question? <br />
                  Feel free to contact us.
                </h2>
                <h2 className="display-4">
                  <Link href="tel:610383766284">+9922955408</Link>
                </h2>
                <Link href="/contact" className="smooth button button__primary" legacyBehavior>
                  <span>Send me a message @ support@fitfreaks.in</span>
                </Link>
              </div>
            </div>
          </section>
          <div className="footer__middle">
            <div className="row">
              <div className="col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0 justify-content-lg-start">
                <Link href="/" legacyBehavior>
                  <h2 className="m-0">FitFreaks</h2>
                </Link>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                <ul className="footer__middle__menu">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/events">Events</Link>
                  </li>
                  <li>
                    <Link href="/blogs">Blog</Link>
                  </li>
                  <li>
                    <Link href="/contact">contact</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 d-flex justify-content-center align-items-center mb-3 mb-lg-0 justify-content-lg-end">
                <ul className="social-icon">
                  <li>
                    <Link href="/" legacyBehavior>
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link href="/" legacyBehavior>
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link href="/" legacyBehavior>
                      <FaYoutube />
                    </Link>
                  </li>
                  <li>
                    <Link href="/" legacyBehavior>
                      <FaWhatsapp />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer__copyright">
            <div className="row">
              <div className="col-12">
                <p className="m-0 text-center">&copy; {new Date().getFullYear()} All right reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/contact-us`);
  const contactData = await res.json();
  console.log ( "got his contact data " + JSON.stringify(contactData));  

  return {
    props: { contactData },
    revalidate: 1,
  };
}

