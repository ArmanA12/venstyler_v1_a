import React, { FC, useState } from "react";

export type Category = "All" | "Designer" | "Karigar" | "Vendor";

export interface UserCard {
  id: string;
  name: string;
  avatar: string;
  category: Category;
}

interface ExploreProps {
  items: UserCard[];
}

// Default static avatar when none provided
const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/048/216/761/non_2x/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png";

// Gradient colors from Venstyler branding
const gradientClasses = {
  active: "bg-gradient-to-br from-primary to-accent text-primary-foreground",
  inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

export const ExploreDesktop: FC<ExploreProps> = ({ items }) => {
  const categories: Category[] = ["All", "Designer", "Karigar", "Vendor"];
  const [activeCat, setActiveCat] = useState<Category>("All");

  const filtered =
    activeCat === "All" ? items : items.filter((i) => i.category === activeCat);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 p-6 bg-white shadow-md rounded-r-lg">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCat(cat)}
                className={`${activeCat === cat ? gradientClasses.active : gradientClasses.inactive} px-4 py-2 rounded-full transition-all duration-300 w-full text-left`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main grid */}
      <div className="flex-1 bg-gray-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <input
            type="search"
            placeholder="Search designers, karigars, vendors…"
            className="flex-1 max-w-sm p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((user) => {
            const avatarSrc = user.avatar?.trim()
              ? user.avatar
              : DEFAULT_AVATAR;
            return (
              <div
                key={user.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={avatarSrc}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                    alt={user.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-black text-lg font-semibold">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-200">{user.category}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-br from-primary to-accent text-primary-foreground font-medium text-center rounded-b-2xl">
                  Contact
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExploreMobile: FC<ExploreProps> = ({ items }) => {
  const categories: Category[] = ["All", "Designer", "Karigar", "Vendor"];
  const [activeCat, setActiveCat] = useState<Category>("All");

  const filtered =
    activeCat === "All" ? items : items.filter((i) => i.category === activeCat);

  return (
    <div className="p-4 bg-white mb-20">
      {/* Tabs */}
      <div className="flex space-x-3 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCat === cat ? gradientClasses.active : gradientClasses.inactive}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search…"
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((user) => {
          const avatarSrc = user.avatar?.trim() ? user.avatar : DEFAULT_AVATAR;
          return (
            <div
              key={user.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-105"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={avatarSrc}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                  alt={user.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent p-3 opacity-0 hover:opacity-100 transition-opacity">
                  <h4 className="text-white font-semibold">{user.name}</h4>
                  <p className="text-xs text-gray-200">{user.category}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
