import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMethod, setAuthMethod] = useState('phone');
  const [countryCode, setCountryCode] = useState('+93');
  const [inputValue, setInputValue] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState(1);
  const [currentTab, setCurrentTab] = useState('home');

  const [adTitle, setAdTitle] = useState('');
  const [adPrice, setAdPrice] = useState('');

  const categories = [
    { id: '1', title: 'مواد غذایی', icon: '🛒' },
    { id: '2', title: 'پوشاک', icon: '👕' },
    { id: '3', title: 'وسایل برقی', icon: '📱' },
    { id: '4', title: 'خودرو', icon: '🚗' },
    { id: '5', title: 'املاک', icon: '🏠' },
  ];

  const [products, setProducts] = useState([
    { id: '101', title: 'موبایل هوشمند', price: '$250', category: 'وسایل برقی' },
    { id: '102', title: 'تویوتا کرولا مدل ۲۰۲۰', price: '$12,500', category: 'خودرو' },
    { id: '103', title: 'آپارتمان ۳ خانه مرکز شهر', price: '$45,000', category: 'املاک' },
    { id: '104', title: 'کاپشن زمستانه مردانه', price: '$40', category: 'پوشاک' },
  ]);

  const handleSendOTP = () => {
    if (!inputValue) {
      Alert.alert('خطا', authMethod === 'phone' ? 'لطفاً شماره تلفن را وارد کنید.' : 'لطفاً ایمیل را وارد کنید.');
      return;
    }
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (!otpCode || otpCode.length < 6) {
      Alert.alert('خطا', 'لطفاً کد ۶ رقمی را وارد کنید.');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleCreateAd = () => {
    if (!adTitle || !adPrice) {
      Alert.alert('خطا', 'لطفاً عنوان و قیمت آگهی را وارد کنید.');
      return;
    }
    const newProduct = {
      id: Date.now().toString(),
      title: adTitle,
      price: `$${adPrice}`,
      category: 'جدید',
    };
    setProducts([newProduct, ...products]);
    Alert.alert('موفقیت', 'آگهی شما با موفقیت ثبت شد!');
    setAdTitle('');
    setAdPrice('');
    setCurrentTab('home');
  };

  if (isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <View style={styles.header}>
          <Text style={styles.logoText}>Blackstarszone</Text>
          <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
            <Text style={styles.logoutText}>خروج</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          {currentTab === 'home' && (
            <ScrollView contentContainerStyle={{ padding: 15 }}>
              <TextInput
                style={styles.searchInput}
                placeholder="جستجوی کالا، خودرو، ملک..."
                placeholderTextColor="#64748b"
              />

              <Text style={styles.sectionTitle}>دسته‌بندی‌های بازار</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                {categories.map((item) => (
                  <View key={item.id} style={styles.categoryCard}>
                    <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                    <Text style={styles.categoryText}>{item.title}</Text>
                  </View>
                ))}
              </ScrollView>

              <Text style={styles.sectionTitle}>جدیدترین آگهی‌ها</Text>
              {products.map((item) => (
                <View key={item.id} style={styles.productCard}>
                  <View>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productCategory}>{item.category}</Text>
                  </View>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          {currentTab === 'add' && (
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={[styles.sectionTitle, { fontSize: 20, textAlign: 'center' }]}>ثبت آگهی جدید</Text>
              
              <Text style={styles.fieldLabel}>عنوان آگهی:</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="مثلاً: تویوتا کامری ۲۰۲۱"
                placeholderTextColor="#64748b"
                value={adTitle}
                onChangeText={setAdTitle}
              />

              <Text style={styles.fieldLabel}>قیمت (دلار):</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="مثلاً: 5000"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
                value={adPrice}
                onChangeText={setAdPrice}
              />

              <TouchableOpacity style={styles.button} onPress={handleCreateAd}>
                <Text style={styles.buttonText}>انتشار آگهی در Blackstarszone</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {currentTab === 'profile' && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>پروفایل کاربر</Text>
              <Text style={{ color: '#94a3b8', marginTop: 10 }}>شماره/ایمیل: {inputValue || 'کاربر مهمان'}</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setCurrentTab('home')} style={styles.navItem}>
            <Text style={{ fontSize: 20 }}>🏠</Text>
            <Text style={[styles.navText, currentTab === 'home' && styles.activeNavText]}>خانه</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentTab('add')} style={styles.navItem}>
            <Text style={{ fontSize: 20 }}>➕</Text>
            <Text style={[styles.navText, currentTab === 'add' && styles.activeNavText]}>ثبت آگهی</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentTab('profile')} style={styles.navItem}>
            <Text style={{ fontSize: 20 }}>👤</Text>
            <Text style={[styles.navText, currentTab === 'profile' && styles.activeNavText]}>حساب من</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Blackstarszone</Text>
          <Text style={styles.subtitle}>ورود یا ثبت‌نام حساب کاربر</Text>

          {step === 1 ? (
            <>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, authMethod === 'phone' && styles.activeTab]}
                  onPress={() => setAuthMethod('phone')}
                >
                  <Text style={[styles.tabText, authMethod === 'phone' && styles.activeTabText]}>شماره تلفن</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, authMethod === 'email' && styles.activeTab]}
                  onPress={() => setAuthMethod('email')}
                >
                  <Text style={[styles.tabText, authMethod === 'email' && styles.activeTabText]}>ایمیل</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                {authMethod === 'phone' && <Text style={styles.countryPrefix}>{countryCode}</Text>}
                <TextInput
                  style={styles.input}
                  placeholder={authMethod === 'phone' ? '799123456' : 'example@gmail.com'}
                  placeholderTextColor="#64748b"
                  keyboardType={authMethod === 'phone' ? 'phone-pad' : 'email-address'}
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>ادامه</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.otpNotice}>کد ۶ رقمی را وارد کنید:</Text>
              <TextInput
                style={[styles.input, styles.otpInput]}
                placeholder="------"
                placeholderTextColor="#64748b"
                keyboardType="number-pad"
                maxLength={6}
                value={otpCode}
                onChangeText={setOtpCode}
              />
              <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>تایید و ورود به بازار</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 400, backgroundColor: '#1e293b', padding: 24, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#38bdf8', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginBottom: 20, marginTop: 4 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#0f172a', borderRadius: 10, padding: 4, marginBottom: 15 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#2563eb' },
  tabText: { color: '#94a3b8', fontWeight: 'bold' },
  activeTabText: { color: '#ffffff' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f172a', borderRadius: 10, borderWidth: 1, borderColor: '#334155', marginBottom: 20, paddingHorizontal: 12 },
  countryPrefix: { color: '#38bdf8', fontWeight: 'bold', marginRight: 8 },
  input: { flex: 1, color: '#ffffff', paddingVertical: 12, fontSize: 16, textAlign: 'right' },
  otpInput: { textAlign: 'center', letterSpacing: 8, fontSize: 22 },
  button: { backgroundColor: '#2563eb', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  otpNotice: { color: '#94a3b8', textAlign: 'center', marginBottom: 15, fontSize: 13 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#1e293b' },
  logoText: { color: '#38bdf8', fontSize: 20, fontWeight: 'bold' },
  logoutText: { color: '#ef4444', fontSize: 14 },
  searchInput: { backgroundColor: '#1e293b', color: '#fff', padding: 12, borderRadius: 10, marginBottom: 15, textAlign: 'right', borderWidth: 1, borderColor: '#334155' },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
  fieldLabel: { color: '#94a3b8', fontSize: 13, marginBottom: 5, textAlign: 'right' },
  categoryCard: { backgroundColor: '#1e293b', padding: 15, borderRadius: 12, alignItems: 'center', marginLeft: 10, width: 90, borderWidth: 1, borderColor: '#334155' },
  categoryText: { color: '#94a3b8', fontSize: 12, marginTop: 5 },
  productCard: { backgroundColor: '#1e293b', padding: 15, borderRadius: 12, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  productTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  productCategory: { color: '#64748b', fontSize: 12, marginTop: 2, textAlign: 'right' },
  productPrice: { color: '#38bdf8', fontWeight: 'bold', fontSize: 15 },
  bottomNav: { flexDirection: 'row-reverse', justifyContent: 'space-around', backgroundColor: '#1e293b', paddingVertical: 10, borderTopWidth: 1, borderColor: '#334155' },
  navItem: { alignItems: 'center' },
  navText: { color: '#64748b', fontSize: 11, marginTop: 2 },
  activeNavText: { color: '#38bdf8', fontWeight: 'bold' },
});
