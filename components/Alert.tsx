import React, { useEffect, useState } from "react";
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
  visible: boolean;
  onDismiss: () => void;
  position?: "top" | "bottom";
  squared?: boolean;
}

const AppleStyleAlert: React.FC<AlertProps> = ({
  visible,
  title,
  subTitle,
  icon,
  onDismiss,
  position = "top",
  squared = false,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(position === "bottom" ? 50 : -50);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0);
      setTimeout(onDismiss, 3000);
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(position === "bottom" ? 50 : -50, {
        duration: 300,
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        squared && styles.squared,
        position === "bottom" ? styles.bottom : styles.top,
        { width: Math.max(200, Math.min(contentWidth + 40, 350)) },
      ]}
    >
      <BlurView style={styles.blur} intensity={20} />
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            {typeof icon === "string" ? (
              <Image source={icon} style={styles.icon} />
            ) : (
              icon
            )}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
    minWidth: 200,
    maxWidth: 350,
  },
  squared: {
    borderRadius: 14,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  top: {
    top: 60,
  },
  bottom: {
    bottom: 40,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
    textAlign: "center",
  },
});

export default AppleStyleAlert;
