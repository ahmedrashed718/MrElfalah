# هيكل التنقل في المشروع (Navigation Structure)

## 📱 نظرة عامة (Overview)

المشروع يستخدم **React Navigation** مع هيكل تنقل هرمي من 3 مستويات:

```
App.tsx (NavigationContainer)
    └── AppStack (Stack Navigator - المستوى الرئيسي)
        ├── AuthStack (Stack Navigator - شاشات المصادقة)
        │   ├── Login Screen
        │   └── SignUp Screen
        │
        ├── BottomTabs (Bottom Tab Navigator - التبويبات السفلية)
        │   ├── Home Tab
        │   ├── QuestionBank Tab
        │   ├── المناهج Tab (Courses)
        │   ├── الامتحانات Tab (Exams)
        │   └── الملف الشخصي Tab (Profile)
        │
        └── Screens (شاشات منفصلة في الـ Stack)
            ├── CoursePlayer
            ├── VidPlayer
            ├── ExamQuestion
            ├── ExamResults
            ├── QuestionStages
            ├── Home (مكررة)
            └── QuestionBank (مكررة)
```

### 📊 مخطط بصري (Visual Diagram)

```
┌─────────────────────────────────────────┐
│         App.tsx                         │
│  (NavigationContainer)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         AppStack                        │
│  (initialRouteName="AuthStack")         │
└──────┬──────────────────────────────────┘
       │
       ├─────────────────┬──────────────────┐
       │                 │                  │
       ▼                 ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  AuthStack   │  │  BottomTabs  │  │   Screens    │
│              │  │              │  │              │
│  ┌────────┐  │  │  ┌────────┐  │  │ CoursePlayer │
│  │ Login  │  │  │  │  Home  │  │  │ VidPlayer    │
│  └────────┘  │  │  └────────┘  │  │ ExamQuestion │
│      │       │  │  ┌────────┐  │  │ ExamResults │
│      ▼       │  │  │Question│  │  │ QuestionStages│
│  ┌────────┐  │  │  │  Bank  │  │  └──────────────┘
│  │ SignUp │  │  │  └────────┘  │
│  └────────┘  │  │  ┌────────┐  │
└──────────────┘  │  │Courses │  │
                  │  └────────┘  │
                  │  ┌────────┐  │
                  │  │ Exams  │  │
                  │  └────────┘  │
                  │  ┌────────┐  │
                  │  │Profile │  │
                  │  └────────┘  │
                  └──────────────┘
```

---

## 🏗️ البنية التفصيلية (Detailed Structure)

### 1️⃣ **App.tsx** - نقطة البداية
```javascript
NavigationContainer
    └── AppStack
```

**الموقع:** `App.tsx`  
**الدور:** يحتوي على `NavigationContainer` الذي يغلف كل التنقل في التطبيق

---

### 2️⃣ **AppStack** - المستوى الرئيسي للتنقل
**الموقع:** `src/navigation/AppStack.js`  
**النوع:** `createNativeStackNavigator`  
**الشاشة الافتراضية:** `AuthStack` (تبدأ بشاشات المصادقة)

#### الشاشات في AppStack:

| اسم الشاشة | المكون | الوصف |
|------------|--------|-------|
| `AuthStack` | AuthStack Navigator | شاشات تسجيل الدخول والتسجيل |
| `BottomTabs` | BottomTabs Navigator | التبويبات السفلية الرئيسية |
| `Home` | Home Screen | الشاشة الرئيسية |
| `CoursePlayer` | CoursePlayer Screen | مشغل الكورسات |
| `VidPlayer` | VidPlayer Screen | مشغل الفيديوهات |
| `ExamQuestion` | ExamQuestion Screen | أسئلة الامتحان |
| `ExamResults` | ExamResults Screen | نتائج الامتحان |
| `QuestionBank` | QuestionBank Screen | بنك الأسئلة |
| `QuestionStages` | QuestionStages Screen | مراحل الأسئلة |

**ملاحظة:** بعض الشاشات موجودة في `AppStack` وفي `BottomTabs` (مثل `Home` و `QuestionBank`) - هذا يسمح بالوصول إليها من أماكن مختلفة.

---

### 3️⃣ **AuthStack** - شاشات المصادقة
**الموقع:** `src/navigation/AuthStack.js`  
**النوع:** `createNativeStackNavigator`  
**الشاشة الافتراضية:** `Login`

#### الشاشات في AuthStack:

| اسم الشاشة | المكون | الوصف |
|------------|--------|-------|
| `Login` | LoginScreen | شاشة تسجيل الدخول |
| `SignUp` | SignUp Screen | شاشة التسجيل |

**الملفات:**
- `src/screens/authScreens/Login/index.js`
- `src/screens/authScreens/SignUp/index.js`

---

### 4️⃣ **BottomTabs** - التبويبات السفلية
**الموقع:** `src/navigation/BottomTabs.js`  
**النوع:** `createBottomTabNavigator`  
**الشاشة الافتراضية:** `Home`

#### التبويبات في BottomTabs:

| اسم التبويب | المكون | التسمية | الأيقونة |
|-------------|--------|---------|----------|
| `Home` | Home Screen | الرئيسية | home/home2 |
| `QuestionBank` | QuestionBank Screen | بنك الأسئلة | learning/learning2 |
| `المناهج` | Courses Screen | المناهج | book2 (زر مرتفع في المنتصف) |
| `بنك الاسئله` | Exams Screen | الامتحانات | exam/exam2 |
| `الملف الشخصي` | Profile Screen | الملف الشخصي | user/user2 |

**المميزات:**
- خلفية متدرجة (Gradient) للتبويبات
- زر "المناهج" في المنتصف مرتفع عن الباقي
- أيقونات مختلفة للحالة النشطة وغير النشطة

---

## 🔄 تدفق التنقل (Navigation Flow)

### عند بدء التطبيق:
```
App.tsx
  └── AppStack (initialRouteName="AuthStack")
      └── AuthStack (initialRouteName="Login")
          └── Login Screen
```

### بعد تسجيل الدخول:
```
AppStack
  └── BottomTabs (initialRouteName="Home")
      ├── Home Tab
      ├── QuestionBank Tab
      ├── المناهج Tab (Courses)
      ├── الامتحانات Tab (Exams)
      └── الملف الشخصي Tab (Profile)
```

### التنقل إلى شاشات أخرى:
من أي شاشة في `BottomTabs` أو `AuthStack`، يمكن التنقل إلى:
- `CoursePlayer` - لعرض الكورسات
- `VidPlayer` - لعرض الفيديوهات
- `ExamQuestion` - لأسئلة الامتحان
- `ExamResults` - لنتائج الامتحان
- `QuestionStages` - لمراحل الأسئلة

---

## 📂 هيكل الملفات (File Structure)

```
src/
├── navigation/
│   ├── AppStack.js          # المستوى الرئيسي للتنقل
│   ├── AuthStack.js         # شاشات المصادقة
│   ├── BottomTabs.js        # التبويبات السفلية
│   ├── index.js             # Export للـ navigators
│   └── styles.js            # أنماط التنقل
│
├── screens/
│   ├── authScreens/
│   │   ├── Login/
│   │   │   └── index.js
│   │   ├── SignUp/
│   │   │   └── index.js
│   │   └── index.js
│   │
│   └── appScreens/
│       ├── HomeScreen/
│       ├── Courses/
│       ├── Exams/
│       ├── Questionbank/
│       ├── Profile/
│       ├── CoursePlayer/
│       ├── VidPlayer/
│       ├── ExamQuestions/
│       ├── ExamResults/
│       ├── QuestionStages/
│       └── index.js
```

---

## 🎯 أمثلة على التنقل (Navigation Examples)

### 1. التنقل من Login إلى BottomTabs (بعد تسجيل الدخول):
**الموقع:** `src/screens/authScreens/Login/index.js:80`
```javascript
// بعد التحقق من صحة البيانات
if (!phoneError && !passwordError) {
  navigation.navigate('BottomTabs');
}
```

### 2. التنقل من Login إلى SignUp:
**الموقع:** `src/screens/authScreens/Login/index.js:155`
```javascript
<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
  {/* ... */}
</TouchableOpacity>
```

### 3. التنقل من SignUp إلى Login:
**الموقع:** `src/screens/authScreens/SignUp/index.js:129`
```javascript
navigation.navigate('Login');
```

### 4. التنقل من HomeScreen إلى QuestionBank:
**الموقع:** `src/screens/appScreens/HomeScreen/index.js:148`
```javascript
const handleQuickAction = route => {
  if (route === 'QuestionBank') {
    navigation.navigate('QuestionBank');
  } else {
    navigation.navigate('BottomTabs', {screen: route});
  }
};
```

### 5. التنقل إلى VidPlayer مع parameters:
**الموقع:** `src/screens/appScreens/CoursePlayer/components/ActivitiesCard.js:34`
```javascript
navigation.navigate('VidPlayer', {
  videoUrl: 'https://example.com/video.mp4',
  title: 'أغنية الدرس'
});
```

### 6. التنقل إلى ExamQuestion:
**الموقع:** `src/screens/appScreens/CoursePlayer/components/ActivitiesCard.js:70`
```javascript
navigation.navigate('ExamQuestion');
```

### 7. التنقل إلى تبويب معين في BottomTabs:
**الموقع:** `src/screens/appScreens/HomeScreen/index.js:150`
```javascript
navigation.navigate('BottomTabs', {screen: route});
// route يمكن أن يكون: 'Home', 'QuestionBank', 'المناهج', إلخ
```

### 8. التنقل إلى تبويب بالعربية:
**الموقع:** `src/screens/appScreens/HomeScreen/index.js:209`
```javascript
onPress={() => navigation.navigate('المناهج')}
```

---

## ⚙️ الإعدادات (Configuration)

### AppStack Settings:
- `headerShown: false` - إخفاء الـ header الافتراضي
- `animation: 'slide_from_right'` - حركة الانتقال من اليمين

### AuthStack Settings:
- `headerShown: false`
- `animation: 'slide_from_right'`
- `initialRouteName: "Login"`

### BottomTabs Settings:
- `headerShown: false`
- `tabBarStyle` - تصميم مخصص للتبويبات
- `tabBarBackground` - خلفية متدرجة
- `tabBarActiveTintColor: white`
- `tabBarInactiveTintColor: white`

---

## 📝 ملاحظات مهمة (Important Notes)

1. **الشاشات المكررة:** بعض الشاشات موجودة في `AppStack` و `BottomTabs` (مثل `Home` و `QuestionBank`) - هذا يسمح بالوصول إليها من أماكن مختلفة.

2. **الشاشة الافتراضية:** التطبيق يبدأ بـ `AuthStack` (شاشة Login).

3. **التنقل الشرطي:** يمكن التحكم في التنقل بناءً على حالة المستخدم (مثل: إذا كان مسجل دخول → `BottomTabs`، وإلا → `AuthStack`).

4. **الأسماء العربية:** بعض أسماء الشاشات في `BottomTabs` بالعربية (مثل `المناهج`، `الملف الشخصي`) - يجب الحذر عند التنقل إليها.

---

## 🔍 البحث عن استخدامات التنقل

للعثور على جميع استخدامات التنقل في المشروع:
```bash
# البحث عن navigation.navigate
grep -r "navigation.navigate" src/

# البحث عن navigation.push
grep -r "navigation.push" src/

# البحث عن navigation.goBack
grep -r "navigation.goBack" src/
```

---

## 📋 ملخص سريع (Quick Summary)

### ✅ النقاط الرئيسية:

1. **3 مستويات للتنقل:**
   - `AppStack` - المستوى الرئيسي
   - `AuthStack` - شاشات المصادقة (Login, SignUp)
   - `BottomTabs` - التبويبات السفلية (5 تبويبات)

2. **الشاشة الافتراضية:** `AuthStack` → `Login`

3. **بعد تسجيل الدخول:** التنقل إلى `BottomTabs`

4. **الشاشات المكررة:** `Home` و `QuestionBank` موجودة في `AppStack` و `BottomTabs`

5. **أسماء عربية:** بعض التبويبات بأسماء عربية (`المناهج`, `الملف الشخصي`)

6. **الشاشات المنفصلة:** يمكن الوصول إليها من أي مكان:
   - `CoursePlayer`, `VidPlayer`, `ExamQuestion`, `ExamResults`, `QuestionStages`

### 🎯 تدفق المستخدم النموذجي:

```
بدء التطبيق
    ↓
Login Screen (AuthStack)
    ↓
[تسجيل الدخول]
    ↓
BottomTabs → Home Tab
    ↓
[اختيار كورس]
    ↓
CoursePlayer Screen
    ↓
[اختيار فيديو]
    ↓
VidPlayer Screen
```

### ⚠️ تحذيرات مهمة:

- عند التنقل إلى تبويبات بأسماء عربية، استخدم الاسم العربي بالضبط
- `Home` و `QuestionBank` موجودة في مكانين - تأكد من التنقل للصحيح
- جميع الشاشات بدون header افتراضي (`headerShown: false`)

