import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Code2, Palette, Globe, Zap } from 'lucide-react'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About This Project</h1>
        <p className="text-lg text-muted-foreground mb-8">
          A modern booking application showcasing the best tools in the React ecosystem.
        </p>

        <Separator className="my-8" />

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Code2 className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>React 19 + TypeScript</CardTitle>
                <CardDescription>Latest React with full type safety</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built with React 19 and TypeScript for robust, type-safe development
                  with excellent developer experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>TanStack Router</CardTitle>
                <CardDescription>Type-safe routing solution</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fully type-safe routing with automatic code splitting and
                  excellent performance out of the box.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>i18next</CardTitle>
                <CardDescription>Internationalization support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Multi-language support with automatic language detection.
                  Currently supports English and Ukrainian.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Palette className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>shadcn/ui</CardTitle>
                <CardDescription>Beautiful UI components</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Re-usable components built with Radix UI and Tailwind CSS.
                  Fully customizable and accessible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Type-safe routing with automatic code generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Multi-language support with easy language switching</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Modern UI components from shadcn/ui</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Tailwind CSS for rapid styling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Dark mode support ready</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Fully responsive design</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
