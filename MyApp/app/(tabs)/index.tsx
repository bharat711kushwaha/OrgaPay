import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Animated,
  Dimensions,
  StatusBar as RNStatusBar,
  Platform,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native';
import { 
  Wallet, 
  Send, 
  MessageSquare, 
  Wifi, 
  Zap, 
  Ticket, 
  Shield, 
  CreditCard, 
  Receipt, 
  ShoppingCart, 
  Grid3X3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Repeat, 
  ChevronRight,
  BadgeIndianRupee,
  BanknoteIcon,
  Bell,
  Menu,
  Home,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Svg, Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 280; // Maximum header height
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 100; // Minimum header height when scrolled
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// Custom OrigamiIcon component for Orgaveda
const OrigamiIcon = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 3l18 18M3 21l18-18M12 12L5 5M12 12l7 7M12 12l7-7M12 12l-7 7" />
  </Svg>
);

const HomeScreen = () => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // For individual item press animations
  const itemScaleAnims = useRef({});

  // For card reveal animation on render
  const [cardsVisible, setCardsVisible] = useState(false);
  useEffect(() => {
    // Delayed reveal for smoother load experience
    setTimeout(() => setCardsVisible(true), 100);
  }, []);
  
  // User data with Indian name
  const [user] = useState({ 
    name: 'Arjun Kumar', 
    avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    email: "arjun.kumar@gmail.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    joinDate: "March 2023",
    notifications: 3
  });

  // Updated balance cards array with proper color codes
  const balances = [
    { 
      type: "Earnings", 
      amount: "₹56,785.42", 
      color: "#10b981", 
      textColor: "#10b981", 
      bgColor: "#dcfce7", 
      icon: <BadgeIndianRupee size={20} color="#10b981" /> 
    },
    { 
      type: "Topup balance", 
      amount: "₹24,450.54", 
      color: "#8b5cf6", 
      textColor: "#8b5cf6", 
      bgColor: "#f3e8ff", 
      icon: <BanknoteIcon size={20} color="#8b5cf6" /> 
    },
    { 
      type: "Orgaveda", 
      amount: "₹5,200.00", 
      color: "#3b82f6", 
      textColor: "#3b82f6", 
      bgColor: "#dbeafe", 
      icon: <OrigamiIcon size={20} color="#3b82f6" /> 
    },
    { 
      type: "Credit", 
      amount: "-₹75,200.00", 
      color: "#ef4444", 
      textColor: "#ef4444", 
      bgColor: "#fee2e2", 
      icon: <CreditCard size={20} color="#ef4444" /> 
    }
  ];

  // Modified quick actions with utilities and withdrawal
  const quickActions = [
    { icon: <Wallet size={20} color="#8b5cf6" />, label: "Top Up", href: "/deposit", color: "#8b5cf6", bg: "#f3e8ff" },
    { icon: <Send size={20} color="#3b82f6" />, label: "Send", href: "#", color: "#3b82f6", bg: "#dbeafe" },
    { icon: <BanknoteIcon size={20} color="#ef4444" />, label: "Withdraw", href: "/withdraw", color: "#ef4444", bg: "#fee2e2" },
    { icon: <Zap size={20} color="#f59e0b" />, label: "Utilities", href: "#", color: "#f59e0b", bg: "#fef3c7" },
  ];

  const paymentOptions = [
    { icon: <Wifi size={18} color="white" />, label: "Internet", color: "#818cf8" },
    { icon: <Zap size={18} color="white" />, label: "Electricity", color: "#60a5fa" },
    { icon: <MessageSquare size={18} color="white" />, label: "Mobile", color: "#4ade80" },
    { icon: <Ticket size={18} color="white" />, label: "Voucher", color: "#a78bfa" },
    { icon: <Shield size={18} color="white" />, label: "Insurance", color: "#22d3ee" },
    { icon: <Receipt size={18} color="white" />, label: "Tax", color: "#fbbf24" },
    { icon: <CreditCard size={18} color="white" />, label: "Cards", color: "#f472b6" },
    { icon: <Grid3X3 size={18} color="white" />, label: "More", color: "#9ca3af" },
  ];

  // Recent transactions data with Indian context
  const recentTransactions = [
    { type: "income", title: "Salary Credited", amount: "+₹45,000.00", date: "Today, 14:30", icon: <ArrowUpRight size={16} color="#10b981" /> },
    { type: "expense", title: "BigBasket Order", amount: "-₹2,450.80", date: "Yesterday, 09:15", icon: <ArrowDownLeft size={16} color="#ef4444" /> },
    { type: "transfer", title: "HDFC Card Bill", amount: "-₹12,250.00", date: "May 05, 2025", icon: <Repeat size={16} color="#3b82f6" /> },
  ];

  // Animation utility function - uses individual scale animations for items
  const animateElement = (id) => {
    if (!itemScaleAnims.current[id]) {
      itemScaleAnims.current[id] = new Animated.Value(1);
    }
    
    Animated.sequence([
      Animated.timing(itemScaleAnims.current[id], {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(itemScaleAnims.current[id], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Create dynamic header styles based on scroll position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Render transaction item for FlatList
  const renderTransactionItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.transactionItem}
      onPress={() => {
        animateElement(`transaction-${index}`);
        // Here you could also navigate to transaction details
      }}
      activeOpacity={0.7}
    >
      <View style={styles.transactionItemLeft}>
        <Animated.View 
          style={[
            styles.transactionIcon, 
            { 
              backgroundColor: item.type === 'income' ? '#dcfce7' : 
                              item.type === 'expense' ? '#fee2e2' : '#dbeafe' 
            },
            itemScaleAnims.current[`transaction-${index}`] ? 
              { transform: [{ scale: itemScaleAnims.current[`transaction-${index}`] }] } : 
              undefined
          ]}
        >
          {item.icon}
        </Animated.View>
        <View>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
      </View>
      <Text 
        style={[
          styles.transactionAmount,
          { 
            color: item.type === 'income' ? '#10b981' : 
                  item.type === 'expense' ? '#ef4444' : '#3b82f6' 
          }
        ]}
      >
        {item.amount}
      </Text>
    </TouchableOpacity>
  );

  // Render the content section
  const renderContent = () => (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: HEADER_MAX_HEIGHT }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Animated cards entry */}
      <Animated.View style={[
        styles.contentContainer,
        cardsVisible ? { 
          opacity: 1, 
          transform: [{ translateY: 0 }] 
        } : { 
          opacity: 0, 
          transform: [{ translateY: 50 }] 
        }
      ]}>
        {/* Balance cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.balanceCardsContainer}
          style={styles.balanceCardsScrollView}
        >
          {balances.map((balance, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.balanceCard}
              onPress={() => animateElement(`balance-${idx}`)}
              activeOpacity={0.8}
            >
              <View style={[styles.balanceIcon, { backgroundColor: balance.bgColor }]}>
                {React.cloneElement(balance.icon, { color: balance.textColor })}
              </View>
              <Text style={styles.balanceType}>{balance.type}</Text>
              <Animated.Text 
                style={[
                  styles.balanceAmount, 
                  { color: balance.amount.startsWith('-') ? '#ef4444' : '#111827' },
                  itemScaleAnims.current[`balance-${idx}`] ? 
                    { transform: [{ scale: itemScaleAnims.current[`balance-${idx}`] }] } : 
                    undefined
                ]}
              >
                {balance.amount}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main content area */}
        <View style={styles.mainContent}>
          {/* Quick actions */}
          <Animated.View 
            style={[
              styles.card, 
              styles.elevatedCard,
              { transform: [{ translateY: scrollY.interpolate({
                inputRange: [0, 200],
                outputRange: [0, -20],
                extrapolate: 'clamp',
              }) }] }
            ]}
          >
            <SectionHeader title="Quick Actions" />
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.quickActionItem}
                  onPress={() => {
                    animateElement(`action-${index}`);
                    if (action.href) router.push(action.href);
                  }}
                  activeOpacity={0.7}
                >
                  <Animated.View 
                    style={[
                      styles.quickActionIcon, 
                      { backgroundColor: action.bg },
                      itemScaleAnims.current[`action-${index}`] ? 
                        { transform: [{ scale: itemScaleAnims.current[`action-${index}`] }] } : 
                        undefined
                    ]}
                  >
                    {action.icon}
                  </Animated.View>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Transaction Card */}
          <Animated.View 
            style={[
              styles.card, 
              styles.elevatedCard,
              { transform: [{ translateY: scrollY.interpolate({
                inputRange: [0, 250],
                outputRange: [0, -15],
                extrapolate: 'clamp',
              }) }] }
            ]}
          >
            <SectionHeader 
              title="Transaction Overview" 
              actionText="See all" 
              onPress={() => router.push('/transactions')} 
            />

            <View style={styles.transactionOverviewGrid}>
              <TouchableOpacity 
                style={styles.transactionOverviewItem}
                activeOpacity={0.7}
              >
                <View style={[styles.transactionOverviewGradient, { backgroundColor: '#f3e8ff' }]}>
                  <View style={styles.purpleGradientBubble} />
                  <View style={styles.transactionOverviewIconContainer}>
                    <TrendingUp size={20} color="#8b5cf6" />
                  </View>
                  <Text style={styles.transactionOverviewLabel}>Income</Text>
                  <Text style={styles.transactionOverviewAmount}>₹69,500</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.transactionOverviewItem}
                activeOpacity={0.7}
              >
                <View style={[styles.transactionOverviewGradient, { backgroundColor: '#fee2e2' }]}>
                  <View style={styles.redGradientBubble} />
                  <View style={styles.transactionOverviewIconContainer}>
                    <ArrowDownLeft size={20} color="#ef4444" />
                  </View>
                  <Text style={styles.transactionOverviewLabel}>Expense</Text>
                  <Text style={styles.transactionOverviewAmount}>₹16,567</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.transactionOverviewItem}
                activeOpacity={0.7}
              >
                <View style={[styles.transactionOverviewGradient, { backgroundColor: '#dbeafe' }]}>
                  <View style={styles.blueGradientBubble} />
                  <View style={styles.transactionOverviewIconContainer}>
                    <Repeat size={20} color="#3b82f6" />
                  </View>
                  <Text style={styles.transactionOverviewLabel}>Transfers</Text>
                  <Text style={styles.transactionOverviewAmount}>₹12,250</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.divider} />
            
            <SectionHeader 
              title="Recent Transactions" 
              actionText="View all" 
              onPress={() => router.push('/transactions')} 
            />
            
            <FlatList
              data={recentTransactions}
              renderItem={renderTransactionItem}
              keyExtractor={(item, index) => `transaction-${index}`}
              scrollEnabled={false}
              style={styles.transactionsList}
            />
          </Animated.View>

          {/* Payment list */}
          <Animated.View 
            style={[
              styles.card, 
              styles.elevatedCard,
              { transform: [{ translateY: scrollY.interpolate({
                inputRange: [0, 300],
                outputRange: [0, -10],
                extrapolate: 'clamp',
              }) }] }
            ]}
          >
            <SectionHeader title="Bill Payments" actionText="More" />
            <View style={styles.paymentGrid}>
              {paymentOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.paymentOption}
                  onPress={() => animateElement(`payment-${index}`)}
                  activeOpacity={0.7}
                >
                  <Animated.View 
                    style={[
                      styles.paymentIcon, 
                      { backgroundColor: option.color },
                      itemScaleAnims.current[`payment-${index}`] ? 
                        { transform: [{ scale: itemScaleAnims.current[`payment-${index}`] }] } : 
                        undefined
                    ]}
                  >
                    {option.icon}
                  </Animated.View>
                  <Text style={styles.paymentLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    </Animated.ScrollView>
  );

  // Render the header
  const renderHeader = () => (
    <Animated.View
      style={[
        styles.header,
        { height: headerHeight }
      ]}
    >
      <LinearGradient
        colors={['#7e22ce', '#6d28d9', '#4338ca']}
        style={styles.headerGradient}
      >
        {/* Background patterns */}
        <View style={styles.patternTop}>
          <Svg width={250} height={250} viewBox="0 0 200 200">
            <Circle cx={100} cy={100} r={80} stroke="white" strokeWidth={8} opacity={0.05} />
            <Circle cx={100} cy={100} r={40} stroke="white" strokeWidth={8} opacity={0.05} />
          </Svg>
        </View>
        <View style={styles.patternBottom}>
          <Svg width={150} height={150} viewBox="0 0 100 100">
            <Path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="white" strokeWidth={8} opacity={0.05} />
          </Svg>
        </View>
        
        {/* Compact header when scrolled */}
        <Animated.View 
          style={[
            styles.compactHeader,
            { opacity: headerTitleOpacity }
          ]}
        >
          <View style={styles.compactHeaderContent}>
            <View style={styles.compactHeaderLeft}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.compactAvatar}
              />
              <Text style={styles.compactTitle}>Arjun's Dashboard</Text>
            </View>
            <TouchableOpacity style={styles.compactButton}>
              <Bell size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Full header content when at top */}
        <Animated.View 
          style={[
            styles.expandedHeader,
            { opacity: headerContentOpacity }
          ]}
        >
          {/* Profile avatar and name */}
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.profileContainer}
              onPress={() => {
                animateElement('profile-avatar');
                router.push("");
              }}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <Animated.View 
                  style={[
                    styles.avatar,
                    itemScaleAnims.current['profile-avatar'] ? 
                      { transform: [{ scale: itemScaleAnims.current['profile-avatar'] }] } : 
                      undefined
                  ]}
                >
                  <Image
                    source={{ uri: user.avatar }}
                    style={styles.avatarImage}
                  />
                </Animated.View>
                <View style={styles.onlineIndicator} />
              </View>
              <View>
                <Text style={styles.greetingText}>Namaste,</Text>
                <Text style={styles.nameText}>{user.name}</Text>
              </View>
            </TouchableOpacity>
            
            {/* Notification and menu icons */}
            <View style={styles.actionIcons}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => animateElement('notification-btn')}
              >
                <Bell size={20} color="white" />
                {user.notifications > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{user.notifications}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Total Earnings Section */}
          <View style={styles.earningsContainer}>
            <Text style={styles.earningsLabel}>Total Earnings</Text>
            <Text style={styles.earningsAmount}>₹1,25,500.42</Text>
            <View style={styles.earningsGrowth}>
              <ArrowUpRight size={16} color="#86efac" />
              <Text style={styles.earningsGrowthText}>+₹12,450 this month</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Main content */}
      {renderContent()}
      
      {/* Header with both compact and expanded views */}
      {renderHeader()}
    </SafeAreaView>
  );
};

// Section Header Component
const SectionHeader = ({ title, actionText, onPress }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionText && (
      <TouchableOpacity 
        style={styles.sectionAction}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionActionText}>{actionText}</Text>
        <ChevronRight size={16} color="#8b5cf6" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    opacity: 0,
    transform: [{ translateY: 50 }],
    // Animation timing on mount
    ...Platform.select({
      ios: {
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      },
      android: {
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      },
      default: {
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      },
    }),
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 10,
  },
  headerGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : RNStatusBar.currentHeight,
    paddingHorizontal: 16,
    paddingBottom: 30,
    position: 'relative',
  },
  compactHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 45 : RNStatusBar.currentHeight + 5,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  compactHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  compactTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  compactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedHeader: {
    marginTop: Platform.OS === 'ios' ? 30 : RNStatusBar.currentHeight + 10,
  },
  patternTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.05,
  },
  patternBottom: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    opacity: 0.05,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#10b981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  greetingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  nameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 20,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  earningsContainer: {
    marginTop: 24,
    marginBottom: 8,
    zIndex: 10,
  },
  earningsLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  earningsAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  earningsGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  earningsGrowthText: {
    color: '#86efac',
    fontSize: 14,
    marginLeft: 4,
  },
  scrollContent: {
    paddingBottom: 50, // Reduced padding now that bottom navigation is removed
  },
  balanceCardsScrollView: {
    marginTop: 30,
  },
  balanceCardsContainer: {
    paddingHorizontal: 16,
    paddingRight: 8,
    marginBottom: 8,
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 140, // Reduced from 160 to fit more cards on screen
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  balanceType: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 14,
  },
  balanceAmount: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionActionText: {
    color: '#8b5cf6',
    fontWeight: '500',
    fontSize: 14,
    marginRight: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  transactionOverviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  transactionOverviewItem: {
    width: (width - 72) / 3, // Accounting for padding and gaps
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionOverviewGradient: {
    padding: 16,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  purpleGradientBubble: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  redGradientBubble: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  blueGradientBubble: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  transactionOverviewIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionOverviewLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  transactionOverviewAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 20,
  },
  transactionsList: {
    marginTop: 8,
  },
  recentTransactions: {
    marginTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentOption: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  }
});

export default HomeScreen;