import React, { createContext, useContext } from "react";
import axios from "axios";

type CommentContextType = {
  createComment: (designId: number, content: string) => Promise<void>;
};

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context)
    throw new Error("useComment must be used inside CommentProvider");
  return context;
};

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const createComment = async (designId: number, content: string) => {
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${designId}`,
        { content },
        { withCredentials: true }
      );
    } catch (error: any) {
      console.error(
        "Error creating comment:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  return (
    <CommentContext.Provider value={{ createComment }}>
      {children}
    </CommentContext.Provider>
  );
};
