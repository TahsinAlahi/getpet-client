import AboutUs from "../components/AboutUs";
import CallToAction from "../components/CallToAction";
import CategoryCards from "../components/CategoryCards";
import CountrySection from "../components/CountrySection";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";

function Homepage() {
  return (
    <div className="space-y-16 max-w-screen-xl mx-auto">
      <Header />
      <CategoryCards />
      <CallToAction />
      <AboutUs />
      <CountrySection />
      <Newsletter />
    </div>
  );
}

export default Homepage;
