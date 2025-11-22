import React from 'react';
import {Text, StyleSheet} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';

const GradientText = ({
  children,
  style,
  colors = [COLORS.primary, COLORS.secondary],
  start = {x: 0, y: 0},
  end = {x: 1, y: 0},
}) => {
  return (
    <MaskedView
      style={styles.maskContainer}
      maskElement={<Text style={[style, styles.maskText]}>{children}</Text>}>
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={[style, styles.hiddenText]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

const styles = StyleSheet.create({
  maskContainer: {
    backgroundColor: 'transparent',
  },
  maskText: {
    backgroundColor: 'transparent',
  },
  hiddenText: {
    opacity: 0,
  },
});
