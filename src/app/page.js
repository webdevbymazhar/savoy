import BlogCard from "./components/BlogCard";
import Blogs from "./components/Blogs";
import Card from "./components/Card";
import Cards from "./components/Cards";
import CategoryGrid from "./components/CategoryGrid";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ShopMoreBtn from "./components/ShopBtn";

export default function Home() {
  return (
    <div>
     <Navbar/>
     <Header/>
     <CategoryGrid/>
     <Cards/>
     <ShopMoreBtn title={"Shop More"}/>
     <Blogs/>
     <ShopMoreBtn  title={"Read More"}/>
     <Features/>
     <Footer/>
    </div>
  );
}
