
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-meta-700 to-accent-600 bg-clip-text text-transparent">
                Meta
              </span>
              <span className="ml-1 text-sm text-gray-500 hidden sm:inline-block">
                Educação
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              Início
            </Link>
            <Link to="/sobre" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              Sobre Nós
            </Link>
            <Link to="/como-funciona" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              Como Funciona
            </Link>
            <Link to="/curriculo" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              Currículo
            </Link>
            <Link to="/depoimentos" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              Depoimentos
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              FAQ
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-meta-600 px-3 py-2 text-sm font-medium">
              Contato
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Entrar
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button size="sm">
                Começar Agora
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-meta-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-meta-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              to="/como-funciona"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              to="/curriculo"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Currículo
            </Link>
            <Link
              to="/depoimentos"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Depoimentos
            </Link>
            <Link
              to="/faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contato"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Contato
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col gap-2 px-4">
            <Link
              to="/login"
              className="block text-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Entrar
            </Link>
            <Link
              to="/cadastro"
              className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-meta-600 rounded-md hover:bg-meta-700"
              onClick={() => setIsOpen(false)}
            >
              Começar Agora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
