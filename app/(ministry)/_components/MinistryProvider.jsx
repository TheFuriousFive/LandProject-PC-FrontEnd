"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const MinistryContext = createContext();

export function MinistryProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize mock data if empty
    const savedListings = localStorage.getItem("ministry_listings");
    if (savedListings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setListings(JSON.parse(savedListings));
    } else {
      const initialListings = [
        {
          id: 1,
          ownerName: "John Smith",
          propertyTitle: "Texas Farmland",
          location: "Austin, TX",
          acres: 50,
          submittedDate: "2024-03-01",
          documents: 8,
          status: "pending",
        },
        {
          id: 2,
          ownerName: "Sarah Johnson",
          propertyTitle: "Oregon Development",
          location: "Portland, OR",
          acres: 120,
          submittedDate: "2024-02-28",
          documents: 6,
          status: "pending",
        },
        {
          id: 3,
          ownerName: "Michael Doe",
          propertyTitle: "California Ranch",
          location: "Sacramento, CA",
          acres: 200,
          submittedDate: "2024-01-15",
          documents: 12,
          status: "approved",
        },
        {
          id: 4,
          ownerName: "Emily Davis",
          propertyTitle: "Nevada Vineyard",
          location: "Napa, CA",
          acres: 80,
          submittedDate: "2024-02-10",
          documents: 5,
          status: "rejected",
        },
      ];
      setListings(initialListings);
      localStorage.setItem(
        "ministry_listings",
        JSON.stringify(initialListings),
      );
    }

    const savedUsers = localStorage.getItem("ministry_users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const initialUsers = [
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          role: "owner",
          status: "active",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah@example.com",
          role: "owner",
          status: "active",
        },
        {
          id: 3,
          name: "Alice Brown",
          email: "alice@investor.com",
          role: "investor",
          status: "active",
        },
        {
          id: 4,
          name: "Bob White",
          email: "bob@investor.com",
          role: "investor",
          status: "suspended",
        },
      ];
      setUsers(initialUsers);
      localStorage.setItem("ministry_users", JSON.stringify(initialUsers));
    }
  }, []);

  const approveListing = (id) => {
    const updated = listings.map((l) =>
      l.id === id ? { ...l, status: "approved" } : l,
    );
    setListings(updated);
    localStorage.setItem("ministry_listings", JSON.stringify(updated));
  };

  const rejectListing = (id) => {
    const updated = listings.map((l) =>
      l.id === id ? { ...l, status: "rejected" } : l,
    );
    setListings(updated);
    localStorage.setItem("ministry_listings", JSON.stringify(updated));
  };

  const toggleUserStatus = (id) => {
    const updated = users.map((u) =>
      u.id === id
        ? { ...u, status: u.status === "active" ? "suspended" : "active" }
        : u,
    );
    setUsers(updated);
    localStorage.setItem("ministry_users", JSON.stringify(updated));
  };

  return (
    <MinistryContext.Provider
      value={{
        listings,
        approveListing,
        rejectListing,
        users,
        toggleUserStatus,
      }}
    >
      {children}
    </MinistryContext.Provider>
  );
}

export function useMinistry() {
  return useContext(MinistryContext);
}
