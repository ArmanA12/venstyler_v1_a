// src/pages/Explore.tsx
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExploreDesktop, ExploreMobile } from "@/components/explore/Explore";
import { BottomNav } from "@/components/navbar/bottomNav";

const ExplorePage: FC = () => {
  const [items, setItems] = useState<UserCard[]>([]);

  useEffect(() => {
    // TODO: replace with real API fetch
    const mockData: UserCard[] = [
      {
        id: "1",
        name: "Anita Sharma",
        avatar: "/avatars/a1.jpg",
        category: "Designer",
      },
      {
        id: "2",
        name: "Ravi Petkar",
        avatar: "/avatars/r2.jpg",
        category: "Karigar",
      },
      {
        id: "3",
        name: "Suresh Vendor",
        avatar: "/avatars/s3.jpg",
        category: "Vendor",
      },
      // …more items
    ];
    setItems(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar with Back button */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <Link
          to="/"
          className="flex items-center text-gray-700 hover:text-primary transition-colors"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Desktop view */}
        <div className="hidden lg:block">
          <ExploreDesktop items={items} />
        </div>

        {/* Mobile view */}
        <div className="block lg:hidden">
          <ExploreMobile items={items} />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default ExplorePage;
