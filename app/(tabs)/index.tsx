import AppleStyleAlert from "@/components/Alert";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function index() {
  const [visible, setVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const showAlert = (props) => {
    setAlertProps(props);
    setVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <AppleStyleAlert
        visible={visible}
        onDismiss={() => setVisible(false)}
        {...alertProps}
      />
      <View className="gap-4">
        {/* Basic Drop */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={() => showAlert({ title: "Basic drop" })}
        >
          <Text className="text-white">Basic Drop</Text>
        </TouchableOpacity>

        {/* Drop with Subtitle */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={() =>
            showAlert({ title: "Basic drop", subTitle: "subtitle" })
          }
        >
          <Text className="text-white">Drop with Subtitle</Text>
        </TouchableOpacity>

        {/* Warning Drop */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={() =>
            showAlert({
              title: "Warning",
              subTitle: "This is a warning",
              icon: <Ionicons name="warning" size={24} color="red" />,
            })
          }
        >
          <Text className="text-white">Warning Drop</Text>
        </TouchableOpacity>

        {/* Squared Drop */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={() =>
            showAlert({
              title: "Basic drop",
              subTitle: "subtitle",
              squared: true,
            })
          }
        >
          <Text className="text-white">Squared Drop</Text>
        </TouchableOpacity>

        {/* Bottom Positioned Drop */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={() =>
            showAlert({
              title: "Bottom positioned drop",
              subTitle: "subtitle",
              position: "bottom",
            })
          }
        >
          <Text className="text-white">Bottom Positioned Drop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
// Basic drop
// Drop with subtitle
// Waring drop
// squared drop
// bottom positioned drop
