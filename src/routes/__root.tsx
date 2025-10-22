import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from '@/components/ui/button/button'
import { Separator } from '@/components/ui/separator'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-2xl font-bold">
                Booking App
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex gap-2">
                <Link to="/">
                  {({ isActive }: { isActive: boolean }) => (
                    <Button variant={isActive ? 'default' : 'ghost'}>
                      Home
                    </Button>
                  )}
                </Link>
                <Link to="/about">
                  {({ isActive }: { isActive: boolean }) => (
                    <Button variant={isActive ? 'default' : 'ghost'}>
                      About
                    </Button>
                  )}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Booking App. Built with React, TanStack Router, and shadcn/ui.</p>
        </div>
      </footer>
      
      <TanStackRouterDevtools />
    </div>
  )
}
