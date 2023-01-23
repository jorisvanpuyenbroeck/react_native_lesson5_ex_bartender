import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';
import { useRecoilState } from 'recoil';
import { orderListState } from '../store';

import ListOrder from './list_order';

export default function OrderScreen() {

  const [orderList, setOrderList] = useRecoilState(orderListState);

  function handleDelete(){
    setOrderList([]);
  }

  return (
    <View style={styles.container}>
      <ListOrder />
      <FAB
        icon={{ name: 'delete', color: 'white' }}
        size="large"
        placement="right"
        color="firebrick"
        onPress={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});