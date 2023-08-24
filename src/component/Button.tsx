import { forwardRef, type LegacyRef, type FC } from 'react';
import {
  type TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { color, space } from 'theme';
import { Text, type TextProps } from './Text';
import { useTheme } from 'hook';
import { Type } from 'common';
import { Haptic } from 'service';

export interface ButtonProps extends TouchableOpacityProps {
  textProps?: TextProps;
  title?: string;
  loading?: boolean;
  type: Type;
  Icon?: FC<any>;
  size: 'm' | 'l' | 's';
  iconPosition?: 'right' | 'left';
}

export const Button: FC<ButtonProps> = forwardRef(
  (props, ref: LegacyRef<any>) => {
    const {
      children,
      textProps,
      title,
      loading,
      type = 'primary',
      disabled,
      Icon,
      size = 'm',
      iconPosition,
    } = props;

    const { textColor, backgroundColor } = useButtonStyle(type, disabled);

    const onPress = (e: any) => {
      props?.onPress?.(e);
      Haptic();
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        ref={ref}
        {...props}
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          style.container,
          { backgroundColor },
          style[size] ?? {},
          props?.style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            fontWeight="bold"
            {...textProps}
            style={[
              style.text,
              textProps?.style,
              {
                opacity: loading ? 0 : 1,
                color: textColor,
              },
            ]}
          >
            {children || title}
          </Text>
        ) : (
          children
        )}
        {Icon ? (
          <Icon
            color={textColor}
            style={[
              style.icon,

              iconPosition
                ? iconPosition === 'left'
                  ? style.iconLeft
                  : style.iconRight
                : {},
              { opacity: loading ? 0 : 1 },
            ]}
          />
        ) : null}
        {loading ? (
          <ActivityIndicator color={textColor} style={style.loading} />
        ) : null}
      </TouchableOpacity>
    );
  },
);

const useButtonStyle = (type: Type, disabled?: boolean | undefined) => {
  const { primary, buttonText, muted, ...theme } = useTheme();

  let backgroundColor = primary;
  let textColor = buttonText;

  if (disabled) {
    textColor = muted;
    backgroundColor = theme.backgroundColor[300];
  }

  return {
    backgroundColor,
    textColor,
  };
  //
};

Button.displayName = 'Button';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    // padding: space.xxs,
    borderRadius: space.width,
    overflow: 'hidden',
    flexDirection: 'row',
    // borderRadius: space.s,
  },
  text: {
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: space['2xs'],
  },
  loading: {
    position: 'absolute',
  },
  // button size
  l: {
    padding: space.m,
    paddingHorizontal: space.s,
  },
  m: {
    padding: space.s,
    paddingHorizontal: space.m,
  },
  s: {
    padding: space['2xs'],
    paddingHorizontal: space.s,
  },
  iconLeft: {
    left: space.s,
    position: 'absolute',
    backgroundColor: 'red',
  },
  iconRight: {
    right: space.s,
    position: 'absolute',
  },
});
