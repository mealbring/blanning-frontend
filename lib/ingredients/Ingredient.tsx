import * as React from "react";
import { Text, View } from "react-native";

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";

const Item = ({ title }: { title: any }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function IngredientsScreen() {
  const [textName, onChangeTextName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState<any[]>([]);

  const getIngredients = async () => {
    try {
      const url = "http://localhost:7512/config/ingredients/_search";
      const response = await fetch(url, {
        body: JSON.stringify({ query: {} }),
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      setList(res.result.hits);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getIngredients();
  }, []);

  console.log(list);

  const onPressAdd = async (text: string) => {
    const url = "http://localhost:7512/_/ingredients";

    await fetch(url, {
      body: JSON.stringify({ name: text, specification: "" }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setList((previousList) => {
      return [...previousList, { _id: text, _source: { name: text } }];
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <Item title={item._source.name} />
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <TextInput
          onChangeText={onChangeTextName}
          value={textName}
          style={styles.input}
          placeholder="Name of the ingredient"
        />

        <Button
          onPress={() => onPressAdd(textName)}
          title="Add"
          color="#841584"
          accessibilityLabel="Add the name to the list"
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList data={list} renderItem={renderItem} />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
