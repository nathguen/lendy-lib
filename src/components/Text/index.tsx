import { camelCase } from 'lodash';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import CommonStyles from '../../common/styles';

type TextType =
  | 'LargeTitle'
  | 'Title1'
  | 'Title2'
  | 'Title3'
  | 'Headline'
  | 'Body'
  | 'Callout'
  | 'Subhead'
  | 'Footnote'
  | 'Caption1'
  | 'Caption2';

export enum TextTypes {
  LargeTitle = 'LargeTitle',
  Title1 = 'Title1',
  Title2 = 'Title2',
  Title3 = 'Title3',
  Headline = 'Headline',
  Body = 'Body',
  Callout = 'Callout',
  Subhead = 'Subhead',
  Footnote = 'Footnote',
  Caption1 = 'Caption1',
  Caption2 = 'Caption2',
}

interface TextProps extends RNTextProps {
  /**
   * text style type
   */
  textType?: TextType | TextTypes;
  largeTitle?: boolean;
  title1?: boolean;
  title2?: boolean;
  title3?: boolean;
  headline?: boolean;
  body?: boolean;
  callout?: boolean;
  subhead?: boolean;
  footnote?: boolean;
  caption1?: boolean;
  caption2?: boolean;

  color?: string;

  left?: boolean;
  center?: boolean;
  right?: boolean;
}

const Text = ({
  textType,
  color,
  left,
  center,
  right,
  ...props
}: TextProps) => {
  const appliedStyles: StyleSheet.NamedStyles<any> = useMemo(() => {
    if (textType && CommonStyles[textType]) {
      return CommonStyles[textType];
    }

    const commonStyleKey = Object.keys(CommonStyles).find(
      (styleKey: string) => {
        return Object.keys(props).includes(camelCase(styleKey));
      }
    );

    if (commonStyleKey) {
      // @ts-ignore
      return CommonStyles[commonStyleKey];
    }

    // defaults to Body style if no parameter passed in
    return CommonStyles.Body;
  }, [props, textType]);

  return (
    <RNText
      {...props}
      style={{
        // @ts-ignore
        ...(!!props.style && props.style),
        ...appliedStyles,
        ...(!!color && { color }), // allows custom color
        ...(left && styles.textLeft), // text aligns => left
        ...(center && styles.textCenter), // text aligns => center
        ...(right && styles.textRight), // text aligns => right
      }}
    />
  );
};

const styles = StyleSheet.create({
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
});

export default Text;