import Card from "./components/Card";
import Cards from "./components/Cards";
import CategoryGrid from "./components/CategoryGrid";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
     <Navbar/>
     <Header/>
     <CategoryGrid/>
     <Cards/>
     <Features/>
     <Footer/>
    </div>
  );
}
