import { useState, useEffect } from "react";
import { fetchCollection, isFirebaseConfigured } from "@/lib/firebase";

// --- Generic Hook Helper ---
export function useFirebaseData<T>(collectionName: string, fallback: T[]): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase isn't configured, stop loading (data remains empty)
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchCollection<T>(collectionName)
      .then((result) => {
        if (result && result.length > 0) setData(result);
      })
      .catch((err) => console.error(`Error loading ${collectionName}:`, err))
      .finally(() => setLoading(false));
  }, [collectionName]);

  return { data, loading };
}

// --- 1. Hero Images Hook ---
export function useHeroImages() {
  // Initialize with empty array since we don't want local images
  return useFirebaseData<{ id: string; url: string; title: string }>("herophotos", []);
}

// --- 2. Services Hook ---
export function useServices() {
  return useFirebaseData("services", []);
}

// --- 3. Testimonials Hook ---
export function useTestimonials() {
  return useFirebaseData("testimonials", []);
}

// --- 4. Portfolio Hook ---
export function usePortfolio() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    async function loadAllCollections() {
      try {
        setLoading(true);
        
        // Fetch all 5 collections in parallel
        const [kitchens, livingRooms, bedrooms, commercial, halls] = await Promise.all([
          fetchCollection<any>("kitchens"),
          fetchCollection<any>("livingRooms"),
          fetchCollection<any>("bedrooms"),
          fetchCollection<any>("commercial"),
          fetchCollection<any>("halls")
        ]);

        // Label them with the Category name to match your Tabs
        const labeledKitchens = kitchens.map(item => ({ ...item, category: "Kitchen" }));
        const labeledLiving = livingRooms.map(item => ({ ...item, category: "Living Room" }));
        const labeledBedrooms = bedrooms.map(item => ({ ...item, category: "Bedroom" }));
        const labeledCommercial = commercial.map(item => ({ ...item, category: "Commercial" }));
        const labeledHalls = halls.map(item => ({ ...item, category: "Hall" }));

        // Combine into one master list
        const combinedPortfolio = [
          ...labeledKitchens, 
          ...labeledLiving, 
          ...labeledBedrooms, 
          ...labeledCommercial, 
          ...labeledHalls
        ];

        if (combinedPortfolio.length > 0) {
          setData(combinedPortfolio);
        }
      } catch (error) {
        console.error("Error loading portfolio:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAllCollections();
  }, []);

  return { data, loading };
}