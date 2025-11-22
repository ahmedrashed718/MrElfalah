import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, icons, SIZES} from '../../constants';

const HeadPage = ({title}) => {
  //   const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {flexDirection: 'row'}]}>
      <TouchableOpacity
        style={[styles.backButton, {flexDirection: 'row'}]}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.arrow}
          style={{
            width: RFValue(20),
            height: RFValue(20),
            transform: [{scaleX: -1}], // Right arrow in LTR, left in RTL
          }}
        />
        <Text style={[styles.backText, {marginHorizontal: RFValue(5)}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  header: {
    alignItems: 'center',
    padding: RFValue(SIZES.padding),
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    alignItems: 'center',
  },
  backText: {
    ...FONTS.h4,
    color: COLORS.black,
  },
};

export default HeadPage;

// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import { COLORS, FONTS, SIZES, icons } from '../constants';
// import { RFValue } from 'react-native-responsive-fontsize';
// import FastImage from 'react-native-fast-image';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Header = ({ icon, onPress, title }) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',

//         paddingHorizontal: SIZES.padding,
//         paddingVertical: SIZES.padding,
//         backgroundColor: COLORS.white,
//         elevation: 1,
//         borderBottomLeftRadius: SIZES.radius,
//         borderBottomRightRadius: SIZES.radius,
//       }}>
//       <TouchableOpacity onPress={onPress}>
//         <Image
//           source={icon}
//           style={{ width: RFValue(24), height: RFValue(24) }}
//         />
//       </TouchableOpacity>

//       <Text
//         style={{
//           ...FONTS.body3,
//           color: COLORS.black,
//           fontFamily: FONTS.fontFamilyBold,
//           marginLeft: SIZES.margin,
//         }}>
//         {title}
//       </Text>
//       <View style={{ width: RFValue(30) }} />

//     </View>
//   );
// };

// export default Header;
