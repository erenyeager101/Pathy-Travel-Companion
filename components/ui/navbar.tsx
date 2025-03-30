"use client"

import Link from "next/link"
import { Plane } from "lucide-react"

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and brand on the left */}
          <div className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <span className="text-xl font-bold">Pathify</span>
          </div>

          {/* Navigation links in the center */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
            <Link href="/flights" className="text-gray-800 hover:text-gray-600">
              Flights
            </Link>
            <Link href="/hotels" className="text-gray-800 hover:text-gray-600">
              Hotels
            </Link>
            <Link href="/packages" className="text-gray-800 hover:text-gray-600">
              Packages
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-600">
              About
            </Link>
          </nav>

          {/* Auth buttons on the right */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-800 hover:text-gray-600">
              Login
            </Link>
            <Link href="/register" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

