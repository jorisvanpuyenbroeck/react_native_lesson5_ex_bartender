import { FlatList, View, StyleSheet } from 'react-native';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Separator from './layout/seperator';

import BeverageItem from './beverage_item';
import { Text } from 'react-native-elements';
import { GET_FILTERED_BEVERAGES } from '../gql/queries';
import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { categoryState } from '../store';

export default function ListBeverages() {

  const [category_id, setCategory_id] = useRecoilState(categoryState);
  const { data, loading, error } = useQuery(GET_FILTERED_BEVERAGES, { variables: { category_id }} );

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  function handleDetails() {};

  return (
    <View style={styles.container}>
      <FlatList
        data={data.beverages}
        renderItem={({ item }) => <BeverageItem beverage={item} onPress={() => handleDetails(item)} />}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});