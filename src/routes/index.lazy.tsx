import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Users, Clock } from "lucide-react";
import { LoginDialog } from "../components/LoginDialog";
import { UserMenu } from "../components/UserMenu";
import { useAuthStore } from "../store/authStore";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t("app.welcome")}</h1>
            <p className="text-lg text-muted-foreground">{t("app.title")}</p>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? <UserMenu /> : <LoginDialog />}
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => changeLanguage("en")}
            variant={i18n.language === "en" ? "default" : "outline"}
          >
            English
          </Button>
          <Button
            onClick={() => changeLanguage("uk")}
            variant={i18n.language === "uk" ? "default" : "outline"}
          >
            Українська
          </Button>
        </div>

        <Separator className="my-8" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          shadcn/ui Components Demo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Calendar className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>
                Schedule your appointments with just a few clicks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Our intuitive booking system makes it easy to manage your
                reservations.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Manage Clients</CardTitle>
              <CardDescription>
                Keep track of all your client information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Centralized dashboard for managing all your customer
                relationships.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Clients
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Time Tracking</CardTitle>
              <CardDescription>
                Monitor appointments and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Real-time schedule updates and availability management.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                View Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <ComponentsDemo />
      </div>
    </div>
  );
}

function ComponentsDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">More Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dialog & Form Demo</CardTitle>
              <CardDescription>
                Click to see a dialog with form inputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DialogDemo />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dropdown Menu Demo</CardTitle>
              <CardDescription>Click to see a dropdown menu</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenuDemo />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox Demo</CardTitle>
              <CardDescription>Interactive checkbox with label</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              {checked && (
                <p className="text-sm text-green-600">✓ Terms accepted!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Demo</CardTitle>
              <CardDescription>Choose from dropdown options</CardDescription>
            </CardHeader>
            <CardContent>
              <SelectDemo />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Booking</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Calendar className="mr-2 h-4 w-4" />
          <span>Bookings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Clock className="mr-2 h-4 w-4" />
          <span>Schedule</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SelectDemo() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="haircut">Haircut</SelectItem>
        <SelectItem value="massage">Massage</SelectItem>
        <SelectItem value="manicure">Manicure</SelectItem>
        <SelectItem value="facial">Facial</SelectItem>
        <SelectItem value="consultation">Consultation</SelectItem>
      </SelectContent>
    </Select>
  );
}
