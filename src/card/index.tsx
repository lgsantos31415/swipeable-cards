import { useEffect } from 'react';
import { Dimensions, Text, type TextStyle, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import s from './styles';

type Props = {
  content: string;
  index: number;
  style?: ViewStyle | ViewStyle[];
  removeFirst: () => void;
  onSwipe: (item: string) => void;
  cardSize?: { width: number; height: number };
  textStyle?: TextStyle;
};

const Card = ({
  content,
  index,
  style,
  removeFirst,
  onSwipe,
  cardSize,
  textStyle = {},
}: Props) => {
  const { width, height } = Dimensions.get('screen');

  const getWidth = (value: number) => Math.floor(value - index * 45);
  const getHeight = (value: number) => Math.floor(value - index * 50);

  const wCard = useSharedValue(
    cardSize === undefined ? getWidth(width * 0.9) : getWidth(cardSize.width)
  );
  const hCard = useSharedValue(
    cardSize === undefined
      ? getHeight(height * 0.8)
      : getHeight(cardSize.height)
  );

  useEffect(() => {
    if (index === 0) {
      wCard.value = withTiming(
        cardSize === undefined
          ? getWidth(width * 0.9)
          : getWidth(cardSize.width)
      );
      hCard.value = withTiming(
        cardSize === undefined
          ? getHeight(height * 0.8)
          : getHeight(cardSize.height)
      );
    } else {
      wCard.value =
        cardSize === undefined
          ? getWidth(width * 0.9)
          : getWidth(cardSize.width);

      hCard.value =
        cardSize === undefined
          ? getHeight(height * 0.8)
          : getHeight(cardSize.height);
    }
  }, [index]);

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const moveAndRotation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        {
          rotateZ: `${interpolate(
            x.value,
            [-150, 0, 150],
            [-20, 0, 20],
            Extrapolation.CLAMP
          )}deg`,
        },
      ],
    };
  });

  const position = useAnimatedStyle(() => {
    return {
      width: wCard.value,
      height: hCard.value,
      top: (height - hCard.value) / 2,
      left: (width - wCard.value) / 2,
    };
  });

  const pan = Gesture.Pan()
    .enabled(index === 0)
    .onUpdate((e) => {
      x.value = e.translationX;
      y.value = e.translationY;
    })
    .onEnd((e) => {
      x.value = withSpring(0);
      y.value = withSpring(0);

      const left = width / 2 - 150;
      const right = width / 2 + 150;

      if (e.absoluteX < left) {
        x.value = withTiming(-wCard.value);
        y.value = withTiming(height, {}, () => {
          runOnJS(removeFirst)();
          runOnJS(onSwipe)('left');
        });
      } else if (e.absoluteX > right) {
        x.value = withTiming(width);
        y.value = withTiming(height, {}, () => {
          runOnJS(removeFirst)();
          runOnJS(onSwipe)('right');
        });
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[s.container, position, moveAndRotation, style]}>
        <Text style={[s.text, textStyle]}>{content}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default Card;
