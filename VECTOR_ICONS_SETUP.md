# إعداد react-native-vector-icons

تم تحديث إعدادات المكتبة. يجب تنفيذ الخطوات التالية:

## الخطوات المطلوبة:

### 1. ربط الخطوط (Linking Assets)
قم بتشغيل الأمر التالي لربط الخطوط:

```bash
npx react-native-asset
```

أو إذا كان الأمر غير متوفر:

```bash
npx react-native link
```

### 2. لإعادة بناء التطبيق:

#### Android:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### iOS:
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### 3. إذا لم تظهر الأيقونات بعد:

#### Android:
- تأكد من أن الخطوط موجودة في: `android/app/src/main/assets/fonts/`
- إذا لم تكن موجودة، قم بنسخها من: `node_modules/react-native-vector-icons/fonts/`

#### iOS:
- تأكد من تشغيل `pod install` في مجلد `ios`
- تأكد من أن الخطوط موجودة في Xcode project

### 4. إعادة تشغيل Metro Bundler:
```bash
npx react-native start --reset-cache
```

## ملاحظات:
- تم تحديث `react-native.config.js` لإضافة خطوط vector icons
- تم تحديث `Info.plist` في iOS لإضافة جميع أيقونات vector
- تم إنشاء `fonts.xml` في Android

