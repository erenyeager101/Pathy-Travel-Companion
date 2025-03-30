import { Plane } from "lucide-react"

export default function HeroSection() {
  return (
    <div
      className="relative w-full h-[600px] bg-slate-600 bg-opacity-70 bg-blend-overlay"
      style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Text content aligned to the left */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-4">Discover Your Perfect Journey</h1>
          <p className="text-white mb-8">
            Explore the world with Pathify. Find and book the best deals on flights, hotels, and vacation packages.
          </p>
        </div>

        {/* Search form centered horizontally */}
        <div className="max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button className="flex items-center justify-center px-6 py-3 bg-white border-b-2 border-blue-500 text-blue-500">
              <Plane className="h-4 w-4 mr-2" />
              Flights
            </button>
            <button className="flex items-center justify-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              Hotels
            </button>
            <button className="flex items-center justify-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              Trains
            </button>
            <button className="flex items-center justify-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              Cruises
            </button>
          </div>

          {/* Search form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input type="text" placeholder="City or Airport" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input type="text" placeholder="City or Airport" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
                <input type="text" placeholder="Mar 17 - Mar 24" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <input type="text" value="2 Adults" readOnly className="w-full p-2 border rounded-md" />
              </div>
            </div>

            <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 flex items-center justify-center">
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

