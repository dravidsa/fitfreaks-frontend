import '../assets/sass/main.scss'
import '../styles/customStyles.css'; // Adjust the path if necessary
import '../styles/globals.css'; // If you have other global styles
import '../styles/events.css'; // Add events specific styles
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from '../contexts/CartContext'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}
