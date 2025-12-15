'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navbar.css';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Galería', href: '/galeria' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        LujavWeb
      </Link>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
