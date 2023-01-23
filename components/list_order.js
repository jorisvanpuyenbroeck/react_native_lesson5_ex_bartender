import { FlatList, View, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { orderListState } from "../store";

import Separator from "./layout/seperator";
import OrderItem from "./order_item";

export default function ListOrder() {
  const [orderList, setOrderList] = useRecoilState(orderListState);

  return (
    <View style={styles.container}>
      <FlatList
        data={orderList}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
});
