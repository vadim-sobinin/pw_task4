import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
  FullCard: { data: Post };
  CreatePost: {};
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

export interface RegData {
  userSignUp: UserData;
}

export interface LoginData {
  userSignIn: UserData;
}

export interface UserData {
  problem: any;
  token: string;
  user: User;
}

export interface User {
  avatarUrl: any;
  birthDate: any;
  country: any;
  createdAt: string;
  deletedAt: any;
  email: string;
  firstName: any;
  gender: any;
  id: string;
  lastName: any;
  middleName: any;
  phone: any;
  updatedAt: string;
}

export interface PostsReqData {
  posts: PostsData;
}

export interface PostsData {
  data: Post[];
  pageInfo: PageInfo;
}

export interface Post {
  author: Author;
  authorId: string;
  createdAt: string;
  deletedAt: any;
  description: string;
  id: string;
  isLiked: boolean;
  likesCount: number;
  mediaUrl: string;
  title: string;
  updatedAt: string;
}

export interface Author {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
}

export interface PageInfo {
  afterCursor: string;
  count: number;
  perPage: number;
}

export interface LikeData {
  postLike: PostLike;
}

export interface FavoritesData {
  favouritePosts: PostsData;
}

export interface PostLike {
  id: string;
  isLiked: boolean;
  likesCount: number;
}

export interface MyPostsData {
  myPosts: {
    data: Post[];
  };
}
