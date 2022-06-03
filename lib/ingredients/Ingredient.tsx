import * as React from "react";
import { Text, View } from "react-native";
import { BASE_URL } from "react-native-dotenv";

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
      const url = `${BASE_URL}/_/ingredients`;
      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      setList(res.result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getIngredients();
  }, []);

  const onPressAdd = async (text: string) => {
    const url = `${BASE_URL}/_/ingredients`;

    await fetch(url, {
      body: JSON.stringify({ name: text, specification: "" }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setList((previousList) => {
      return [...previousList, { _id: text, name: text }];
    });
  };

  const renderItem = ({ item }: { item: any }) => <Item title={item.name} />;

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
          <View>
            <Text style={styles.middleTitle}>Ingredients</Text>
            <FlatList data={list} renderItem={renderItem} />
          </View>
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
  middleTitle: {
    marginTop: 5,
    fontSize: 32,
    textAlign: "center",
  },
});
