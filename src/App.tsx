import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Invoice } from './pages/Invoice'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Catalog />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/factura" element={<Invoice />} />
            <Route
              path="*"
              element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <span className="text-5xl">🌸</span>
                  <h1 className="font-serif text-2xl text-ink">Página no encontrada</h1>
                  <a href="/" className="btn-primary">Volver al inicio</a>
                </div>
              }
            />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}
