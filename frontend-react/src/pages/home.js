import React from 'react'
import ProtectedRoute from '../components/protectedRouts'
import Section1 from '../homeSection/section1'
import Section2 from '../homeSection/section2'
import Section3 from '../homeSection/section3'
import Section4 from '../homeSection/section4'
import Section5 from '../homeSection/section5'
import Section6 from '../homeSection/section6'
import Section7 from '../homeSection/section7'
import Section8 from '../homeSection/section8'
import Section9 from '../homeSection/section9'

const Home = () => {
  return (
    <ProtectedRoute>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
    </ProtectedRoute>
  )
}

export default Home