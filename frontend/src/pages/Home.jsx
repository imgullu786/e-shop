import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import NewArrivals from '../components/NewArrivals'

const Home = () => {
  const [showPopup, setShowPopup] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    // Animate out first, then hide the modal
    setIsVisible(false)
    setTimeout(() => setShowPopup(false), 300) // wait for transition to finish
  }

  useEffect(() => {
    // Optional: auto-close after 15 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 transition-opacity duration-300">
          <div
            className={`bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center transform transition duration-300 ease-out
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
          >
            <p className="text-lg font-medium text-gray-800">
              Please kindly wait 1–2 minutes for the backend to get started.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <Carousel />
      <NewArrivals />
    </div>
  )
}

export default Home
