import React, { useState } from 'react';
import {
  AnimatedList,
  Button,
  Container,
  Divide,
  Grow,
  Image,
  Input,
  Layout,
  List,
  Row,
  Text,
} from 'component';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { STICKER_LIST, STICKER_PACK } from 'common';
import { fontSize, getGutter, space } from 'theme';
import { openModal, useSafeArea, useTheme } from 'hook';
import { useTranslation } from 'react-i18next';
import { Check } from 'iconoir-react-native';

import StickerView from './StickerView';

const ITEM_HEIGHT = 188;

const TrendingTab = () => {
  const [data, setData] = useState(STICKER_PACK);
  const theme = useTheme();
  const { paddingBottom } = useSafeArea();
  const { t } = useTranslation('common');

  const renderItem = ({ item, index }) => {
    const { id } = item;
    return (
      <StickerList theme={theme} index={index} key={id} data={item} t={t} />
    );
  };

  return (
    <Container level="300">
      <List
        estimatedItemSize={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        itemKey="id"
        contentInset={{ bottom: paddingBottom }}
      />
    </Container>
  );
};

const StickerList = ({ data, theme, t, index }) => {
  const { name, quantity } = data;
  const subTitle = `${quantity} ${t('Sticker')}`;

  const stickers = [...STICKER_LIST].find(
    (_, stickerIndex) => stickerIndex === index,
  );

  stickers.length = 4;

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    //
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAdded(!added);
    }, 2000);
  };

  const onPress = () => {
    openModal('Portal', {
      children: <StickerView subTitle={subTitle} title={name} index={index} />,
    });
  };

  const renderItem = (item, idx) => (
    <Image
      style={[style.image, getGutter(idx, space['2xs'], 4)]}
      key={item}
      source={item}
    />
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      loading={loading}
      style={{ marginTop: space.m }}
      onPress={onPress}
    >
      <Layout style={[style.item, {}]}>
        <Row>
          <Grow>
            <Text numberOfLines={1} style={style.name}>
              {name}
            </Text>
            <Text type="muted" style={style.count}>
              {subTitle}
            </Text>
          </Grow>
          <Button
            size="s"
            disabled={added}
            loading={loading}
            onPress={onAdd}
            Icon={added ? Check : null}
          >
            {t(added ? 'Added' : 'Add')}
          </Button>
        </Row>
        {stickers?.length ? (
          <>
            <Divide style={style.divide} />
            <Row>{stickers?.map(renderItem)}</Row>
          </>
        ) : null}
      </Layout>
    </TouchableOpacity>
  );
};

export default TrendingTab;

const style = StyleSheet.create({
  container: {
    //
  },
  item: {
    padding: space.m,
    borderRadius: space.s,
    marginHorizontal: space.m,
  },
  name: {
    fontWeight: 'bold',
    fontSize: fontSize.l,
    //
  },
  count: {
    marginTop: space['3xs'],
  },
  divide: {
    marginVertical: space.s,
  },
  image: {
    flex: 1 / 4,
    aspectRatio: 1 / 1,
  },
  input: {
    // paddingHorizontal: space.m,
    // paddingBottom: space.m,
    marginTop: space.m,
    marginHorizontal: space.m,
  },
});
