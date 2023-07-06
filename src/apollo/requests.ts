import {gql} from '@apollo/client';

export const SING_UP = gql`
  mutation signUp($input: SignUpRequest!) {
    userSignUp(input: $input) {
      problem {
        message
      }
      token
      user {
        avatarUrl
        birthDate
        country
        createdAt
        deletedAt
        email
        firstName
        gender
        id
        lastName
        middleName
        phone
        updatedAt
      }
    }
  }
`;

export const SING_IN = gql`
  mutation signIn($input: SignInRequest!) {
    userSignIn(input: $input) {
      problem {
        message
      }
      token
      user {
        avatarUrl
        birthDate
        country
        createdAt
        deletedAt
        email
        firstName
        gender
        id
        lastName
        middleName
        phone
        updatedAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query getAllPosts($input: FindPostsRequest!) {
    posts(input: $input) {
      data {
        author {
          avatarUrl
          firstName
          lastName
        }
        authorId
        createdAt
        deletedAt
        description
        id
        isLiked
        likesCount
        mediaUrl
        title
        updatedAt
      }
      pageInfo {
        afterCursor
        count
        perPage
      }
    }
  }
`;

export const GET_FAVORITES = gql`
  query getFavoritePost($input: FindFavouritePostsRequest!) {
    favouritePosts(input: $input) {
      data {
        author {
          avatarUrl
          firstName
          lastName
        }
        authorId
        createdAt
        deletedAt
        description
        id
        isLiked
        likesCount
        mediaUrl
        title
        updatedAt
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($input: PostIdRequest!) {
    postLike(input: $input) {
      id
      isLiked
      likesCount
    }
  }
`;
export const UNLIKE_POST = gql`
  mutation unLikePost($input: PostIdRequest!) {
    postUnlike(input: $input) {
      id
      isLiked
      likesCount
    }
  }
`;

export const GET_MYPOST = gql`
  query getMyPost($input: FindMyPostsRequest!) {
    myPosts(input: $input) {
      data {
        author {
          avatarUrl
          firstName
          lastName
        }
        authorId
        createdAt
        deletedAt
        description
        id
        isLiked
        likesCount
        mediaUrl
        title
        updatedAt
      }
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile($input: EditProfileRequest!) {
    userEditProfile(input: $input) {
      problem {
        ... on EmailAlreadyUsedProblem {
          message
        }
        ... on PhoneAlreadyUsedProblem {
          message
        }
      }
      user {
        avatarUrl
        birthDate
        country
        createdAt
        deletedAt
        email
        firstName
        gender
        id
        lastName
        middleName
        phone
        updatedAt
      }
    }
  }
`;
