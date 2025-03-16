import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Updated with Travel Deals</h2>
        <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Subscribe to our newsletter and be the first to know about exclusive deals and travel tips
        </p>
      </div>
      <div className="mx-auto w-full max-w-md space-y-2">
        <form className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="max-w-lg flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-primary-foreground/70">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  )
}

