import {gql} from "@apollo/client";

export const Results = gql`
  query MyQuery {
  Customers(order_by: {ID: asc}) {
    Role
    Name
    ID
    Email
  }
}
`;

export const INSERT_CUSTOMERS = gql`
mutation MyMutation($Email: String = "", $Name: String = "", $Role: String = "", $ID: Int = 10) {
  insert_Customers(objects: {Email: $Email, Name: $Name, Role: $Role}) {
    returning {
      Email
      ID
      Name
      Role
    }
  }
}
`;

export const DELETE_CUSTOMERS = gql`
mutation MyMutation($ID: Int = 10) {
  delete_Customers_by_pk(ID: $ID) {
    ID
  }
}

`;

export const UPDATE_CUSTOMERS = gql`
mutation MyMutation($ID: Int = 10, $Email: String = "", $Name: String = "", $Role: String = "") {
  update_Customers_by_pk(pk_columns: {ID: $ID}, _set: {Email: $Email, Name: $Name, Role: $Role}) {
    Email
    ID
    Name
    Role
  }
}

`;

