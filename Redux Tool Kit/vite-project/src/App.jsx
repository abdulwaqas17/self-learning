import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import MobileList from './components/MobileList'
import AddMobile from './components/AddMobile'
import { 
  ShoppingBagIcon, 
  PlusCircleIcon,
  DevicePhoneMobileIcon 
} from '@heroicons/react/24/outline'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
          {/* Navigation */}
          <nav className="bg-white shadow-xl border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <DevicePhoneMobileIcon className="h-8 w-8 text-indigo-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    MobileStore
                  </span>
                </div>
                
                <div className="flex items-center space-x-6">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
                  >
                    <ShoppingBagIcon className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
                    <span className="font-medium text-gray-700 group-hover:text-indigo-600">Inventory</span>
                  </Link>
                  
                  <Link 
                    to="/add" 
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Add Mobile</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<MobileList />} />
              <Route path="/add" element={<AddMobile />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"></div>
                  <span className="text-lg font-semibold text-gray-900">MobileStore Pro</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Built with React, Redux Toolkit & Tailwind CSS
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  )
}

export default App