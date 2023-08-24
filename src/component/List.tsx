import React, {
  type LegacyRef,
  type ReactComponentElement,
  type ReactElement,
  forwardRef,
  Component,
  ComponentClass,
  FC,
} from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
// import { FlatList, FlatListProps } from 'react-native';

export interface ListProps extends FlashListProps<any> {
  itemKey?: string;
  itemHeight?: number;
  Element?: FC<any>;
}

export const List = forwardRef((props: ListProps, ref: LegacyRef<any>) => {
  const { itemKey, itemHeight, Element = FlashList } = props;

  return (
    <Element
      ref={ref}
      keyExtractor={(item: any, index: number) =>
        `${item?.[itemKey as string]?.toString()}_${index.toString()}`
      }
      getItemLayout={
        itemHeight
          ? (data: any, index: number) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index,
            })
          : null
      }
      {...props}
    />
  );
});

List.displayName = 'List';

List.defaultProps = {
  data: [],
  itemKey: '',
};
