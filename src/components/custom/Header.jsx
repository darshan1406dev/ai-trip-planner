import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // ⬅️ NEW IMPORT

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation(); // ⬅️ GET CURRENT ROUTE
  const isLandingPage = location.pathname === '/'; // ⬅️ CHECK IF LANDING PAGE

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log('User data:', user?.picture);
  }, []);

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Login Successful');
        setOpenDialog(false);
        window.location.reload();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      GetUserProfile(credentialResponse);
    },
    onError: (error) => {
      console.log('Login Failed: ', error);
    },
  });

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 px-6 py-3 flex justify-between items-center transition-all duration-300 ${
          isLandingPage
            ? 'bg-transparent text-white backdrop-blur-sm'
            : 'bg-white text-black shadow-md'
        }`}
      >
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" />

        {/* Right section */}
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/create-trip">
                <Button
                  variant="outline"
                  className={`rounded-full ${
                    isLandingPage
                      ? 'text-black bg-white'
                      : 'text-black bg-gray-100'
                  } hover:scale-105 transition-all cursor-pointer`}
                >
                  Create Trip
                </Button>
              </a>

              <a href="/my-trips">
                <Button
                  variant="outline"
                  className={`rounded-full ${
                    isLandingPage
                      ? 'text-black bg-white'
                      : 'text-black bg-gray-100'
                  } hover:scale-105 transition-all cursor-pointer`}
                >
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    alt="User Profile"
                    className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    onClick={() => {
                      googleLogout();
                      localStorage.removeItem('user');
                      window.location.reload();
                    }}
                    className="cursor-pointer hover:text-red-700"
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Sign in with Google</DialogTitle>
            <DialogDescription className="text-center">
              <img src="/logo.svg" alt="Logo" className="mx-auto mb-4" />
              <p className="mb-2">Use your Google account to sign in securely</p>
              <Button
                onClick={login}
                className="w-full mt-4 flex gap-3 items-center justify-center"
                variant="outline"
              >
                <FcGoogle className="h-6 w-6" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
