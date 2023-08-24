import React, { FC, LegacyRef, forwardRef, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { color, fontSize, space } from 'theme';
import { Text, Row, TextProps } from 'component';
import { Cancel, EyeAlt, InfoEmpty } from 'iconoir-react-native';
import { useTheme, useToggle } from 'hook';

export interface InputProps extends TextInputProps {
  labelStyle?: StyleProp<TextStyle>;
  label?: string;
  labelProps?: TextProps;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  notice?: string;
  noticeColor?: string;
  noticeStyle?: StyleProp<TextStyle>;
  accessoryRight?: Function;
  accessoryLeft?: Function;
  editable?: boolean;
  showClear?: boolean;
  focusChange?: Function;
  onClear?: Function;
  Icon?: FC;
}

export const Input = forwardRef((props: InputProps, ref: LegacyRef<any>) => {
  const {
    label,
    labelStyle,
    contentStyle,
    style: containerStyle,
    inputStyle,
    labelProps,
    notice,
    noticeColor,
    noticeStyle,
    accessoryRight,
    accessoryLeft,
    secureTextEntry,
    showClear,
    focusChange,
    maxLength,
    Icon,
  } = props;
  const [isSecure, setSecure] = useToggle(secureTextEntry || false);
  const [isFocus, setFocus] = useState(false);
  const inputRef = ref || useRef();
  const theme = useTheme();

  const onFocus = (e: any) => {
    setFocus(true);
    focusChange?.(true);

    props?.onFocus && props.onFocus(e);
  };

  const onBlur = (e: any) => {
    setFocus(false);
    focusChange?.(false);

    props?.onBlur && props?.onBlur?.(e);
  };

  const onClear = () => {
    props?.onClear && props?.onClear?.();
    props.onChangeText && props.onChangeText('');
    inputRef.current?.focus();
    // Haptic();
  };

  return (
    <View style={[style.container, containerStyle]}>
      {label ? (
        <Text
          {...labelProps}
          style={[style.label, { color: theme.grayColor[600] }, labelStyle]}
        >
          {label}
        </Text>
      ) : null}
      <Row
        style={[
          style.content,
          {
            borderColor: notice
              ? theme.danger
              : isFocus
              ? theme.primaryColor[600]
              : theme.grayColor[400],
            backgroundColor:
              theme?.[notice ? 'dangerColor' : 'backgroundColor'][300],
          },
          contentStyle,
        ]}
      >
        {accessoryLeft ? (
          accessoryLeft?.()
        ) : Icon ? (
          <View style={{ marginRight: space.xs }}>
            <Icon />
          </View>
        ) : null}
        {props?.editable === false ? (
          <Text
            style={[
              style.inputStyle,
              inputStyle,
              {
                color: props?.value ? theme.grayColor[700] : theme.gray,
              },
            ]}
          >
            {props?.value || props?.placeholder}
          </Text>
        ) : (
          <TextInput
            selectionColor={theme.primaryColor[600]}
            {...props}
            secureTextEntry={isSecure}
            ref={ref || inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            style={[style.inputStyle, { color: theme.text }, inputStyle]}
            placeholderTextColor={theme.muted}
            accessibilityHint={theme.primary}
          />
        )}

        {maxLength && isFocus ? (
          <CountString value={props?.value ?? ''} maxLength={maxLength} />
        ) : null}
        {secureTextEntry ? (
          <TouchableOpacity onPress={setSecure}>
            <EyeAlt color={isSecure ? theme.gray : theme.primary} />
          </TouchableOpacity>
        ) : showClear && props?.value?.trim() !== '' ? (
          <TouchableOpacity onPress={onClear}>
            <Cancel />
          </TouchableOpacity>
        ) : (
          accessoryRight && accessoryRight()
        )}
      </Row>
      {notice ? (
        <Row style={{ marginTop: space.xs }}>
          <InfoEmpty color={noticeColor} />
          <Text
            size="s"
            style={[{ color: noticeColor }, style.notice, noticeStyle]}
          >
            {notice}
          </Text>
        </Row>
      ) : null}
    </View>
  );
});

export const CountString = ({
  value,
  maxLength,
}: {
  value: string;
  maxLength: number;
}) => {
  const number = maxLength - value?.length ?? 0;
  return !Number.isNaN(number) ? (
    <Text style={{ marginLeft: space.s }} type="muted" fontWeight="600">
      {number}
    </Text>
  ) : null;
};

Input.displayName = 'Input';

Input.defaultProps = {
  //   iconSize: iconSize.m,
  noticeColor: color.danger,
  placeholder: 'Typing...',
  focusChange: () => {},
};

const style = StyleSheet.create({
  container: {},
  content: {
    paddingHorizontal: space.s,
    borderRadius: space.xs,
  },
  label: {
    paddingBottom: space.xs,
    fontWeight: 'bold',
    fontSize: fontSize.l,
  },
  inputStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: fontSize.m,
    fontFamily: 'Manrope',
    paddingVertical: 0,
    paddingTop: space.s,
    paddingBottom: space.s,
  },
  notice: {
    marginLeft: space['3xs'],
    fontWeight: '500',
  },
});
