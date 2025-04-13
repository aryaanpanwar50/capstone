import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedGames from '../components/FeaturedGames'
import NewReleases from '../components/NewReleases'
import AppCta from '../components/AppCta'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
    <Header></Header>
    <Hero></Hero>
    <Categories></Categories>
    <FeaturedGames></FeaturedGames>
    <NewReleases></NewReleases>
    <AppCta></AppCta>
    <Footer></Footer>
    </>
  )
}

export default Home