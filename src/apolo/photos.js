import { gql } from "@apollo/client";

export const ALL_EAGLES = gql`
  query allEagles {
    allEagles {
      title
      id
      url
    }
  }
`;

export const ALL_LIONS = gql`
  query allLions {
    allLions {
      title
      id
      url
    }
  }
`;

export const ALL_BEARS = gql`
  query AllBears {
    allBears {
      title
      id
      url
    }
  }
`;

export const DELETE_EAGLE = gql`
  mutation RemoveEagle($id: ID!) {
    removeEagle(id: $id) {
      id
    }
  }
`;

export const DELETE_LION = gql`
  mutation RemoveLion($id: ID!) {
    removeLion(id: $id) {
      id
    }
  }
`;

export const DELETE_BEAR = gql`
  mutation RemoveBear($id: ID!) {
    removeBear(id: $id) {
      id
    }
  }
`;

export const ADD_EAGLE = gql`
  mutation CreateEagle($title: String!, $url: String!) {
    createEagle(title: $title, url: $url) {
      id
      title
      url
    }
  }
`;

export const ADD_LION = gql`
  mutation CreateEagle($title: String!, $url: String!) {
    createLion(title: $title, url: $url) {
      id
      title
      url
    }
  }
`;

export const ADD_BEAR = gql`
  mutation CreateEagle($title: String!, $url: String!) {
    createBear(title: $title, url: $url) {
      id
      title
      url
    }
  }
`;
