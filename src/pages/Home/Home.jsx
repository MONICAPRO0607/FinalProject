import Countdown from '../../components/CountDown/countDown';

const Home = () => {
  return (
   <div className="home">
     <h1 className="names">Paula y Quique</h1>
   <div className="page home">
      <p>Nos casamos el 5 de Septiembre de 2026</p>
      </div>
      <div className="sections-preview">
        <p>Descubre nuestra historia, el evento, los invitados, regalos y más.</p>
         <Countdown />
      </div>
    </div>
  )
};

export default Home;