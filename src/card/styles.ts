import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  container: {
    position: "absolute",

    backgroundColor: "white",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    filter: [
      {
        dropShadow: {
          offsetX: 0,
          offsetY: 4,
          standardDeviation: 20,
          color: "#00000015",
        },
      },
    ],
  },
  text: {
    fontSize: 32,
    color: "black",
    fontWeight: "bold",
  },
});

export default s;
