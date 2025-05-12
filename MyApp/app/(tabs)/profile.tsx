import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Edit,
  CreditCard,
  Lock,
  Zap,
  Shield,
  Gift,
  HelpCircle,
  Settings,
  LogOut,
  ArrowRight,
  User,
  ChevronRight,
  Plus
} from 'lucide-react-native';
import { Svg, Circle } from 'react-native-svg';

const { height } = Dimensions.get('window');

const ProfilePage = () => {
  const router = useRouter();
  const scaleAnims = useRef({});
  const scrollRef = useRef(null);
  
  const [user] = useState({
    name: 'Arjun Kumar',
    avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    email: "arjun.kumar@gmail.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    joinDate: "March 2023",
    dob: "12 August 1988",
    kycStatus: "Verified",
    accountType: "Premium",
    upiId: "arjun.kumar@upi",
    occupation: "Software Engineer",
    pan: "ABCTY1234D",
    aadhar: "XXXX-XXXX-7890",
    bankAccounts: [
      { bank: "HDFC Bank", accountNumber: "XXXX-XXXX-4578", type: "Topup balance", ifsc: "HDFC0001234" },
      { bank: "ICICI Bank", accountNumber: "XXXX-XXXX-3456", type: "Current", ifsc: "ICIC0005678" },
    ],
    cards: [
      { type: "Credit Card", bank: "HDFC Bank", number: "XXXX-XXXX-XXXX-4578", expiry: "09/26", variant: "Regalia" },
      { type: "Debit Card", bank: "ICICI Bank", number: "XXXX-XXXX-XXXX-8765", expiry: "05/27", variant: "Platinum" },
    ],
    rewards: 5420,
    referralCode: "ARJUN500",
    notificationPreferences: {
      transactions: true,
      promotions: false,
      accountUpdates: true,
      newServices: true
    },
    activityLog: [
      { action: "Password Changed", date: "April 15, 2025", time: "14:22" },
      { action: "New Device Login", date: "April 10, 2025", time: "09:35" },
      { action: "Profile Updated", date: "March 28, 2025", time: "17:45" },
    ]
  });

  const [activeTab, setActiveTab] = useState('personal');

  // Scroll to top when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [activeTab]);

  // Animation utility function
  const animateElement = (id) => {
    if (!scaleAnims.current[id]) {
      scaleAnims.current[id] = new Animated.Value(1);
    }
    
    Animated.sequence([
      Animated.timing(scaleAnims.current[id], {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims.current[id], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Profile info item component
  const ProfileInfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
      <View style={styles.infoItemLeft}>
        <View style={styles.infoItemIcon}>
          {icon}
        </View>
        <View>
          <Text style={styles.infoItemLabel}>{label}</Text>
          <Text style={styles.infoItemValue}>{value}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Edit size={16} color="#8b5cf6" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8b5cf6" />
      
      {/* Profile Header */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed', '#4338ca']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        {/* Background Patterns */}
        <View style={styles.patternTop}>
          <Svg width={250} height={250} viewBox="0 0 200 200">
            <Circle cx={100} cy={100} r={80} stroke="white" strokeWidth={8} opacity={0.05} />
            <Circle cx={100} cy={100} r={40} stroke="white" strokeWidth={8} opacity={0.05} />
          </Svg>
        </View>
        
        {/* Back Button and Title */}
        <View style={styles.headerNav}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <ArrowRight size={22} color="white" style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={22} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Profile Picture and Basic Info */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarOverlay} activeOpacity={0.7}>
              <Edit size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileOccupation}>{user.occupation}</Text>
            <View style={styles.verificationBadge}>
              <Text style={styles.verificationText}>
                {user.kycStatus === "Verified" ? "✓ Verified" : "Verification Pending"}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      
      {/* Profile Content Card */}
      <View style={styles.contentWrapper}>
        <View style={styles.contentCard}>
          {/* Profile Tabs */}
          <View style={styles.tabsContainer}>
            {['personal', 'banking', 'security', 'settings'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Scrollable content - key fix for scrolling issues */}
          <ScrollView 
            ref={scrollRef}
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
            overScrollMode="always"
          >
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <View style={styles.tabContent}>
                <ProfileInfoItem icon={<Mail size={18} color="#8b5cf6" />} label="Email" value={user.email} />
                <ProfileInfoItem icon={<Phone size={18} color="#8b5cf6" />} label="Phone" value={user.phone} />
                <ProfileInfoItem icon={<MapPin size={18} color="#8b5cf6" />} label="Location" value={user.location} />
                <ProfileInfoItem icon={<Calendar size={18} color="#8b5cf6" />} label="Date of Birth" value={user.dob} />
                <ProfileInfoItem icon={<Clock size={18} color="#8b5cf6" />} label="Member Since" value={user.joinDate} />
                
                <Animated.View 
                  style={[
                    styles.buttonContainer,
                    scaleAnims.current['edit-profile-btn'] ? 
                      { transform: [{ scale: scaleAnims.current['edit-profile-btn'] }] } : 
                      undefined
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => animateElement('edit-profile-btn')}
                    activeOpacity={0.7}
                  >
                    <Edit size={18} color="white" />
                    <Text style={styles.primaryButtonText}>Edit Profile</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
            
            {/* Banking Tab */}
            {activeTab === 'banking' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>UPI ID</Text>
                <View style={styles.upiContainer}>
                  <Text style={styles.upiText}>{user.upiId}</Text>
                  <TouchableOpacity>
                    <Edit size={16} color="#8b5cf6" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>
                <View style={styles.bankAccountsContainer}>
                  {user.bankAccounts.map((account, idx) => (
                    <Animated.View 
                      key={idx} 
                      style={[
                        styles.bankAccountCard,
                        scaleAnims.current[`bank-account-${idx}`] ? 
                          { transform: [{ scale: scaleAnims.current[`bank-account-${idx}`] }] } : 
                          undefined
                      ]}
                    >
                      <TouchableOpacity 
                        style={styles.bankAccountContent}
                        onPress={() => animateElement(`bank-account-${idx}`)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.bankAccountHeader}>
                          <Text style={styles.bankName}>{account.bank}</Text>
                          <View style={styles.accountTypeBadge}>
                            <Text style={styles.accountTypeText}>{account.type}</Text>
                          </View>
                        </View>
                        <View style={styles.bankAccountDetails}>
                          <Text style={styles.accountNumber}>Acc: {account.accountNumber}</Text>
                          <Text style={styles.ifscCode}>IFSC: {account.ifsc}</Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
                
                <Text style={styles.sectionTitle}>Cards</Text>
                <View style={styles.cardsContainer}>
                  {user.cards.map((card, idx) => (
                    <Animated.View 
                      key={idx} 
                      style={[
                        styles.cardWrapper,
                        scaleAnims.current[`card-${idx}`] ? 
                          { transform: [{ scale: scaleAnims.current[`card-${idx}`] }] } : 
                          undefined
                      ]}
                    >
                      <TouchableOpacity 
                        onPress={() => animateElement(`card-${idx}`)}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#8b5cf6', '#4338ca']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.cardGradient}
                        >
                          <View style={styles.cardPattern}>
                            <Svg width={100} height={100} viewBox="0 0 100 100">
                              <Circle cx={50} cy={50} r={40} stroke="white" strokeWidth={6} opacity={0.1} />
                              <Circle cx={50} cy={50} r={20} stroke="white" strokeWidth={6} opacity={0.1} />
                            </Svg>
                          </View>
                          
                          <View style={styles.cardHeader}>
                            <Text style={styles.cardBank}>{card.bank}</Text>
                            <View style={styles.cardVariantBadge}>
                              <Text style={styles.cardVariantText}>{card.variant}</Text>
                            </View>
                          </View>
                          <Text style={styles.cardNumber}>{card.number}</Text>
                          <View style={styles.cardFooter}>
                            <View>
                              <Text style={styles.cardExpiryLabel}>EXPIRES</Text>
                              <Text style={styles.cardExpiryValue}>{card.expiry}</Text>
                            </View>
                            <View>
                              <Text style={styles.cardTypeLabel}>TYPE</Text>
                              <Text style={styles.cardTypeValue}>{card.type}</Text>
                            </View>
                            <View style={styles.cardIconContainer}>
                              <CreditCard size={24} color="white" />
                            </View>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
                
                <Animated.View 
                  style={[
                    styles.buttonContainer,
                    scaleAnims.current['add-payment-btn'] ? 
                      { transform: [{ scale: scaleAnims.current['add-payment-btn'] }] } : 
                      undefined
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.outlineButton}
                    onPress={() => animateElement('add-payment-btn')}
                    activeOpacity={0.7}
                  >
                    <Plus size={18} color="#8b5cf6" />
                    <Text style={styles.outlineButtonText}>Add New Payment Method</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>Security Settings</Text>
                
                <View style={styles.securityOptionsContainer}>
                  <Animated.View 
                    style={[
                      scaleAnims.current['password-setting'] ? 
                        { transform: [{ scale: scaleAnims.current['password-setting'] }] } : 
                        undefined
                    ]}
                  >
                    <TouchableOpacity 
                      style={styles.securityOptionCard}
                      onPress={() => animateElement('password-setting')}
                      activeOpacity={0.7}
                    >
                      <View style={styles.securityOptionLeft}>
                        <View style={[styles.securityOptionIcon, { backgroundColor: '#dbeafe' }]}>
                          <Lock size={18} color="#3b82f6" />
                        </View>
                        <View>
                          <Text style={styles.securityOptionTitle}>Change Password</Text>
                          <Text style={styles.securityOptionSubtitle}>Last changed 30 days ago</Text>
                        </View>
                      </View>
                      <ArrowRight size={18} color="#9ca3af" />
                    </TouchableOpacity>
                  </Animated.View>
                  
                  <View style={styles.securityOptionCard}>
                    <View style={styles.securityOptionLeft}>
                      <View style={[styles.securityOptionIcon, { backgroundColor: '#f3e8ff' }]}>
                        <Zap size={18} color="#8b5cf6" />
                      </View>
                      <View>
                        <Text style={styles.securityOptionTitle}>Two-Factor Authentication</Text>
                        <Text style={styles.securityOptionSubtitle}>Currently enabled</Text>
                      </View>
                    </View>
                    <Switch
                      value={true}
                      onValueChange={() => {}}
                      trackColor={{ false: '#e5e7eb', true: '#f3e8ff' }}
                      thumbColor={true ? '#8b5cf6' : '#9ca3af'}
                    />
                  </View>
                  
                  <View style={styles.securityOptionCard}>
                    <View style={styles.securityOptionLeft}>
                      <View style={[styles.securityOptionIcon, { backgroundColor: '#fee2e2' }]}>
                        <Shield size={18} color="#ef4444" />
                      </View>
                      <View>
                        <Text style={styles.securityOptionTitle}>Face ID Login</Text>
                        <Text style={styles.securityOptionSubtitle}>Secure and fast login</Text>
                      </View>
                    </View>
                    <Switch
                      value={false}
                      onValueChange={() => {}}
                      trackColor={{ false: '#e5e7eb', true: '#f3e8ff' }}
                      thumbColor={false ? '#8b5cf6' : '#9ca3af'}
                    />
                  </View>
                </View>
                
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.activityLogContainer}>
                  {user.activityLog.map((activity, idx) => (
                    <Animated.View 
                      key={idx} 
                      style={[
                        scaleAnims.current[`activity-${idx}`] ? 
                          { transform: [{ scale: scaleAnims.current[`activity-${idx}`] }] } : 
                          undefined
                      ]}
                    >
                      <TouchableOpacity 
                        style={styles.activityLogItem}
                        onPress={() => animateElement(`activity-${idx}`)}
                        activeOpacity={0.7}
                      >
                        <View>
                          <Text style={styles.activityTitle}>{activity.action}</Text>
                          <Text style={styles.activityTime}>{activity.date}, {activity.time}</Text>
                        </View>
                        <TouchableOpacity>
                          <Text style={styles.activityDetailsButton}>Details</Text>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
                
                <Animated.View 
                  style={[
                    styles.buttonContainer,
                    scaleAnims.current['security-checkup-btn'] ? 
                      { transform: [{ scale: scaleAnims.current['security-checkup-btn'] }] } : 
                      undefined
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.dangerOutlineButton}
                    onPress={() => animateElement('security-checkup-btn')}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dangerOutlineButtonText}>Security Checkup</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>Notification Settings</Text>
                
                <View style={styles.notificationSettingsContainer}>
                  {Object.entries(user.notificationPreferences).map(([key, value], idx) => (
                    <View key={idx} style={styles.notificationSettingItem}>
                      <Text style={styles.notificationSettingLabel}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Text>
                      <Switch
                        value={value}
                        onValueChange={() => {}}
                        trackColor={{ false: '#e5e7eb', true: '#f3e8ff' }}
                        thumbColor={value ? '#8b5cf6' : '#9ca3af'}
                      />
                    </View>
                  ))}
                </View>
                
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <View style={styles.accountSettingsContainer}>
                  <Animated.View 
                    style={[
                      scaleAnims.current['refer-earn-btn'] ? 
                        { transform: [{ scale: scaleAnims.current['refer-earn-btn'] }] } : 
                        undefined
                    ]}
                  >
                    <TouchableOpacity 
                      style={styles.accountSettingItem}
                      onPress={() => animateElement('refer-earn-btn')}
                      activeOpacity={0.7}
                    >
                      <View style={styles.accountSettingLeft}>
                        <Gift size={18} color="#8b5cf6" />
                        <Text style={styles.accountSettingLabel}>Refer & Earn</Text>
                      </View>
                      <ChevronRight size={18} color="#9ca3af" />
                    </TouchableOpacity>
                  </Animated.View>
                  
                  <Animated.View 
                    style={[
                      scaleAnims.current['help-support-btn'] ? 
                        { transform: [{ scale: scaleAnims.current['help-support-btn'] }] } : 
                        undefined
                    ]}
                  >
                    <TouchableOpacity 
                      style={styles.accountSettingItem}
                      onPress={() => animateElement('help-support-btn')}
                      activeOpacity={0.7}
                    >
                      <View style={styles.accountSettingLeft}>
                        <HelpCircle size={18} color="#8b5cf6" />
                        <Text style={styles.accountSettingLabel}>Help & Support</Text>
                      </View>
                      <ChevronRight size={18} color="#9ca3af" />
                    </TouchableOpacity>
                  </Animated.View>
                  
                  <Animated.View 
                    style={[
                      scaleAnims.current['appearance-btn'] ? 
                        { transform: [{ scale: scaleAnims.current['appearance-btn'] }] } : 
                        undefined
                    ]}
                  >
                    <TouchableOpacity 
                      style={styles.accountSettingItem}
                      onPress={() => animateElement('appearance-btn')}
                      activeOpacity={0.7}
                    >
                      <View style={styles.accountSettingLeft}>
                        <Settings size={18} color="#8b5cf6" />
                        <Text style={styles.accountSettingLabel}>Appearance</Text>
                      </View>
                      <ChevronRight size={18} color="#9ca3af" />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
                
                <Animated.View 
                  style={[
                    styles.buttonContainer,
                    scaleAnims.current['logout-btn'] ? 
                      { transform: [{ scale: scaleAnims.current['logout-btn'] }] } : 
                      undefined
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={() => animateElement('logout-btn')}
                    activeOpacity={0.7}
                  >
                    <LogOut size={18} color="#ef4444" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 120,
    position: 'relative',
    overflow: 'hidden',
  },
  patternTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.05,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 10,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 8,
    borderRadius: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editAvatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginTop: 12,
    alignItems: 'center',
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileOccupation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  verificationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  verificationText: {
    color: 'white',
    fontSize: 12,
  },
  contentWrapper: {
    marginTop: -80,
    paddingHorizontal: 16,
    paddingBottom: 16, // Added padding to bottom for better display
    zIndex: 20,
    flex: 1, // Added flex: 1 to make content expand
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 1, // Make the card expand to fill space
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6',
  },
  tabText: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: 14,
  },
  activeTabText: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
  scrollViewStyle: {
    flex: 1, // Important for scrolling to work
  },
  scrollViewContent: {
    paddingBottom: 80, // Extra padding at bottom to ensure content is visible
  },
  tabContent: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoItemLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  infoItemValue: {
    fontWeight: '500',
    fontSize: 14,
    color: '#374151',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  outlineButtonText: {
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: 16,
  },
  dangerOutlineButton: {
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerOutlineButtonText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 12,
    marginTop: 20,
  },
  upiContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  upiText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#374151',
  },
  bankAccountsContainer: {
    marginBottom: 20,
  },
  bankAccountCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  bankAccountContent: {
    padding: 16,
  },
  bankAccountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f2937',
  },
  accountTypeBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  accountTypeText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '500',
  },
  bankAccountDetails: {
    marginTop: 8,
  },
  accountNumber: {
    color: '#6b7280',
    fontSize: 13,
  },
  ifscCode: {
    color: '#6b7280',
    fontSize: 13,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardGradient: {
    padding: 16,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  cardPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardBank: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  cardVariantBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  cardVariantText: {
    color: 'white',
    fontSize: 12,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 2,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardExpiryLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  cardExpiryValue: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  cardTypeLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  cardTypeValue: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityOptionsContainer: {
    marginBottom: 20,
  },
  securityOptionCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  securityOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityOptionTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f2937',
  },
  securityOptionSubtitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  activityLogContainer: {
    marginBottom: 20,
  },
  activityLogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f2937',
  },
  activityTime: {
    color: '#6b7280',
    fontSize: 12,
  },
  activityDetailsButton: {
    color: '#8b5cf6',
    fontSize: 12,
  },
  notificationSettingsContainer: {
    marginBottom: 20,
  },
  notificationSettingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notificationSettingLabel: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f2937',
  },
  accountSettingsContainer: {
    marginBottom: 20,
  },
  accountSettingItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountSettingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountSettingLabel: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1f2937',
  },
});

export default ProfilePage;