import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {ScreensContainer, GradientText} from '../../../components';
import {COLORS, FONTS, icons} from '../../../constants';

export default function ProfileScreen() {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    name: 'احمد السعيد راشد',
    phone: '01212745939',
    email: 'ahmed@example.com',
  });

  const [temp, setTemp] = useState(user);

  const save = () => {
    setUser(temp);
    setEditMode(false);
  };

  const firstName = user.name.split(' ')[0];

  return (
    // <ScreensContainer>
    <View style={styles.root}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <Text style={styles.welcomeText}>مرحباً بعودتك،</Text>

        <Text style={styles.subText}>استمر في رحلتك التعليمية الرائعة! 🚀</Text>
      </LinearGradient>

      {/* Avatar */}
      <LinearGradient
        colors={['#5C6BC0', '#3F51B5']}
        style={styles.avatarContainer}>
        <Text style={styles.avatarLetter}>{firstName}</Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>الاسم</Text>

            {!editMode ? (
              <Text style={styles.value}>{user.name}</Text>
            ) : (
              <TextInput
                style={styles.input}
                value={temp.name}
                onChangeText={t => setTemp({...temp, name: t})}
              />
            )}
          </View>

          <View style={styles.separator} />

          {/* Phone */}
          <View style={styles.row}>
            <Text style={styles.label}>رقم الهاتف</Text>

            {!editMode ? (
              <Text style={styles.value}>{user.phone}</Text>
            ) : (
              <TextInput
                style={styles.input}
                value={temp.phone}
                onChangeText={t => setTemp({...temp, phone: t})}
                keyboardType="phone-pad"
              />
            )}
          </View>

          {/* <View style={styles.separator} /> */}
        </View>

        {/* ==== Buttons Row ==== */}
        <View style={styles.buttonsRow}>
          {!editMode ? (
            <>
              {/* Edit */}
              <TouchableOpacity
                style={styles.halfBtn}
                onPress={() => setEditMode(true)}>
                <LinearGradient
                  colors={['#3F51B5', '#5C6BC0']}
                  style={styles.actionGradient}>
                  <View style={styles.btnInner}>
                    <Text style={styles.actionText}>تعديل</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity style={styles.halfLogoutBtn}>
                <View style={styles.btnInner}>
                  <Text style={styles.logoutText}>تسجيل خروج</Text>
                  <Image source={icons.logout} style={styles.btnIconRed} />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Save */}
              <TouchableOpacity style={styles.halfBtn} onPress={save}>
                <LinearGradient
                  colors={['#00BFA5', '#00796B']}
                  style={styles.actionGradient}>
                  <View style={styles.btnInner}>
                    <Text style={styles.actionText}>حفظ</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity
                style={styles.halfLogoutBtn}
                onPress={() => setEditMode(false)}>
                <View style={styles.btnInner}>
                  <Text style={styles.logoutText}>إلغاء</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
    // </ScreensContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  header: {
    paddingVertical: RFValue(45),
    borderBottomLeftRadius: RFValue(45),
    borderBottomRightRadius: RFValue(45),
    alignItems: 'center',
  },

  welcomeText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body2,
  },

  username: {
    fontSize: RFValue(22),
    marginTop: RFValue(5),
  },

  subText: {
    fontSize: RFValue(12),
    color: '#fff',
    opacity: 0.9,
    marginTop: RFValue(5),
    ...FONTS.body4,
  },

  /* ===== Avatar ===== */
  avatarContainer: {
    alignSelf: 'center',
    paddingHorizontal: RFValue(22),
    height: RFValue(90),
    borderRadius: RFValue(50),
    marginTop: RFValue(-40),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },

  avatarLetter: {
    fontSize: RFValue(22),
    // fontWeight: '700',
    color: '#fff',
    ...FONTS.body2,
  },

  /* ===== Scroll Area ===== */
  scrollArea: {
    paddingBottom: RFValue(80),
    paddingTop: RFValue(20),
  },

  /* ===== Card ===== */
  card: {
    marginHorizontal: RFValue(20),
    backgroundColor: '#fff',
    padding: RFValue(20),
    paddingBottom: RFValue(10),
    borderRadius: RFValue(18),
    elevation: 3,
  },

  row: {
    marginBottom: RFValue(18),
  },

  label: {
    fontSize: RFValue(13),
    color: COLORS.gray,
    ...FONTS.body4,
  },

  value: {
    fontSize: RFValue(16),
    marginTop: RFValue(6),
    color: COLORS.black,
    ...FONTS.body4,
  },

  input: {
    marginTop: RFValue(6),
    backgroundColor: COLORS.lightGray4,
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(10),
    fontSize: RFValue(16),
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: RFValue(18),
  },

  /* ===== Buttons ===== */
  buttonsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: RFValue(20),
    marginTop: RFValue(20),
  },

  halfBtn: {
    flex: 1,
    marginLeft: RFValue(8),
  },

  halfLogoutBtn: {
    flex: 1,
    marginRight: RFValue(8),
    backgroundColor: '#FFCDD2',
    borderRadius: RFValue(12),
    paddingVertical: RFValue(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionGradient: {
    borderRadius: RFValue(12),
    paddingVertical: RFValue(12),
    alignItems: 'center',
  },

  btnInner: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: RFValue(7),
  },

  actionText: {
    color: '#fff',
    fontSize: RFValue(14),
    // fontWeight: '700',
    ...FONTS.body4,
  },

  logoutText: {
    color: '#D32F2F',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },

  btnIconWhite: {
    width: RFValue(18),
    height: RFValue(18),
    tintColor: '#fff',
  },

  btnIconRed: {
    width: RFValue(18),
    height: RFValue(18),
    tintColor: '#D32F2F',
  },
});
