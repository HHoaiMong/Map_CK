import React, { createContext, ReactNode, useContext, useState } from "react";

interface UserData {
  name: string;
  avatar: string;
  memberSince: string;
  trustScore: number;
  verified: boolean;
  stats: {
    reports: number;
    confirmations: number;
    points: number;
  };
}

interface UserContextType {
  user: UserData;
  updateUser: (userData: Partial<UserData>) => void;
  updateAvatar: (avatarUrl: string) => void;
}

const defaultUserData: UserData = {
  name: "Nguyễn Văn An",
  avatar: "https://i.pravatar.cc/300?img=12",
  memberSince: "T8 2023",
  trustScore: 98,
  verified: true,
  stats: {
    reports: 128,
    confirmations: 45,
    points: 1200,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUserData);

  const updateUser = (userData: Partial<UserData>) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const updateAvatar = (avatarUrl: string) => {
    setUser((prev) => ({ ...prev, avatar: avatarUrl }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
