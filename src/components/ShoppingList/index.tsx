import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  //  //List of all docs one time
  //   useEffect(() => {
  //     firestore()
  //       .collection("products")
  //       .get()
  //       .then((res) => {
  //         const data = res.docs.map((doc) => {
  //           return {
  //             id: doc.id,
  //             ...doc.data(),
  //           };
  //         }) as ProductProps[];
  //         setProducts(data);
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       });
  //   }, []);

  //Real Time refresh
  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      // .orderBy('quantity', 'asc')
      // .startAt(1) //filter interval
      // .endBefore(6)
      // .limit(3) limit data length
      // .where('quantity', '==', 3) is the filter
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });
    return () => subscribe();
  }, []);

  //Getting access to a specific Doc
  // useEffect(() => {
  //   firestore().collection('products').doc('dzukIyPoFgauXqZbTNcP').get().then((res) => console.log({
  //     id: res.id,
  //     ...res.data()}));
  // }, []);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
