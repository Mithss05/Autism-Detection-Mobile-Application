import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { loadONNXModel } from "../utils/onnxModel";

const ONNXTestScreen = () => {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    async function initializeModel() {
      const session = await loadONNXModel();
      if (session) {
        setModelLoaded(true);
      }
    }
    initializeModel();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {modelLoaded ? "Model Loaded ✅" : "Loading Model..."}
      </Text>
    </View>
  );
};

export default ONNXTestScreen;
