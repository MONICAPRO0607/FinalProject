import Countdown from '../../components/CountDown/countDown';
import './Home.css';

export default function Home() {
  return (
    <div className="page home">
     
      <h1>Paula y Quique</h1>
      <p>Nos casamos el 5 de Septiembre de 2026</p>
      <div className="sections-preview">
        <p>Descubre nuestra historia, el evento, los invitados, regalos y más.</p>
         <Countdown />
      </div>
    </div>
  );
}