import React, { useEffect, useRef, useState } from 'react';
import type { ImageProps as RNImageProps } from 'react-native';
import { Image as RNImage, StyleSheet, View } from 'react-native';
import { color, space } from 'theme';
import { env } from 'common';
import image from 'image';

export interface ImageProps extends RNImageProps {
  scalable?: boolean;
  onSize?: Function;
  imageWidth?: number;
  imageHeight?: number;
}

export const Image = (props: ImageProps) => {
  const { onSize, scalable, style: containerStyle, source } = props;
  const [size, setSize] = useState({});
  const [isError, setError] = useState(false);
  // const haveSize = ObjectUtils.exist(size);
  const mounted = useRef(false);
  const iosLocalFile = env.IS_IOS && source?.match?.('file://');

  useEffect(() => {
    if (scalable) onProps();
  }, [scalable]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const onProps = () => {
    if (source) {
      if (typeof source === 'string') {
        RNImage.getSize(source, (width, height) => adjustSize(width, height));
      } else {
        const sourceToUse = RNImage.resolveAssetSource(source);
        adjustSize(sourceToUse.width, sourceToUse.height);
      }
    }
  };

  const adjustSize = (sourceWidth: any, sourceHeight: any) => {
    const { imageWidth, imageHeight } = props;

    let ratio = 1;

    if (imageWidth && imageHeight) {
      ratio = Math.min(imageWidth / sourceWidth, imageHeight / sourceHeight);
    } else if (imageWidth) {
      ratio = imageWidth / sourceWidth;
    } else if (imageHeight) {
      ratio = imageHeight / sourceHeight;
    }

    if (mounted.current) {
      const computedWidth = sourceWidth * ratio;
      const computedHeight = sourceHeight * ratio;

      const imageSize = { width: computedWidth, height: computedHeight };

      setSize(imageSize);
      typeof onSize === 'function' && onSize(imageSize);
    }
  };

  const style = [size || {}, containerStyle];

  const onError = () => {
    setError(true);
  };

  return isError || !source || source?.uri === null ? (
    <View {...props} style={[style, styleSheet.imageView]}>
      <RNImage
        {...props}
        style={styleSheet.placeholder}
        source={image.image_placeholder}
        resizeMode="contain"
      />
    </View>
  ) : (
    <RNImage
      onError={onError}
      {...props}
      style={style}
      source={
        typeof source === 'string'
          ? { uri: `${iosLocalFile ? 'file://' : ''}${source}` }
          : source
      }
    />
  );
};

const styleSheet = StyleSheet.create({
  placeholder: {
    height: '100%',
    aspectRatio: 1,
  },
  imageView: {
    backgroundColor: color.grayColor[300],
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Image.defaultProps = {
  imageWidth: space.width,
};
