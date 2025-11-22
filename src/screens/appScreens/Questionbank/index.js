import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScreensContainer} from '../../../components';
import {FONTS} from '../../../constants';

export default function QuestionBank() {
  return (
    <ScreensContainer>
      <View style={styles.container}>
        <Text style={styles.title}>بنك الاسئله</Text>
      </View>
    </ScreensContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: RFValue(26),
    marginBottom: 10,
    ...FONTS.body1,
  },
  subtitle: {
    fontSize: RFValue(15),
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: RFValue(16),
    color: '#fff',
    fontWeight: '600',
  },
});
