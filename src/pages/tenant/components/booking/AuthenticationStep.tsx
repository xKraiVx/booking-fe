import { useState, useEffect } from "react";
import { Button } from "@/common/components/ui/button/button";
import { Input } from "@/common/components/ui/input/input";
import { Label } from "@/common/components/ui/label/label";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "@/lib/config";
import { login, register } from "@/repos/auth/auth.repo";
import { useAuthStore } from "@/store/authStore";
import { createBooking } from "@/repos/booking/booking.repo";
import Cookies from "js-cookie";

export interface BookingData {
  serviceId?: string;
  serviceName?: string;
  masterId?: string;
  masterName?: string;
  startTime?: string;
  endTime?: string;
  reservationId?: string;
}

interface AuthenticationStepProps {
  businessSettingsId: string;
  bookingData: BookingData;
  onAuthComplete: () => void;
}

export default function AuthenticationStep({
  businessSettingsId,
  bookingData,
  onAuthComplete,
}: AuthenticationStepProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<string>("whatsapp");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  // If user becomes authenticated, complete the booking
  useEffect(() => {
    if (user && bookingData.serviceId && bookingData.masterId) {
      completeBooking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, bookingData.serviceId, bookingData.masterId]);

  const completeBooking = async () => {
    if (
      !bookingData.serviceId ||
      !bookingData.masterId ||
      !bookingData.startTime ||
      !bookingData.endTime
    ) {
      setError("Missing booking information");
      return;
    }

    try {
      setIsLoading(true);
      await createBooking({
        businessSettingsId,
        interventionId: bookingData.serviceId,
        masterId: bookingData.masterId,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        reservationId: bookingData.reservationId,
      });

      onAuthComplete();
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to complete booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    // Store booking data in sessionStorage before redirecting
    sessionStorage.setItem("pendingBooking", JSON.stringify({
      businessSettingsId,
      ...bookingData,
    }));

    const url = provider === "google" ? GOOGLE_AUTH_URL : FACEBOOK_AUTH_URL;
    window.location.href = url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let response;
      if (mode === "login") {
        response = await login({ email, password });
      } else {
        // For new users, include phone and preferred contact
        response = await register({
          email,
          password,
          firstName,
          lastName,
        });
      }

      // Store token
      Cookies.set("auth_token", response.access_token, { expires: 7 });
      
      // Note: We need to fetch user profile after login
      // For now, trigger a page reload or fetch profile separately
      window.location.reload();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
  };

  const contactMethods = [
    { value: "call", label: "Phone Call" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "telegram", label: "Telegram" },
    { value: "facebook", label: "Facebook Messenger" },
    { value: "instagram", label: "Instagram DM" },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold mb-2">
          {mode === "login" ? "Sign in to complete your booking" : "Create an account"}
        </h3>
        <p className="text-sm text-gray-600">
          {mode === "login"
            ? "Sign in to confirm your appointment"
            : "Fill in your details to create an account and complete booking"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <div className="grid grid-cols-2 gap-2">
                {contactMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPreferredContact(method.value)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      preferredContact === method.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    disabled={isLoading}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={8}
          />
          {mode === "register" && (
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, and
              number/special character
            </p>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? "Please wait..."
            : mode === "login"
              ? "Sign In & Book"
              : "Create Account & Book"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          onClick={() => handleSocialLogin("google")}
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          type="button"
          onClick={() => handleSocialLogin("facebook")}
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </Button>
      </div>

      <div className="text-center text-sm mt-4">
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-600 hover:underline"
          disabled={isLoading}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
