"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-900">
            Level<span className="text-orange-500">Up</span>
          </div>
          <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                Career Launchpad
                <ChevronDown className="ml-1 h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-64 p-4">
                  <p className="text-sm text-gray-600">Career guidance and opportunities</p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Professional Courses
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Healthcare Jobs
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Study Abroad
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
            Log In
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}