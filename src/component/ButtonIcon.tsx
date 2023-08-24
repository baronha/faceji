import { useTheme } from 'hook';
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { navigator } from 'service';
import { color, space } from 'theme';

export const ButtonIcon = (props: TouchableOpacityProps) => {
  const { backgroundColor } = useTheme();
  const onPress = (e: any) => {
    props?.onPress?.(e) ?? navigator.goBack();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      style={[
        style.container,
        { borderColor: backgroundColor[400] },
        props.style,
      ]}
    >
      {props.children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: space.width,
    borderWidth: 1,
    padding: space.xs,
  },
});
