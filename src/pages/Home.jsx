import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import KeyFigures from '../components/KeyFigures';
import Localisation from '../components/Localisation';
import Timeline from '../components/Timeline';
import Discover from '../components/Discover';
import NextMatch from '../components/NextMatch';

export default function Home() {
    return (
        <>
            <Hero />
            <Ticker />
            <KeyFigures />
            <Localisation />
            <Timeline />
            <Discover />
            <NextMatch />
        </>
    );
}
