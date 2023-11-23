import backgroundImg from './Image/mainimg.jpg';
import './Home.css';

const Home = () => {


    return (
        <>  
        <div className='homepage'>
            <img src={backgroundImg} alt='background'/>
        </div>
        </>
    );
}

export default Home;