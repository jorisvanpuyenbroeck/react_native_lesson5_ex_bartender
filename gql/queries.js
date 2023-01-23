import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories: bartender_categories(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const GET_FILTERED_BEVERAGES = gql`
  query GetFilteredBeverages($category_id: Int!) {
    beverages: bartender_beverages(where: { category_id: { _eq: $category_id } }) {
      id
      category_id
      name
      plus18
      price
      category {
        name
      }
    }
  }
`;
