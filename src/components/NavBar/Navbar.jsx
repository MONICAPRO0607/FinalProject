// import { Link } from 'react-router-dom';
// import { Heart, Calendar, Gift, Users, Image as ImageIcon, MessageSquareHeart, Lightbulb } from 'lucide-react';
// import './Navbar.css';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <ul>
//         <li><Link to="/">Inicio</Link></li>
//         <li><Link to="/history"><Heart /> Historia</Link></li>
//         <li><Link to="/event"><Calendar /> Evento</Link></li>
//         <li><Link to="/guests"><Users /> Invitados</Link></li>
//         <li><Link to="/gifts"><Gift /> Regalos</Link></li>
//         <li><Link to="/dedications"><MessageSquareHeart /> Dedicatorias</Link></li>
//         <li><Link to="/ideas"><Lightbulb /> Ideas</Link></li>
//         <li><Link to="/pictures"><ImageIcon /> Galería</Link></li>
//       </ul>
//     </nav>
//   );
// }

import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, Gift, Users, Image as ImageIcon, MessageSquareHeart, Lightbulb, Home as HomeIcon } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Inicio', icon: HomeIcon },
    { path: '/history', label: 'Historia', icon: Heart },
    { path: '/event', label: 'Evento', icon: Calendar },
    { path: '/guests', label: 'Invitados', icon: Users },
    { path: '/gifts', label: 'Regalos', icon: Gift },
    { path: '/dedications', label: 'Dedicatorias', icon: MessageSquareHeart },
    { path: '/ideas', label: 'Ideas', icon: Lightbulb },
    { path: '/pictures', label: 'Galería', icon: ImageIcon },
  ];

  return (
    <nav className="navbar">
      <ul>
        {links.map(({ path, label, icon: Icon }) => (
          <li key={path} className={location.pathname === path ? 'active' : ''}>
            <Link to={path}>
              <Icon className="icon" /> {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}