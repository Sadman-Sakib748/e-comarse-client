
import Advertisements from '../Pages/Advertisements/Advertisements';
import Banner from '../Pages/Banner/Banner';
import Features from '../Pages/Features/Features';
import MarketStats from '../Pages/MarketStats/MarketStats';
import TodayProducts from '../Pages/TodayProducts/TodayProducts';

const Home = () => {
    return (
        <div>
            <Banner />
            <TodayProducts />
            <Advertisements />
            <MarketStats />
            <Features />
        </div>
    );
};

export default Home;