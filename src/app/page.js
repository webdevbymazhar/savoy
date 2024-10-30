import Card from "./components/Card";
import Cards from "./components/Cards";
import CategoryGrid from "./components/CategoryGrid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
     <Navbar/>
     <Header/>
     <CategoryGrid/>
      <h2 className="text-center text-3xl md:text-4xl mt-10 md:mt-20 mb-20 md:mb-10 ">Our <span className="text-[#464648] border-b-2 border-black">Products</span></h2>
     <Cards/>
     <Footer/>
    </div>
  );
}
