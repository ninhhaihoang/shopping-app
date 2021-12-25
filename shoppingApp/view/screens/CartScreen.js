import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import products from "../../consts/products";
import { ScreenContainer } from "react-native-screens";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import APIKit from "../../apis/APIKit";
import AuthContext from "../../auth/context";

function Cart({ navigation }) {

  const [orders, setOrders] = useState([]);

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    getLoginedUserOrder();
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
};

  const getLoginedUserOrder = async () => {
    try {
      const response = await APIKit.get("user-order/myorders", config); // request content

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CardItem = ({ item }) => {
    return (
      <View style={styles.containers}>
        <View style={styles.displayFlexRow}>
        <Image
              style={
                Platform.OS === "ios"
                  ? { resizeMode: "contain", flex: 1 }
                  : { resizeMode: "contain", flex: 1, width: 100, height: 100 }
              }
              source={{ uri: item.orderItems[0].image }}
            />
          <View>
            <Text style={styles.nameProduct}> {item.orderItems[0].realname}</Text>
            <Text style={styles.sizeStyle}>
              {" "}
              Size: {item.orderItems[0].size} | Màu: {item.orderItems[0].color} | Số lượng: {item.orderItems[0].qty}{" "}
            </Text>
            <Text style={styles.priceStyle}> {item.orderItems[0].cost} </Text>
            <View style={styles.displayFlexRow2}>
              <Text style={{ textTransform: "capitalize" }}> Tổng tiền: </Text>
              <TextInput style={styles.inputSubStyle} value={item.totalPrice} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>
        {" "}
        Lịch sử mua hàng{" "}
      </Text>
      <FlatList
        style={styles.scrollViewStyle}
        data={orders}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imageStyle: {
    maxWidth: 120,
    maxHeight: 140,
    resizeMode: "contain",
    borderWidth: 0.3,
    borderColor: "#000",
  },
  displayFlexRow: { flexDirection: "row" },
  displayFlexRow2: { flexDirection: "row", alignItems: "center" },
  containers: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 300,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  boxLeft: {},
  boxRight: {},
  nameProduct: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    lineHeight: 20,
    maxWidth: 200,
  },
  priceStyle: { color: "#F8A058", fontSize: 18, marginBottom: 10 },
  sizeStyle: { color: "#424242", fontSize: 14, marginBottom: 5, marginTop: 5 },
  inputStyle: {
    marginLeft: 12,
    width: 30,
    height: 30,
    fontSize: 20,
    paddingLeft: 5,
  },
  inputSubStyle: {
    textAlign: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 5,
    color: "#000",
    fontSize: 13,
    paddingRight: 5,
  },
  buttonStyle: {
    marginLeft: 10,
    marginBottom: 3,
    textAlign: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 5,
    color: "#000",
    fontSize: 20,
    paddingRight: 5,
  },
  scrollViewStyle: { height: "100%" },
  totalPrice: { fontWeight: "bold", fontSize: 16 },
  totalStyle: {
    marginTop: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    width: "96%",
  },
  buttonBuy: {
    textAlign: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "bold",
    backgroundColor: "#EE9854",
    width: "96%",
    marginLeft: 4,
  },
});
export default Cart;
