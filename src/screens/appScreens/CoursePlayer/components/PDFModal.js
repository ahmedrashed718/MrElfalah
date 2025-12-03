import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  Linking,
  Share,
  Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, lotties} from '../../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

// const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const PDFModal = ({visible, pdfUrl, title, onClose}) => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const openFile = async filePath => {
    try {
      // التحقق من وجود الملف
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        Alert.alert('خطأ', 'الملف غير موجود');
        return;
      }

      if (Platform.OS === 'android') {
        try {
          await Share.share({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'فتح ملف PDF',
          });
        } catch (shareError) {
          Alert.alert(
            'نجح التحميل',
            `تم حفظ الملف في: ${filePath}\nيمكنك فتحه من مجلد التحميلات.`,
            [{text: 'موافق'}],
          );
        }
      } else {
        // على iOS
        try {
          const fileUri = `file://${filePath}`;
          const canOpen = await Linking.canOpenURL(fileUri);
          if (canOpen) {
            await Linking.openURL(fileUri);
          } else {
            // استخدام Share API على iOS
            await Share.share({
              url: fileUri,
              type: 'application/pdf',
            });
          }
        } catch (iosError) {
          Alert.alert(
            'نجح التحميل',
            'تم حفظ الملف. يمكنك فتحه من تطبيق الملفات.',
          );
        }
      }
    } catch (openError) {
      console.error('Open file error:', openError);
      Alert.alert(
        'نجح التحميل',
        `تم حفظ الملف في: ${filePath}\nيمكنك فتحه من مجلد التحميلات.`,
      );
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const fileName = `file_${Date.now()}.pdf`;
      const downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const result = await RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: downloadPath,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('نجح التحميل', `تم حفظ الملف في مجلد التطبيق.`, [
          {
            text: 'فتح الملف',
            onPress: () => Linking.openURL(`file://${downloadPath}`),
          },
          {text: 'موافق'},
        ]);
      } else {
        throw new Error('Download failed');
      }
    } catch (e) {
      console.log('Download error:', e);
      Alert.alert('خطأ', 'فشل تحميل الملف.');
    } finally {
      setDownloading(false);
    }
  };

  const handleLoadComplete = (numberOfPages, filePath) => {
    setLoading(false);
    setError(null);
  };

  const handleError = error => {
    console.error('PDF Error:', error);
    setLoading(false);
    let errorMessage = 'فشل تحميل الملف. يرجى التحقق من الاتصال بالإنترنت.';
    if (error && error.message) {
      if (error.message.includes('trust manager')) {
        errorMessage = 'مشكلة في الاتصال الآمن. يرجى المحاولة مرة أخرى.';
      } else if (error.message.includes('network')) {
        errorMessage = 'مشكلة في الاتصال بالشبكة. يرجى التحقق من الإنترنت.';
      }
    }
    setError(errorMessage);
  };

  const handlePageChanged = (page, numberOfPages) => {};

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleWrapper}>
              <Ionicons
                name="document-text"
                size={RFValue(22)}
                color={COLORS.white}
                style={styles.titleIcon}
              />
              <Text style={styles.headerTitle} numberOfLines={1}>
                {title || 'ملف PDF'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}>
            <Ionicons name="close" size={RFValue(24)} color={COLORS.white} />
          </TouchableOpacity>
        </LinearGradient>

        {/* PDF Container */}
        <View style={styles.pdfContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingContent}>
                <LottieView
                  source={lotties.loading}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                <Text style={styles.loadingText}>جاري تحميل الملف...</Text>
                <Text style={styles.loadingSubtext}>
                  يرجى الانتظار قليلاً
                </Text>
              </View>
            </View>
          )}

          {error ? (
            <View style={styles.errorContainer}>
              <View style={styles.errorIconWrapper}>
                <Ionicons
                  name="alert-circle"
                  size={RFValue(64)}
                  color={COLORS.error}
                />
              </View>
              <Text style={styles.errorTitle}>حدث خطأ</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => {
                  setError(null);
                  setLoading(true);
                }}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={[COLORS.primary, '#FF6B6B']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.retryButtonGradient}>
                  <Ionicons
                    name="refresh"
                    size={RFValue(18)}
                    color={COLORS.white}
                  />
                  <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <Pdf
              trustAllCerts={false}
              source={{
                uri: pdfUrl,
                cache: true,
                method: 'GET',
                trusty: true,
              }}
              onLoadComplete={handleLoadComplete}
              onPageChanged={handlePageChanged}
              onError={handleError}
              style={styles.pdf}
              enablePaging={true}
              horizontal={false}
              spacing={10}
              enableRTL={true}
              enableAnnotationRendering={true}
              fitPolicy={0}
            />
          )}
        </View>

        {/* Footer with Enhanced Download Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
            disabled={downloading || !!error}
            activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.downloadButtonGradient}>
              {downloading ? (
                <>
                  <ActivityIndicator size="small" color={COLORS.white} />
                  <Text style={styles.downloadButtonText}>جاري التحميل...</Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="download-outline"
                    size={RFValue(22)}
                    color={COLORS.white}
                  />
                  <Text style={styles.downloadButtonText}>تحميل الملف</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(16),
    paddingTop: Platform.OS === 'ios' ? RFValue(50) : RFValue(20),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flex: 1,
    marginRight: RFValue(12),
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
  },
  titleIcon: {
    opacity: 0.95,
  },
  headerTitle: {
    fontSize: RFValue(20),
    color: COLORS.white,
    ...FONTS.h2,
    fontWeight: '600',
    flex: 1,
  },
  closeButton: {
    width: RFValue(42),
    height: RFValue(42),
    borderRadius: RFValue(21),
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  pdf: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RFValue(20),
    padding: RFValue(40),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  lottie: {
    width: RFValue(120),
    height: RFValue(120),
  },
  loadingText: {
    marginTop: RFValue(20),
    fontSize: RFValue(16),
    color: COLORS.darkGray,
    ...FONTS.body3,
    fontWeight: '600',
  },
  loadingSubtext: {
    marginTop: RFValue(8),
    fontSize: RFValue(13),
    color: COLORS.gray6,
    ...FONTS.body4,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: RFValue(30),
  },
  errorIconWrapper: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
    backgroundColor: COLORS.error08,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(20),
  },
  errorTitle: {
    fontSize: RFValue(20),
    color: COLORS.black,
    ...FONTS.h3,
    fontWeight: '600',
    marginBottom: RFValue(12),
    textAlign: 'center',
  },
  errorText: {
    fontSize: RFValue(15),
    color: COLORS.darkGray,
    textAlign: 'center',
    ...FONTS.body3,
    lineHeight: RFValue(24),
    marginBottom: RFValue(30),
  },
  retryButton: {
    borderRadius: RFValue(14),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  retryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue(28),
    paddingVertical: RFValue(14),
    gap: RFValue(10),
  },
  retryButtonText: {
    fontSize: RFValue(16),
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(20),
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray3,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  downloadButton: {
    borderRadius: RFValue(14),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(24),
    gap: RFValue(10),
  },
  downloadButtonText: {
    fontSize: RFValue(17),
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
});

export default PDFModal;
