import Toast from 'react-native-toast-message';

const toastAlert = (type, message, text2 = null) => {
  Toast.show({
    type: type, // 'success', 'error', 'info'
    text1: message || 'حدث خطأ',
    text2: text2,
    position: 'top',
    visibilityTime: type === 'error' ? 3000 : 2000,
  });
};

export default {
  toastAlert,
};
