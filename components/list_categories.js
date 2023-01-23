import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import Fetching from "./layout/message_fetching";
import Error from "./layout/message_error";
import { GET_CATEGORIES } from "../gql/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { categoryState } from "../store";

export default function ListCategories({}) {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [category_id, setCategory_id] = useRecoilState(categoryState);

  if (loading) return <Fetching />;
  if (error) return <Error error={error} />;


  function handleList(category_id) {
    setCategory_id(category_id);
  }

  return (
    <View style={styles.container}>
      {data.categories.map((item) => (
        <Button
          key={item.id}
          buttonStyle={styles.button}
          title={item.name}
          onPress={() => handleList(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginTop: 15,
    margin: 5,
  },
  name: {
    color: "white",
    fontSize: 20,
  },
});
