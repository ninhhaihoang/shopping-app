import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
//import products from "../../consts/products";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Rating, AirbnbRating } from "react-native-ratings";
import { NavigationContainer } from "@react-navigation/native";
import categories from "../../consts/categories";
import APIKit from "../../apis/APIKit";
import AuthContext from "../../auth/context";

const width = Dimensions.get("screen").width / 2 - 30;
function HomeScreen({ navigation }) {
  // const categories = ["STREET WEAR", "HODIE", "PANTS", "SHORT"];

  const [categoryIndex, setCategoryIndex] = React.useState();

  const tabs = ["Login", "SignUp"];

  const [products, setProducts] = useState([]);

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    getProductsFromAPI();
  }, []);

  const getProductsFromAPI = async () => {
    try {
      const response = await APIKit.get("products"); // request content

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onProductCategory1 = async () => {
    try {
      const response = await APIKit.get(
        `products?page=&&filters=&&types=&&categories=${categoryIndex}`
      ); // request content
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Cái useEffect dùng với tham số thứ 2 là 1 biến thì nó sẽ thực hiện khi giá trị của biến đó thay đổi
  useEffect(() => {
    onProductCategory1();
  }, categoryIndex);

  // const getCategoriesFromAPI = async () => {
  //   try {
  //     const response = await APIKit.get("products/categoryProduct/category"); // request content

  //     setCategories(response.data);

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSetCategory = (item) => {
  //   console.log(item);
  // }

  const CategoryList = () => {
    return (
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.categoryListContainer}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(item._id)}
          >
            <View
              style={{
                ...style.categoryBtn,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 5,
                  alignItems: "center",
                  color: categoryIndex == item._id ? COLORS.red : COLORS.orange,
                }}
              >
                {item.realname}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const handleLogout = () => {
    setUser(null);
  };

  const TabList = () => {
    return (
      <View style={style.tabContainer}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(`${item}`)}
          >
            <Text style={style.tabTextStyle}> {item} </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ product }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", product)}>
        <View style={style.card}>
          <View style={{ height: 100, alignItems: "center" }}>
            <Image
              style={
                Platform.OS === "ios"
                  ? { resizeMode: "contain", flex: 1 }
                  : { resizeMode: "contain", flex: 1, width: 100, height: 100 }
              }
              source={{ uri: product.image[0] }}
            />
          </View>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "normal",
              fontSize: 12,
              marginTop: 10,
              overflow: "hidden",
            }}
          >
            {product.realname}
          </Text>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              paddingHorizontal: 15,
              bottom: 45,
            }}
          >
            <Rating
              type="star"
              fractions={1}
              startingValue={product.rating}
              readonly
              imageSize={18}
              type="custom"
              tintColor="#F1F1F1"
              style={{ backgroundColor: COLORS.light }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              position: "absolute",
              paddingHorizontal: 15,
              bottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 19, fontWeight: "normal", color: "#ff1930" }}
            >
              {product.cost}d
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.orange,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text
            style={{ fontSize: 38, fontWeight: "bold", color: COLORS.orange }}
          >
            Shop thời trang
          </Text>
        </View>
        {user ? (
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon name="shopping-cart" size={28} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Icon name="shopping-cart" size={28} />
          </TouchableOpacity>
        )}
      </View>

      {user ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{user.name}</Text>
          <Text onPress={handleLogout}>Logout</Text>
        </View>
      ) : (
        <TabList />
      )}

      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products.data}
        renderItem={({ item }) => <Card product={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: COLORS.orange,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.orange,
  },
  categoryListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    // paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
  },
});

export default HomeScreen;
