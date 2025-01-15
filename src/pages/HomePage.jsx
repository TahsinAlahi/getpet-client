import AboutUs from "../components/AboutUs";
import CallToAction from "../components/CallToAction";
import CategoryCards from "../components/CategoryCards";
import Header from "../components/Header";

function Homepage() {
  return (
    <div className="space-y-16 max-w-screen-xl mx-auto">
      <Header />
      <CategoryCards />
      <CallToAction />
      <AboutUs />
    </div>
  );
}

export default Homepage;
