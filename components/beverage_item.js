import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { beverages } from "../images/beverages";
import { useRecoilState } from "recoil";
import { orderListState } from "../store";

export default function BeverageItem({ beverage }) {

  const image = beverages.find((object) => { return object.name == beverage.name; }).image;
  const [orderList, setOrderList] = useRecoilState(orderListState);

  function addItem() {
    let newList;
    const index = orderList.findIndex((orderItem) => orderItem.beverage === beverage);

    if (index !== -1) {
      newList = [...orderList.slice(0, index),
      {
        beverage: beverage,
        count: orderList[index].count + 1
      },
      ...orderList.slice(index + 1)];
    } else {
      newList = [
        ...orderList,
        {
          beverage: beverage,
          count: 1
        }
      ];
    }
    setOrderList(newList);
  }


  return (
    <Pressable style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.column}>
        <Text style={styles.name}>{beverage.name}</Text>
        <Text style={styles.price}>{beverage.price}</Text>
      </View>
      <TouchableOpacity style={styles.circle} onPress={addItem}>
        <Ionicons name="add-circle" size={20} color="white" />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
  },
  column: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 15,
  },
  small: {
    fontSize: 10,
    fontWeight: "normal",
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "firebrick",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  plus: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
});
