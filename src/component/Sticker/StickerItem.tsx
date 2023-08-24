import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  type ViewProps,
  ImageSourcePropType,
  TouchableOpacityProps,
} from 'react-native';
import { Image } from 'component/Image';
import { getGutter, space } from 'theme';

export interface StickerItemProps extends TouchableOpacityProps {
  source: ImageSourcePropType;
  index?: number;
  row?: number;
  gutter?: number;
}

export const StickerItem = (props: StickerItemProps) => {
  const { source } = props;
  const row = props?.row;
  const index = props?.index;
  const gutter = props?.gutter ?? space['2xs'];

  return (
    <TouchableOpacity
      {...props}
      style={[
        style.stickerItem,
        row
          ? {
              flex: 1 / row,
              ...(typeof index === 'number' && index >= 0
                ? getGutter(index, gutter, row)
                : {}),
            }
          : {},
        props?.style,
      ]}
      activeOpacity={0.9}
    >
      <Image source={source} style={style.sticker} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    //
  },
  stickerItem: {
    flex: 1 / 4,
  },
  sticker: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
