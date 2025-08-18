import React, { useState, useEffect } from 'react';
// Lucide React Icons - assuming they are available via dependency or CDN for Canvas
// In a real project, you'd install them: npm install lucide-react
import { Car, MapPin, DollarSign, Star, Clock, Bell, User, Phone, CheckCircle, XCircle } from 'lucide-react';

// Main App Component
function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const [incomingRequest, setIncomingRequest] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'earnings', 'ratings', 'account'

  // Simulate incoming ride requests
  useEffect(() => {
    let requestTimer;
    if (isOnline && !activeTrip && !incomingRequest && currentView === 'home') {
      requestTimer = setTimeout(() => {
        setIncomingRequest({
          id: 'REQ' + Math.floor(Math.random() * 10000),
          riderName: 'Jessica L.',
          riderRating: (Math.random() * (5 - 4) + 4).toFixed(1),
          pickup: '123 Main St, Downtown',
          destination: '789 Central Ave, Uptown',
          fare: (Math.random() * (35 - 10) + 10).toFixed(2),
          timeToPickup: Math.floor(Math.random() * (7 - 2) + 2), // minutes away
          distance: (Math.random() * (10 - 2) + 2).toFixed(1), // km/miles
        });
      }, Math.random() * (15000 - 5000) + 5000); // New request every 5-15 seconds
    }
    return () => clearTimeout(requestTimer);
  }, [isOnline, activeTrip, incomingRequest, currentView]);

  // Handle accepting a request
  const acceptRequest = () => {
    if (incomingRequest) {
      setActiveTrip({ ...incomingRequest, status: 'on_way_to_pickup' });
      setIncomingRequest(null);
      setIsOnline(true); // Ensure driver is online if accepting a trip
    }
  };

  // Handle declining a request or dismissing it
  const declineRequest = () => {
    setIncomingRequest(null);
  };

  // Simulate trip progression
  const simulateTripAction = (action) => {
    if (!activeTrip) return;

    let newStatus = activeTrip.status;
    let nextActionText = '';

    switch (action) {
      case 'Arrived at Pickup':
        newStatus = 'at_pickup';
        nextActionText = 'Start Trip';
        break;
      case 'Start Trip':
        newStatus = 'in_progress';
        nextActionText = 'End Trip';
        break;
      case 'End Trip':
        newStatus = 'completed';
        break;
      default:
        break;
    }

    setActiveTrip(prev => ({ ...prev, status: newStatus }));

    if (newStatus === 'completed') {
      // Simulate a small delay before clearing the trip
      setTimeout(() => {
        setActiveTrip(null);
        setIncomingRequest(null);
        // Optionally go offline or stay online based on settings
      }, 1500);
    }
  };

  const getTripActionButtonText = () => {
    if (!activeTrip) return '';
    switch (activeTrip.status) {
      case 'on_way_to_pickup': return 'Arrived at Pickup';
      case 'at_pickup': return 'Start Trip';
      case 'in_progress': return 'End Trip';
      default: return '';
    }
  };

  const RenderHome = () => (
    <>
      {/* Map Placeholder */}
      <div className="w-full h-72 bg-gray-200 rounded-xl flex flex-col items-center justify-center mb-6 overflow-hidden relative shadow-inner">
        <img src="https://placehold.co/800x450/E0E0E0/333333?text=Live+Map+View" alt="Live Map View" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xl font-semibold backdrop-blur-sm">
          {activeTrip ? 'Navigating Trip...' : (isOnline ? 'Waiting for Rides...' : 'Go Online to View Map')}
        </div>
        {activeTrip && (
          <>
            <div className="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-lg text-gray-800 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold">{activeTrip.pickup}</span>
            </div>
            <div className="absolute bottom-4 right-4 p-2 bg-white rounded-lg shadow-lg text-gray-800 flex items-center space-x-2">
              <Car className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">{activeTrip.destination}</span>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-md">
              ${activeTrip.fare}
            </div>
          </>
        )}
      </div>

      {/* Current Trip / Status */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Trip</h2>
        {activeTrip ? (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 flex flex-col shadow-lg space-y-4">
            <div className="flex items-center space-x-4">
              <User className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-full" />
              <div>
                <p className="text-lg font-bold text-blue-800">{activeTrip.riderName} <span className="text-sm font-normal text-gray-600">({activeTrip.riderRating} <Star className="inline-block w-4 h-4 text-yellow-500 fill-current" />)</span></p>
                <p className="text-sm text-gray-600 capitalize">Status: {activeTrip.status.replace(/_/g, ' ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>Pickup: <span className="font-semibold">{activeTrip.pickup}</span></span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Car className="w-5 h-5 text-green-500" />
              <span>Dropoff: <span className="font-semibold">{activeTrip.destination}</span></span>
            </div>
            <button
              onClick={() => simulateTripAction(getTripActionButtonText())}
              className="mt-4 w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105"
            >
              {getTripActionButtonText()}
            </button>
            <div className="flex justify-around mt-4">
              <a href={`tel:${+1234567890}`} className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
                <Phone className="w-6 h-6" />
                <span className="text-xs mt-1">Call Rider</span>
              </a>
              {/* Add message functionality if needed */}
            </div>
          </div>
        ) : (
          <div className={`rounded-xl p-6 text-center ${isOnline ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'} shadow-md`}>
            {isOnline ? (
              <p className="text-xl font-semibold text-green-700 flex items-center justify-center">
                <Clock className="w-6 h-6 mr-2 animate-pulse" />
                Waiting for new ride requests...
              </p>
            ) : (
              <p className="text-xl font-semibold text-orange-700">
                You are offline. Go online to start driving!
              </p>
            )}
          </div>
        )}
      </section>

      {/* Incoming Ride Request Modal */}
      {incomingRequest && !activeTrip && (
        <section className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm transform scale-100 transition-transform duration-300 animate-slide-up relative">
            <div className="absolute top-4 right-4 p-2 bg-yellow-400 rounded-full animate-bounce">
                <Bell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center border-b pb-3">
              <Car className="w-7 h-7 text-indigo-600 mr-2" />
              New Ride Request!
            </h2>
            <div className="text-gray-700 mb-6 space-y-2">
              <p className="font-semibold text-lg flex items-center"><User className="w-5 h-5 mr-2 text-indigo-500" /> {incomingRequest.riderName} <span className="ml-2 text-sm font-normal text-gray-600">({incomingRequest.riderRating} <Star className="inline-block w-4 h-4 text-yellow-500 fill-current" />)</span></p>
              <p className="flex items-center"><Clock className="inline-block w-4 h-4 mr-2 text-gray-500" /> Pickup in {incomingRequest.timeToPickup} mins</p>
              <p className="flex items-center"><MapPin className="inline-block w-4 h-4 mr-2 text-blue-500" /> From: <span className="font-medium">{incomingRequest.pickup}</span></p>
              <p className="flex items-center"><Car className="inline-block w-4 h-4 mr-2 text-green-500" /> To: <span className="font-medium">{incomingRequest.destination}</span></p>
              <p className="font-bold text-2xl text-indigo-700 mt-4 text-center">Est. Fare: <span className="text-green-600">${incomingRequest.fare}</span></p>
            </div>
            <div className="flex justify-between space-x-3">
              <button
                onClick={acceptRequest}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-300 shadow-lg font-semibold flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Accept</span>
              </button>
              <button
                onClick={declineRequest}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300 shadow-lg font-semibold flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <XCircle className="w-5 h-5" />
                <span>Decline</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );

  const RenderEarnings = () => (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Earnings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-5 rounded-lg border border-green-200 flex items-center space-x-4 shadow-sm">
          <DollarSign className="w-10 h-10 text-green-600" />
          <div>
            <p className="text-xl font-semibold text-green-800">Total Earnings (This Week)</p>
            <p className="text-3xl font-bold text-green-900">$345.67</p>
          </div>
        </div>
        <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200 flex items-center space-x-4 shadow-sm">
          <Car className="w-10 h-10 text-indigo-600" />
          <div>
            <p className="text-xl font-semibold text-indigo-800">Total Trips (This Week)</p>
            <p className="text-3xl font-bold text-indigo-900">23</p>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Trip History</h3>
      <ul className="space-y-4">
        {[
          { id: 1, date: 'Aug 17', time: '18:30', fare: '18.50', status: 'Completed', from: 'Main St', to: 'Oak Ave' },
          { id: 2, date: 'Aug 17', time: '17:45', fare: '12.00', status: 'Completed', from: 'Central Park', to: 'Museum' },
          { id: 3, date: 'Aug 16', time: '11:00', fare: '25.75', status: 'Completed', from: 'Airport', to: 'City Center' },
        ].map(trip => (
          <li key={trip.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center shadow-sm border border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">Trip on {trip.date} at {trip.time}</p>
              <p className="text-sm text-gray-600">{trip.from} to {trip.to}</p>
            </div>
            <p className="font-bold text-lg text-green-600">${trip.fare}</p>
          </li>
        ))}
      </ul>
      <button className="mt-8 w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105">
        View Full History
      </button>
    </div>
  );

  const RenderRatings = () => (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Ratings</h2>
      <div className="flex flex-col items-center justify-center bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8 shadow-sm">
        <Star className="w-16 h-16 text-yellow-500 fill-current mb-4" />
        <p className="text-5xl font-bold text-yellow-800">4.9</p>
        <p className="text-xl text-gray-700 mt-2">Overall Rating (based on 500+ trips)</p>
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recent Feedback</h3>
      <ul className="space-y-4">
        {[
          { id: 1, rating: 5, comment: 'Great driver, very friendly and efficient!', date: 'Aug 17' },
          { id: 2, rating: 4, comment: 'Good trip, slight delay due to traffic.', date: 'Aug 16' },
          { id: 3, rating: 5, comment: 'Clean car, smooth ride. Highly recommend!', date: 'Aug 15' },
        ].map(feedback => (
          <li key={feedback.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <span className="font-bold text-lg text-yellow-600 mr-2">{feedback.rating} <Star className="inline-block w-5 h-5 text-yellow-500 fill-current" /></span>
              <span className="text-sm text-gray-500">({feedback.date})</span>
            </div>
            <p className="text-gray-700 italic">"{feedback.comment}"</p>
          </li>
        ))}
      </ul>
      <button className="mt-8 w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105">
        View All Feedback
      </button>
    </div>
  );

  const RenderAccount = () => (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <img src="https://placehold.co/100x100/A0A0A0/FFFFFF?text=Driver" alt="Driver Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">John Doe</p>
            <p className="text-md text-gray-600">john.doe@example.com</p>
            <p className="text-md text-gray-600">+1 234 567 8900</p>
            <button className="mt-2 text-indigo-600 hover:underline text-sm font-semibold">Edit Profile</button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Vehicle Information</h3>
          <p className="text-gray-800"><span className="font-medium">Make:</span> Toyota</p>
          <p className="text-gray-800"><span className="font-medium">Model:</span> Camry</p>
          <p className="text-gray-800"><span className="font-medium">License Plate:</span> ABC 123</p>
          <button className="mt-2 text-indigo-600 hover:underline text-sm font-semibold">Update Vehicle</button>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>
          <p className="text-gray-800">Bank Account: **** **** **** 1234</p>
          <p className="text-gray-800">Payout Preference: Weekly</p>
          <button className="mt-2 text-indigo-600 hover:underline text-sm font-semibold">Manage Payouts</button>
        </div>

        <button className="mt-8 w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md transform hover:scale-105">
          Sign Out
        </button>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased flex flex-col items-center pb-20 sm:pb-8">
      {/* Header */}
      <header className="w-full max-w-2xl bg-white shadow-lg rounded-b-xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-gray-800">Driver Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
          <label htmlFor="toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={isOnline}
                onChange={() => setIsOnline(!isOnline)}
                disabled={!!activeTrip} // Disable toggle if on a trip
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full shadow-inner"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isOnline ? 'translate-x-full bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
              Go {isOnline ? 'Offline' : 'Online'}
            </div>
          </label>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        {currentView === 'home' && <RenderHome />}
        {currentView === 'earnings' && <RenderEarnings />}
        {currentView === 'ratings' && <RenderRatings />}
        {currentView === 'account' && <RenderAccount />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-20">
        <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-4">
          <button
            className={`flex flex-col items-center text-sm font-medium p-2 rounded-lg ${currentView === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('home')}
          >
            <Car className="w-6 h-6 mb-1" />
            <span>Drive</span>
          </button>
          <button
            className={`flex flex-col items-center text-sm font-medium p-2 rounded-lg ${currentView === 'earnings' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('earnings')}
          >
            <DollarSign className="w-6 h-6 mb-1" />
            <span>Earnings</span>
          </button>
          <button
            className={`flex flex-col items-center text-sm font-medium p-2 rounded-lg ${currentView === 'ratings' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('ratings')}
          >
            <Star className="w-6 h-6 mb-1" />
            <span>Ratings</span>
          </button>
          <button
            className={`flex flex-col items-center text-sm font-medium p-2 rounded-lg ${currentView === 'account' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('account')}
          >
            <User className="w-6 h-6 mb-1" />
            <span>Account</span>
          </button>
        </div>
      </nav>

      {/* Add custom Tailwind CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
        .animate-bounce {
            animation: bounce 1s infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
            50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
      `}</style>
    </div>
  );
}

export default App;
