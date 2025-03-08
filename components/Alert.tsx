import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

interface AlertProps {
  title: string;
  subTitle?: string;
  icon?: any;
}

const AppleStyleAlert = ({ visible, title, icon, onDismiss }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0);
      setTimeout(onDismiss, 3000);
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(50, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <BlurView style={styles.blur} />
      <View style={styles.content}>
        {icon &&
          (typeof icon === "string" ? (
            <Image source={icon} style={styles.icon} />
          ) : (
            icon
          ))}
        <Text style={styles.text}>{title}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    width: 200,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

export default AppleStyleAlert;
