import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface AlertProps {
  title: string;
  subTitle?: string;
  icon?: any;
  visible: boolean;
  onDismiss: () => void;
  position?: "top" | "bottom";
  squared?: boolean;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const MAX_WIDTH = SCREEN_WIDTH * 0.8; // Maximum width 80% of screen
const MIN_WIDTH = 200;
const DISMISS_THRESHOLD = 100;

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
  const [contentWidth, setContentWidth] = useState<number>(MIN_WIDTH);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0);
      setTimeout(() => runOnJS(onDismiss)(), 3000);
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

  const onTextLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContentWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width + 40)));
  };

  // dismiss interactively
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationY) > DISMISS_THRESHOLD) {
        translateY.value = withTiming(
          position === "bottom" ? 100 : -100,
          { duration: 200 },
          () => {
            runOnJS(onDismiss)();
          },
        );
      } else {
        translateY.value = withSpring(0);
      }
    });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.container,
            animatedStyle,
            squared && styles.squared,
            position === "bottom" ? styles.bottom : styles.top,
            { width: contentWidth },
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
            <View style={styles.textContainer} onLayout={onTextLayout}>
              <Text style={styles.title}>{title}</Text>
              {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
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
    maxWidth: MAX_WIDTH,
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
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    maxWidth: MAX_WIDTH - 50,
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
