import { type TextStyle, View, type ViewStyle } from 'react-native';

import s from './styles';

import { useEffect, useState } from 'react';
import Card from './card';

type Props = {
  style?: ViewStyle;
  data: string[];
  onSwipe?: (item: string) => void;
  cardSize?: { width: number; height: number };
  cardStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function SwipeableCards({
  style,
  data,
  onSwipe = () => {},
  cardSize,
  cardStyle = {},
  textStyle,
}: Props) {
  const [localData, setLocalData] = useState(data);
  const [listLength, setListLength] = useState<number>(0);

  useEffect(() => {
    setListLength(data.length);
  }, [data]);

  function removeFirst() {
    setLocalData((prev) => prev.slice(1));
  }

  return (
    <View style={[s.container, style]}>
      {localData
        .map((item: string, index: number) => {
          return (
            <Card
              cardSize={cardSize}
              key={item}
              content={item}
              index={index}
              removeFirst={removeFirst}
              textStyle={textStyle}
              style={[
                cardStyle,
                {
                  zIndex: listLength - index,
                },
              ]}
              onSwipe={onSwipe}
            />
          );
        })
        .reverse()}
    </View>
  );
}
