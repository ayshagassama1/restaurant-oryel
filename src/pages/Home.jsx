import Banner from '../components/restaurant/Banner';
import Navbar from '../components/restaurant/Navbar';
import Hero from '../components/restaurant/Hero';
import MenuSection from '../components/restaurant/MenuSection';
import ReservationForm from '../components/restaurant/ReservationForm';
import ReviewsSection from '../components/restaurant/ReviewsSection';
import AboutSection from '../components/restaurant/AboutSection';
import ContactFooter from '../components/restaurant/ContactFooter';
import ChatBot from '../components/restaurant/ChatBot'; 
import HighlightsSection from '../components/restaurant/HighlightsSection';
import InstagramSection from '../components/restaurant/InstagramSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <Navbar />
      <Hero />
      <MenuSection />
      <HighlightsSection />
      <ReservationForm />
      <ReviewsSection />
      <InstagramSection />
      <AboutSection />
      <ContactFooter />
      <ChatBot />
    </div>
  );
}
