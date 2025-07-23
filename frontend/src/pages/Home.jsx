import React from 'react'
import Carousel from '../components/Carousel'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestCollection />
      <OurPolicy />
    </div>
  )
}

export default Home