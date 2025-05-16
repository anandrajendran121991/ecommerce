import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductList />
    </CartProvider>
  );
}

export default App;
