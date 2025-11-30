# MRElfalah - تطبيق التعليم

هذا مشروع React Native لتطبيق تعليمي مبني باستخدام أحدث التقنيات.

## 📋 المحتويات

- [البدء السريع](#البدء-السريع)
- [البنية التحتية للمشروع](#البنية-التحتية-للمشروع)
- [التحديثات الأخيرة - ربط API](#التحديثات-الأخيرة---ربط-api)
- [الملفات المحدثة](#الملفات-المحدثة)
- [استخدام API](#استخدام-api)

---

## 🚀 البدء السريع

### المتطلبات الأساسية

تأكد من إكمال [إعداد البيئة](https://reactnative.dev/docs/set-up-your-environment) قبل المتابعة.

### الخطوة 1: تشغيل Metro

قم بتشغيل Metro (أداة بناء JavaScript لـ React Native):

```sh
# باستخدام npm
npm start

# أو باستخدام Yarn
yarn start
```

### الخطوة 2: بناء وتشغيل التطبيق

#### Android

```sh
npm run android
# أو
yarn android
```

#### iOS

قبل أول تشغيل، قم بتثبيت CocoaPods dependencies:

```sh
bundle install
bundle exec pod install
```

ثم:

```sh
npm run ios
# أو
yarn ios
```

---

## 📁 البنية التحتية للمشروع

```
src/
├── screens/
│   ├── authScreens/
│   │   ├── Login/          # شاشة تسجيل الدخول
│   │   └── SignUp/         # شاشة التسجيل
│   └── appScreens/
│       └── Profile/        # شاشة الملف الشخصي
├── Helpers/
│   ├── ApiHelper.js        # مساعد API الرئيسي
│   └── api.js
├── Services/
│   └── index.js            # خدمة المصادقة (Auth)
├── utils/
│   └── index.js            # دوال مساعدة (Toast)
├── redux/
│   └── reducers/
│       └── UserReducer.js  # إدارة حالة المستخدم
└── components/
    └── CustomToast/        # مكون Toast المخصص
```

---

## 🔥 التحديثات الأخيرة - ربط API

### نظرة عامة

تم ربط التطبيق بخادم API الخلفي بشكل كامل. تم تنفيذ نظام مصادقة متكامل مع إدارة حالة المستخدم وتخزين البيانات.

### ✅ ما تم إنجازه

#### 1. **إنشاء البنية التحتية للـ API** 🔧

##### أ. ملف `src/utils/index.js` (جديد)
- إنشاء نظام Toast موحد لإظهار الرسائل
- دعم أنواع مختلفة: `success`, `error`, `info`
- إعدادات توقيت مناسبة لكل نوع

```javascript
utils.toastAlert('success', 'تم تسجيل الدخول بنجاح!');
utils.toastAlert('error', 'حدث خطأ');
```

##### ب. ملف `src/Services/index.js` (جديد)
- خدمة Auth لإدارة تسجيل الخروج
- تنظيف AsyncStorage تلقائياً
- حذف جميع مفاتيح المصادقة

```javascript
await Auth.logout(); // تنظيف كامل للبيانات
```

##### ج. تحديث `src/Helpers/ApiHelper.js`
- دعم صيغ متعددة للبيانات (JSON, form-urlencoded)
- معالجة أخطاء شاملة
- إدارة Session expiry تلقائياً
- إرجاع responses موحدة

**الميزات الجديدة:**
- معامل `contentType` قابل للتخصيص
- معالجة تلقائية للأخطاء 401/422
- تنظيف تلقائي عند انتهاء الجلسة

#### 2. **شاشة تسجيل الدخول (Login)** 🔐

##### الملف: `src/screens/authScreens/Login/index.js`

**الميزات المضافة:**

1. **ربط API**
   - Endpoint: `POST /auth/new_login.php`
   - إرسال البيانات بصيغة JSON
   - معالجة الاستجابات والأخطاء

2. **البيانات المرسلة:**
```json
{
  "email": "01212745939",
  "pass": "1231"
}
```

3. **البيانات المستلمة:**
```json
{
  "status": "success",
  "message": {
    "student_id": "506",
    "student_email": "01212745939",
    "token_value": "NbnnFdm5HTQi9ZgrDV9m",
    "student_name": "Mohammed Reda",
    "university_id": "1",
    "grade_id": "1",
    ...
  }
}
```

4. **الوظائف:**
   - ✅ التحقق من صحة البيانات (رقم الهاتف وكلمة المرور)
   - ✅ حالة تحميل (Loading state) مع ActivityIndicator
   - ✅ حفظ بيانات المستخدم في Redux
   - ✅ حفظ التوكن (`token_value`) في Redux
   - ✅ عرض Toast للنجاح/الخطأ
   - ✅ التنقل التلقائي إلى BottomTabs بعد النجاح

5. **تحسينات UX:**
   - تعطيل الزر أثناء التحميل
   - رسائل خطأ واضحة
   - تنظيف رقم الهاتف تلقائياً من المسافات والرموز

#### 3. **شاشة الملف الشخصي (Profile) - تسجيل الخروج** 🚪

##### الملف: `src/screens/appScreens/Profile/index.js`

**الميزات المضافة:**

1. **ربط API**
   - Endpoint: `POST /auth/logout.php`
   - إرسال `student_id` مع الطلب

2. **البيانات المرسلة:**
```json
{
  "student_id": "506"
}
```

3. **الوظائف:**
   - ✅ حالة تحميل أثناء تسجيل الخروج
   - ✅ تنظيف AsyncStorage تلقائياً
   - ✅ تنظيف Redux state (userData, token, login)
   - ✅ عرض Toast للنجاح/الخطأ
   - ✅ تسجيل خروج محلي حتى لو فشل الـ API
   - ✅ التنقل التلقائي إلى شاشة Login

4. **ميزة الأمان:**
   - حتى لو فشل الاتصال بالخادم، يتم تسجيل الخروج محلياً
   - ضمان عدم بقاء بيانات حساسة على الجهاز

---

## 📝 الملفات المحدثة

### ملفات جديدة:

1. **`src/utils/index.js`**
   - نظام Toast موحد

2. **`src/Services/index.js`**
   - خدمة Auth لتسجيل الخروج

### ملفات محدثة:

1. **`src/Helpers/ApiHelper.js`**
   - إضافة دعم `contentType` القابل للتخصيص
   - تحسين معالجة الأخطاء
   - إضافة headers `Content-Type`

2. **`src/screens/authScreens/Login/index.js`**
   - ربط كامل بـ API
   - إضافة حالة التحميل
   - إضافة Toast notifications
   - حفظ بيانات المستخدم في Redux

3. **`src/screens/appScreens/Profile/index.js`**
   - ربط تسجيل الخروج بـ API
   - إضافة حالة التحميل
   - تحسين UX

---

## 🔌 استخدام API

### 1. استخدام `fetchData` (من ApiHelper)

```javascript
import {fetchData} from '../../../Helpers/ApiHelper';

// مثال: POST request بصيغة JSON
const response = await fetchData('POST', '/auth/new_login.php', {
  email: '01212745939',
  pass: '1231',
});

// مثال: POST request بصيغة form-urlencoded
const formData = `email=${email}&pass=${password}`;
const response = await fetchData(
  'POST',
  '/auth/logout.php',
  formData,
  'application/x-www-form-urlencoded'
);
```

**معاملات `fetchData`:**
- `method`: طريقة HTTP ('GET', 'POST', 'PUT', 'DELETE')
- `path`: مسار الـ endpoint (مثل '/auth/new_login.php')
- `data`: البيانات المرسلة (object أو string)
- `contentType`: نوع المحتوى (افتراضي: 'application/json')

**الاستجابة:**
```javascript
{
  status: 'success' | 'error',
  message: string | object,
  data: object | null
}
```

### 2. استخدام Toast

```javascript
import Toast from 'react-native-toast-message';

// رسالة نجاح
Toast.show({
  type: 'success',
  text1: 'تم بنجاح!',
  text2: 'الرسالة الثانوية',
  position: 'top',
  visibilityTime: 2000,
});

// رسالة خطأ
Toast.show({
  type: 'error',
  text1: 'حدث خطأ!',
  text2: 'تفاصيل الخطأ',
  position: 'top',
  visibilityTime: 3000,
});
```

أو استخدام الدالة المساعدة:

```javascript
import utils from '../../../utils';

utils.toastAlert('success', 'تم بنجاح!', 'الرسالة الثانوية');
utils.toastAlert('error', 'حدث خطأ!');
```

### 3. استخدام Redux Actions

```javascript
import {useDispatch} from 'react-redux';
import {
  setUser,
  setToken,
  modifyIsLogin,
  removeUser,
} from '../../../redux/reducers/UserReducer';

// حفظ بيانات المستخدم
dispatch(setUser(userData));

// حفظ التوكن
dispatch(setToken(tokenValue));

// تحديث حالة تسجيل الدخول
dispatch(modifyIsLogin(true));

// حذف بيانات المستخدم
dispatch(removeUser());
```

---

## 🔒 الأمان

### تسجيل الخروج الآمن

- تنظيف تلقائي لـ AsyncStorage
- تنظيف Redux state بالكامل
- ضمان عدم بقاء بيانات حساسة
- تسجيل خروج محلي حتى عند فشل الـ API

### إدارة الجلسات

- تتبع تلقائي لانتهاء الجلسة (401/422)
- تسجيل خروج تلقائي عند انتهاء الجلسة
- تنظيف شامل للبيانات

---

## 🎨 المكونات المخصصة

### CustomToast

Toast مخصص بألوان متدرجة ومتعددة الأنواع:
- **Success**: ألوان بنفسجية
- **Error**: ألوان حمراء
- **Info**: ألوان زرقاء

المكون موجود في: `src/components/CustomToast/index.js`

---

## 🐛 استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في استيراد utils**
   - تأكد من وجود `src/utils/index.js`

2. **خطأ في استيراد Auth**
   - تأكد من وجود `src/Services/index.js`

3. **عدم ظهور Toast**
   - تأكد من وجود `<Toast />` في `App.tsx`

4. **فشل الاتصال بالـ API**
   - تحقق من `BASE_URL` في `.env.json`
   - تحقق من صحة endpoint

---

## 📚 المصادر

- [React Native Documentation](https://reactnative.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Navigation](https://reactnavigation.org)
- [Toast Message](https://github.com/calintamas/react-native-toast-message)

---

## 📄 الترخيص

هذا المشروع مملوك لفريق التطوير.

---

## 👥 المساهمون

- فريق تطوير MRElfalah

---

**آخر تحديث**: ديسمبر 2024
