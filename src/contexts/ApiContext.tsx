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
    isVerified?: boolean;
  };
  isLiked?: boolean;
  isSaved?: boolean;
  category?: string;
  meta: {
    likesCount: number;
    sharesCount: number;
    commentCount: number;
  };
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
  images: string[];
  designer: {
    id: number;
    name: string | null;
    profileImage: string | null;
    isVerified?: boolean;
    rating?: number;
  };
  isLiked?: boolean;
  isSaved?: boolean;
  meta?: {
    likesCount: number;
    commentCount: number;
    sharesCount: number;
    savesCount: number;
    rating: number;
    orders: number;
  };
  reviews?: Array<{
    id: number;
    user: { name: string; profileImage?: string };
    rating: number;
    comment: string;
    images?: string[];
    createdAt: string;
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

export type AppUser = {
  id: number;
  name: string | null;
  email: string;
  profileImage?: string | null; // flattened for easy access
};

export type MyProfile = {
  id: number;
  name: string | null;
  email: string;
  profileImage: string | null;
  bio: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  profession: string;
  numberOfEmployees?: string | number | null;
  googleMapLink?: string | null;
};

export type UpdateProfileInput = Omit<MyProfile, "id" | "profileImage">;

export type SavedDesignItem = {
  userName: string;
  images: string[];
};

export type LikedDesignItem = {
  id: number;
  title?: string | null;
  designerName?: string | null;
  images: string[];
};

export type MyDesignReview = {
  id: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: number;
    name: string | null;
    profileImage: string | null;
  };
  images: string[];
};

export type MyDesignRatings = {
  designId: number;
  title: string;
  images: string[];
  avgRating: number | null;
  totalRatings: number;
  reviews: MyDesignReview[];
};

interface ProductAnalyticsResponse {
  success: boolean;
  analytics: {
    totalSales: number;
    totalRevenue: number;
    avgOrderValue: number;
    confirmedOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
  };
  product: {
    id: number;
    title: string;
    category: string;
    price: number;
    images: Array<{
      id: number;
      url: string;
    }>;
  };
  orders: Array<{
    orderId: number;
    buyerName: string;
    buyerImage: string | null;
    status: string;
    date: string;
    product: {
      id: number;
      title: string;
      category: string;
      price: number;
      image: string;
      quantity: number;
      amount: number;
    };
  }>;
}

export type MyUploadedProduct = {
  id: number;
  title: string;
  category: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
  meta: {
    likeCount: number;
    shareCount: number;
    saveCount: number;
    reviewCount: number;
    orderCount: number;
    averageRating: string | null;
  };
};

export type MyUploadedProductResponse = {
  success: boolean;
  count: number;
  products: MyUploadedProduct[];
};


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

  uploadProfileImage: (file: File) => Promise<string>;
  getMe: () => Promise<AppUser>;
  getMyProfileImage: () => Promise<string | null>;

  getMyProfile: () => Promise<MyProfile>;
  updateProfile: (payload: UpdateProfileInput) => Promise<MyProfile>;
  getSavedDesignsByUser: () => Promise<SavedDesignItem[]>;
  getLikedDesignsByUser: () => Promise<LikedDesignItem[]>;
  getMyProductReviewsAndRatings: () => Promise<MyDesignRatings[]>;
  getMyUploadedProducts: () => Promise<MyUploadedProductResponse>;
  getMyOrders: () => Promise<{ success: boolean; orders: any[] }>;
  getMySells: () => Promise<{ success: boolean; data: any[] }>;
  getOrderDetails: (orderId: number) => Promise<{ success: boolean; orderData: any }>;
  getProductAnalytics: (productId: number) => Promise<ProductAnalyticsResponse>;
  getUserChats: () => Promise<any[]>;
  getMeetingsByOrderId: (orderId: number) => Promise<{ success: boolean; data: any[] }>;
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

  const deleteComment = async (commentId: number) => {
    await api.delete(`/api/design/deleteComment/${commentId}`);
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
    console.log(data, "product")
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

  const uploadProfileImage: ApiContextType["uploadProfileImage"] = async (
    file
  ) => {
    const fd = new FormData();
    fd.append("image", file); // must match multer.single("image")
    const { data } = await api.post<{
      success: boolean;
      message: string;
      data: { imageUrl: string };
    }>("/api/users/updateProfileImage", fd, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return data.data.imageUrl; // ← grab it from data.data
  };

  const getMe: ApiContextType["getMe"] = async () => {
    const { data } = await api.get<{
      success: boolean;
      message: string;
      data: AppUser;
    }>("/api/users/me", { withCredentials: true });
    return data.data;
  };

  const getMyProfileImage: ApiContextType["getMyProfileImage"] = async () => {
    const { data } = await api.get<{
      success: boolean;
      message: string;
      data: { profileImage: string | null };
    }>("/api/users/profile-image", { withCredentials: true });
    return data.data.profileImage;
  };

  const getMyProfile: ApiContextType["getMyProfile"] = async () => {
    const { data } = await api.get<{
      success: boolean;
      message: string;
      data: MyProfile;
    }>("/api/users/profile", { withCredentials: true });
    return data.data;
  };

  const updateProfile: ApiContextType["updateProfile"] = async (payload) => {
    const { data } = await api.post<{
      success: boolean;
      message: string;
      data: MyProfile;
    }>("/api/users/updateProfile", payload, { withCredentials: true });
    return data.data;
  };

  const getSavedDesignsByUser: ApiContextType["getSavedDesignsByUser"] =
    async () => {
      const { data } = await api.get<{ designs: SavedDesignItem[] }>(
        "/api/users/getSavedDesignsByUser",
        { withCredentials: true }
      );
      // data.designs is already [{ userName, images: string[] }]
      return data.designs ?? [];
    };

  const getLikedDesignsByUser: ApiContextType["getLikedDesignsByUser"] =
    async () => {
      const { data } = await api.get<{
        message: string;
        data: Array<{
          id: number;
          title?: string | null;
          designer?: { name?: string | null } | null;
          images?: Array<{ url: string }>;
        }>;
      }>("/api/users/getLikedDesignsByUser", { withCredentials: true });

      // normalize to LikedDesignItem[]
      return (data.data ?? []).map((d) => ({
        id: d.id,
        title: d.title ?? null,
        designerName: d.designer?.name ?? null,
        images: (d.images ?? []).map((i) => i.url),
      }));
    };

  const getMyProductReviewsAndRatings: ApiContextType["getMyProductReviewsAndRatings"] =
    async () => {
      const { data } = await api.get<{
        message: string;
        data: Array<{
          id: number;
          title: string;
          images?: Array<{ url: string }>;
          ratings?: Array<{ rating: number }>;
          reviews: Array<{
            id: number;
            comment: string | null;
            createdAt: string;
            user: {
              id: number;
              name: string | null;
              profile?: { profileImage?: string | null } | null;
            };
            ReviewImage?: Array<{ url: string }>;
          }>;
        }>;
      }>("/api/users/getMyProductReviewsAndRatings", { withCredentials: true });

      const items = (data.data ?? []).map((d) => {
        const ratings = (d.ratings ?? []).map((r) => r.rating);
        const avg =
          ratings.length > 0
            ? Number(
              (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
            )
            : null;

        return {
          designId: d.id,
          title: d.title,
          images: (d.images ?? []).map((i) => i.url),
          avgRating: avg,
          totalRatings: ratings.length,
          reviews: (d.reviews ?? []).map((r) => ({
            id: r.id,
            comment: r.comment,
            createdAt: r.createdAt,
            user: {
              id: r.user.id,
              name: r.user.name,
              profileImage: r.user.profile?.profileImage ?? null,
            },
            images: (r.ReviewImage ?? []).map((i) => i.url),
          })),
        } as MyDesignRatings;
      });

      return items;
    };


  const getMyUploadedProducts: ApiContextType["getMyUploadedProducts"] =
    async () => {
      const { data } = await api.get<MyUploadedProductResponse>(
        "/api/users/getMyUploadedProducts",
        { withCredentials: true }
      );
      // console.log(data, "user uploaded product")
      return data;
    };


  const getMyOrders: ApiContextType["getMyOrders"] = async () => {
    const { data } = await api.get<{ success: boolean; orders: any[] }>(
      "/api/order/my-orders",
      { withCredentials: true }
    );
    return data;
  };


const getMySells: ApiContextType["getMySells"] = async () => {
  const { data } = await api.get<{ success: boolean; data: any[] }>(
    "/api/order/getMyProductOrdersSell",
    { withCredentials: true }
  );
  console.log(data, "Product Sell insight the context")
  return data;
};

const getOrderDetails: ApiContextType["getOrderDetails"] = async (orderId: number) => {
  const { data } = await api.get<{ success: boolean; orderData: any }>(
    `/api/order/orderDetailsForBuyerAndSeller/${orderId}`,
    { withCredentials: true }
  );
  return data;
};


const getProductAnalytics: ApiContextType["getProductAnalytics"] = async (productId) => {
  const { data } = await api.get<ProductAnalyticsResponse>(
    `/api/order/getProductAnalytics/${productId}`,
    { withCredentials: true }
  );
  return data;
};

const getUserChats: ApiContextType["getUserChats"] = async () => {
  const { data } = await api.get<{ success: boolean; chats: any[] }>(
    "/api/chat/userChats",
    { withCredentials: true }
  );
  return data.chats;
};

const getMeetingsByOrderId: ApiContextType["getMeetingsByOrderId"] = async (orderId: number) => {
  const { data } = await api.get<{ success: boolean; data: any[] }>(
    `/api/meeting/orders/${orderId}/meetings`,
    { withCredentials: true }
  );
  return data;
};


  const value: ApiContextType = {
    createComment,
    deleteComment,
    uploadDesign,
    getFeed,
    getProductDetails,
    toggleLike,
    getCommentsByDesign,
    toggleSave,
    shareDesign,
    submitReviewAndRating,
    uploadProfileImage,
    getMe,
    getMyProfileImage,
    getMyProfile,
    updateProfile,
    getSavedDesignsByUser,
    getLikedDesignsByUser,
    getMyProductReviewsAndRatings,
    getMyUploadedProducts,
    getMyOrders,
    getMySells,
    getOrderDetails,
    getProductAnalytics,
    getUserChats,
    getMeetingsByOrderId
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
