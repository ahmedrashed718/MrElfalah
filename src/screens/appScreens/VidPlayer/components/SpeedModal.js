import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../../constants';

const SpeedModal = ({
  visible,
  speedOptions,
  playbackRate,
  onClose,
  onSelectSpeed,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>اختر السرعة</Text>
          {speedOptions.map((speed, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.modalOption,
                playbackRate === speed && styles.modalOptionActive,
              ]}
              onPress={() => onSelectSpeed(speed)}>
              <Text
                style={[
                  styles.modalOptionText,
                  playbackRate === speed && styles.modalOptionTextActive,
                ]}>
                {speed}x
              </Text>
              {playbackRate === speed && (
                <Ionicons
                  name="checkmark"
                  size={RFValue(20)}
                  color={COLORS.primary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    padding: RFValue(20),
    width: '80%',
    maxWidth: RFValue(300),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {elevation: 8},
    }),
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: RFValue(16),
    textAlign: 'center',
    ...FONTS.h2,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(8),
    marginBottom: RFValue(8),
    backgroundColor: '#F5F5F5',
  },
  modalOptionActive: {
    backgroundColor: COLORS.primary100,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  modalOptionText: {
    fontSize: RFValue(14),
    color: COLORS.black,
    ...FONTS.body3,
  },
  modalOptionTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SpeedModal;

