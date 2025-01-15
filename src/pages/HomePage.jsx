import CallToAction from "../components/CallToAction";
import CategoryCards from "../components/CategoryCards";
import Header from "../components/Header";

function Homepage() {
  return (
    <div className="space-y-16">
      <Header />
      <CategoryCards />
      <CallToAction />
    </div>
  );
}

export default Homepage;
