"use client";
import { useState, useEffect } from "react";

export function useListings() {
  const [listings, setListings] = useState([]);
  const [logs, setLogs] = useState([]);
  const currentOwner = "John Smith"; // Mocking current user, as auth cookie implies

  useEffect(() => {
    const savedListings = localStorage.getItem("ministry_listings");
    if (savedListings) {
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
          price: "$250,000",
          description: "Prime farmland with water access.",
        },
      ];
      setListings(initialListings);
      localStorage.setItem(
        "ministry_listings",
        JSON.stringify(initialListings),
      );
    }

    const savedLogs = localStorage.getItem("owner_logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      const initialLogs = [
        {
          id: 1,
          action: "Created Listing",
          property: "Texas Farmland",
          date: "2024-03-01",
          details: "Submitted for ministry review.",
        },
      ];
      setLogs(initialLogs);
      localStorage.setItem("owner_logs", JSON.stringify(initialLogs));
    }
  }, []);

  const addListing = (newListing) => {
    const listingWithId = {
      ...newListing,
      id: Date.now(),
      ownerName: currentOwner,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "pending",
      documents: 0,
    };

    const updatedListings = [...listings, listingWithId];
    setListings(updatedListings);
    localStorage.setItem("ministry_listings", JSON.stringify(updatedListings));

    addLog(
      `Created Listing`,
      listingWithId.propertyTitle,
      "Submitted for ministry review.",
    );
    return listingWithId;
  };

  const removeListing = (id) => {
    const listing = listings.find((l) => l.id === id);
    if (!listing) return;

    const updated = listings.filter((l) => l.id !== id);
    setListings(updated);
    localStorage.setItem("ministry_listings", JSON.stringify(updated));

    addLog(
      `Deleted Listing`,
      listing.propertyTitle,
      "Listing removed from platform.",
    );
  };

  const addLog = (action, property, details) => {
    const newLog = {
      id: Date.now(),
      action,
      property,
      date: new Date().toISOString().split("T")[0],
      details,
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("owner_logs", JSON.stringify(updatedLogs));
  };

  // Filter listings only for the current owner
  const myListings = listings.filter((l) => l.ownerName === currentOwner);

  return {
    listings: myListings,
    addListing,
    removeListing,
    logs,
    currentOwner,
  };
}
