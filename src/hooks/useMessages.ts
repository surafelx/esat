import { useState, useCallback } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Message {
  id?: string;
  username: string;
  message: string;
  isAnonymous: boolean;
  createdAt: unknown;
}

export const useMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (username: string, message: string, isAnonymous: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        username: isAnonymous ? "Anonymous" : username || "Anonymous",
        message,
        isAnonymous,
        createdAt: serverTimestamp(),
      });
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
      setLoading(false);
      return false;
    }
  }, []);

  return { sendMessage, loading, error };
};
