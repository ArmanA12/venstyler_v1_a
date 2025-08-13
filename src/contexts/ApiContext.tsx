// ApiContext.tsx
import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { api } from "@/lib/api";

interface UploadDesignInput {
  title: string;
  description: string;
  discount: string | number;
  completionTime: string;
  category: string;
  price: string | number;
  materialOne?: string;
  materialTwo?: string;
  images: File[];
  video?: File | null;
}

type FeedProduct = {
  id: number;
  title: string;
  description: string | null;
  discount: number;
  price: number;
  createdAt: string;
  images: string[]; // urls
  designer: {
    id: number;
    name: string | null;
    city: string | null;
    profileImage: string | null;
  };

  category?: string;
  meta: {
    likesCount: number;
    sharesCount: number;
    commentCount: number;
  };
  isLiked: boolean;
  isSaved: boolean;
};

export type ProductDetail = {
  id: number;
  title: string;
  description: string | null;
  discount: number | null;
  price: number | null;
  videoUrl?: string | null;
  completionTime?: string | null;
  materialOne?: string | null;
  materialTwo?: string | null;
  category?: string | null;
  createdAt: string;
  updatedAt: string;
  images: string[];
  designer: {
    id: number | null;
    name: string | null;
    city: string | null;
    profileImage: string | null;
  };
  meta: {
    likesCount: number;
    sharesCount: number;
    savesCount: number;
    reviewsCount: number;
    ordersCount: number;
    averageRating: string | null; // backend sends toFixed(1)
  };
  latestReviews: Array<{
    id: number;
    comment: string | null;
    createdAt: string;
    user: {
      id: number;
      name: string | null;
      profileImage: string | null;
    };
  }>;
};

export type ProductDetailResponse = {
  success: boolean;
  product: ProductDetail;
};

type FeedResponse = {
  success: boolean;
  total: number;
  page: number;
  pageSize: number;
  products: FeedProduct[];
  message: string;
};

interface ToggleLikeResult {
  message: string;
  like?: {
    id: number;
    designId: number;
    userId: number;
    createdAt: string;
  };
}

type RawComment = {
  id: number;
  designId: number;
  userId: number;
  comment?: string; // some APIs
  content?: string; // your API
  createdAt: string;
  updatedAt?: string;
  user: {
    id: number;
    name: string | null;
    profile?: { profileImage?: string | null } | null;
  };
};

export type CommentsPageResponse = {
  designId: number;
  currentPage: number;
  totalPages: number;
  totalComments: number;
  comments: RawComment[];
};

interface ToggleSaveResult {
  message: string;
  save?: {
    id: number;
    designId: number;
    userId: number;
    createdAt: string;
  };
}

interface ShareResult {
  message: string;
  share: {
    id: number;
    designId: number;
    userId: number;
    createdAt: string;
  };
}

export interface SubmitReviewInput {
  designId: number;
  comment: string;
  rating: number;
  images?: File[];
}

export interface SubmitReviewResponse {
  success: boolean;
  data: {
    id: number;
    comment: string | null;
    createdAt: string;
    ReviewImage: Array<{ id: number; url: string }>;
  };
  message: string;
}

interface ApiContextType {
  createComment: (designId: number, content: string) => Promise<void>;
  deleteComment: (commentId: number) => Promise<void>;

  uploadDesign: (payload: UploadDesignInput) => Promise<any>;
  getFeed: (page?: number) => Promise<FeedResponse>;
  getProductDetails: (designId: number) => Promise<ProductDetailResponse>;
  toggleLike: (designId: number) => Promise<ToggleLikeResult>;
  getCommentsByDesign: (
    designId: number,
    page?: number,
    limit?: number
  ) => Promise<CommentsPageResponse>;
  toggleSave: (designId: number) => Promise<ToggleSaveResult>;
  shareDesign: (designId: number) => Promise<ShareResult>;
  submitReviewAndRating: (
    input: SubmitReviewInput
  ) => Promise<SubmitReviewResponse>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used within an ApiProvider");
  return ctx;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const createComment = async (designId: number, content: string) => {
    await api.post(`/api/design/createComment/${designId}`, { content });
  };

  const uploadDesign = async (payload: UploadDesignInput) => {
    const {
      title,
      description,
      discount,
      completionTime,
      category,
      price,
      materialOne,
      materialTwo,
      images,
      video,
    } = payload;

    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("description", description ?? "");
    uploadData.append("discount", String(discount));
    uploadData.append("completionTime", completionTime);
    uploadData.append("category", category);
    uploadData.append("price", String(price));
    if (materialOne) uploadData.append("materialOne", materialOne);
    if (materialTwo) uploadData.append("materialTwo", materialTwo);

    images.forEach((file) => uploadData.append("images", file));

    if (video) uploadData.append("video", video);

    const { data } = await api.post(`/api/design/uploadDesign`, uploadData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return data;
  };

  const getFeed = async (page = 1): Promise<FeedResponse> => {
    const { data } = await api.get<FeedResponse>(
      `/api/design/getProductsForFeed`,
      {
        params: { page },
        withCredentials: true,
      }
    );
    return data;
  };

  const getProductDetails = async (
    designId: number
  ): Promise<ProductDetailResponse> => {
    const { data } = await api.get<ProductDetailResponse>(
      `/api/design/getProductDetails/${designId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  };

  const toggleLike: ApiContextType["toggleLike"] = async (designId) => {
    const { data } = await api.post<ToggleLikeResult>(
      `/api/design/likeUnLikeDesign/${designId}`,
      {}, // << not null
      { withCredentials: true }
    );
    return data;
  };

  const getCommentsByDesign = async (
    designId: number,
    page = 1,
    limit = 10
  ): Promise<CommentsPageResponse> => {
    const { data } = await api.get<CommentsPageResponse>(
      `/api/design/getCommentsByDesign/${designId}`,
      { params: { page, limit }, withCredentials: true }
    );
    return data;
  };

  const toggleSave: ApiContextType["toggleSave"] = async (designId) => {
    const { data } = await api.post<ToggleSaveResult>(
      `/api/design/saveUnSaveDesign/${designId}`,
      {}, // IMPORTANT: send {} (not null) to avoid body-parser error
      { withCredentials: true }
    );
    return data;
  };

  const shareDesign: ApiContextType["shareDesign"] = async (designId) => {
    const { data } = await api.post<ShareResult>(
      `/api/design/shareDesign/${designId}`,
      {}, // IMPORTANT: send {} not null
      { withCredentials: true }
    );
    return data;
  };

  const submitReviewAndRating: ApiContextType["submitReviewAndRating"] = async (
    input
  ) => {
    const fd = new FormData();
    fd.append("designId", String(input.designId));
    fd.append("comment", input.comment);
    fd.append("rating", String(input.rating));
    input.images?.forEach((f) => fd.append("images", f));

    const { data } = await api.post<SubmitReviewResponse>(
      `/api/design/submitReviewAndRating`,
      fd,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return data;
  };

  const value: ApiContextType = {
    createComment,
    uploadDesign,
    getFeed,
    getProductDetails,
    toggleLike,
    getCommentsByDesign,
    toggleSave,
    shareDesign,
    submitReviewAndRating,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
