import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Travel Enthusiast",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Pathify made planning our honeymoon so easy! We found the perfect package at a great price, and everything was perfectly organized. The customer service was exceptional when we needed to make a last-minute change to our itinerary.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Traveler",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "As someone who travels frequently for work, I appreciate how Pathify streamlines the booking process. Their mobile app is intuitive, and I can easily track all my bookings in one place. Highly recommended for business travelers!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Vacationer",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Planning a family vacation with three kids used to be stressful until we found Pathify. Their family packages are well thought out, and the customer support team was incredibly helpful with accommodating our special requests.",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Don't just take our word for it - hear from some of our satisfied customers
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="text-left">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

