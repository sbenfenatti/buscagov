import React from 'react';
import { ParliamentIcon } from './IconComponents';

interface HeaderProps {
  page: 'main' | 'senate' | 'chamber';
}

const Header: React.FC<HeaderProps> = ({ page }) => {
  return (
    <header className="fixed-header">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
                <ParliamentIcon className="h-8 w-8 text-white mr-3" />
                <h1 className="text-2xl font-bold text-white">Dados Abertos</h1>
            </div>
            
            {page === 'main' && (
                 <div className="hidden md:flex items-center space-x-6">
                    <a href="#home" className="text-white hover:text-blue-300 transition-colors">Início</a>
                    <a href="#parliament" className="text-white hover:text-blue-300 transition-colors">O Parlamento</a>
                </div>
            )}
        </nav>
    </header>
  );
};

export default Header;