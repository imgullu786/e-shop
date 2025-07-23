import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const OurProducts = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const clearFilters = () => {
    setCategory([])
    setSubCategory([])
  }

  const applyFilter = () => {
    let filtered = [...products]

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory))
    }

    setFilterProducts(filtered)
  }

  const sortProduct = () => {
    const sorted = [...filterProducts]
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        applyFilter()
        return
    }
    setFilterProducts(sorted)
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row pt-10 border-t px-4 sm:px-8 lg:px-16 gap-8">
      {/* Filter Sidebar */}
      <aside className="w-full sm:w-64">
        <div className="flex justify-between items-center sm:block">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="text-sm font-semibold flex items-center gap-1 cursor-pointer sm:text-sm"
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              alt=""
              className={`w-4 transition-transform duration-300 sm:hidden ${
                showFilter ? 'rotate-90' : ''
              }`}
            />
          </p>

          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline hidden sm:inline-block cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block mt-4 space-y-5`}>
          {/* Categories */}
          <div className="border border-gray-300 p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-2">CATEGORIES</h4>
            <div className="space-y-2 text-sm text-gray-700">
              {['Men', 'Women', 'Kids'].map((label) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={label}
                    checked={category.includes(label)}
                    onChange={toggleCategory}
                    className="accent-black"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          <div className="border border-gray-300 p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-2">TYPE</h4>
            <div className="space-y-2 text-sm text-gray-700">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((label) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={label}
                    checked={subCategory.includes(label)}
                    onChange={toggleSubCategory}
                    className="accent-black"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Mobile Clear Button */}
          <button
            onClick={clearFilters}
            className="block sm:hidden mt-2 text-sm text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>
      </aside>

      {/* Products Section */}
      <section className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Title text1="OUR" text2="PRODUCTS" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 px-3 py-1 text-sm rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products found.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default OurProducts
