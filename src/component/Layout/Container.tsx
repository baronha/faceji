import { StyleSheet } from 'react-native';
import { Layout, LayoutProps } from './Layout';
import { color } from 'theme';

export const Container = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Layout {...props} style={[style.container, props.style]}>
      {children}
    </Layout>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
