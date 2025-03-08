import AppleStyleAlert from "@/components/Alert";
import { SafeAreaView, Text, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function index() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <AppleStyleAlert
        visible={visible}
        title="Hello"
        icon={<Ionicons name="warning" size={24} color="black" />}
        onDismiss={() => setVisible(false)}
      />
      <TouchableOpacity
        className="bg-blue-500"
        onPress={() => setVisible(true)}
      >
        <Text>Warning drop</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
// Basic drop
// Drop with subtitle
// Waring drop
// squared drop
// bottom positioned drop
