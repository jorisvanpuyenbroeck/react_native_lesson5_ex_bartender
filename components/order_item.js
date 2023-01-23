import { Image, View, Text, StyleSheet } from "react-native";

import { beverages } from "../images/beverages";

export default function OrderItem({ item }) {
  console.log(item);

  const image = beverages.find((object) => {
    return object.name == item.beverage.name;
  }).image;

  function Count() {
    var output = "";

    for (var i; i < item.count; i++) {
      output += "I";
    }
    console.log(output);
    return <Text>{output}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.name}>{item.beverage.name} {"I".repeat(item.count)}</Text>
        <Count />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
  },
  column: {
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
});
