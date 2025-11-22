import {View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {COLORS} from '../../constants';

const ScreensContainer = ({
  children,
  style,
  container,
  showStatusBar = true,
}) => {
  return (
    <SafeAreaView
      style={[styles.container, container, {backgroundColor: COLORS.white}]}>
      {showStatusBar && (
        <StatusBar
          translucent={false}
          hidden={false}
          backgroundColor={COLORS.bg}
          barStyle={'dark-content'}
          animated
          showHideTransition="fade"
          style={{
            // backgroundColor: COLORS.primary,
            hight: StatusBar.currentHeight,
          }}
        />
      )}

      <View style={[styles.container, style, {backgroundColor: COLORS.white}]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreensContainer;
