import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  Animated, 
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  CreditCard,
  Building,
  Wallet,
  Check,
  Coins,
  ChevronLeft,
  BadgeIndianRupee,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Info
} from 'lucide-react-native';
import { Svg, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Withdraw = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const scaleAnims = useRef({});
  
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const quickAmounts = [500, 1000, 2500, 5000];
  
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
  
  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      // Show error toast - we'll use alert as a simple substitute
      alert("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Show success message
      alert(`Withdrawal of ₹${amount} initiated via ${getMethodName(selectedMethod)}`);
      
      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        setAmount("");
      }, 3000);
    }, 1500);
  };
  
  const getMethodName = (method) => {
    const methods = {
      "bank-card": "Bank Card",
      "bank-account": "Bank Account",
      "usdt": "USDT",
      "wallet": "Digital Wallet",
      "check": "Check"
    };
    return methods[method] || method;
  };
  
  // Recent transactions data
  const recentWithdrawals = [
    { type: "withdrawal", title: "Bank Withdrawal", amount: "-₹25,000.00", date: "Yesterday, 14:30", icon: <ArrowDownLeft size={16} color="#ef4444" /> },
    { type: "withdrawal", title: "HDFC Card", amount: "-₹10,000.00", date: "Apr 22, 2025", icon: <ArrowDownLeft size={16} color="#ef4444" /> },
    { type: "transfer", title: "To Topup balance", amount: "-₹5,000.00", date: "Apr 15, 2025", icon: <Repeat size={16} color="#3b82f6" /> },
  ];
  
  const withdrawalMethods = [
    {
      id: "bank-card",
      icon: <CreditCard size={22} color="#2563eb" />,
      title: "Bank Card",
      description: "Instant transfer to your linked card",
      bgColor: "#dbeafe",
      processingTime: "Instant to 2 hours",
      fee: "₹0 (Free)"
    },
    {
      id: "bank-account",
      icon: <Building size={22} color="#8b5cf6" />,
      title: "Bank Account",
      description: "Transfer to your bank account",
      bgColor: "#f3e8ff",
      processingTime: "1-2 business days",
      fee: "₹0 (Free)"
    },
    {
      id: "usdt",
      icon: <Coins size={22} color="#ca8a04" />,
      title: "USDT",
      description: "Withdraw to USDT wallet",
      bgColor: "#fef9c3",
      processingTime: "30-60 minutes",
      fee: "Network fee applies"
    },
    {
      id: "wallet",
      icon: <Wallet size={22} color="#16a34a" />,
      title: "Digital Wallet",
      description: "Send to your digital wallet",
      bgColor: "#dcfce7",
      processingTime: "Instant",
      fee: "₹0 (Free)"
    },
    {
      id: "check",
      icon: <Check size={22} color="#dc2626" />,
      title: "Check",
      description: "Request a physical check",
      bgColor: "#fee2e2",
      processingTime: "7-10 business days",
      fee: "₹100 delivery fee"
    }
  ];
  
  // Get currently selected method details
  const selectedMethodDetails = withdrawalMethods.find(method => method.id === selectedMethod);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8b5cf6" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContainer}
      >
        <ScrollView 
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header with Gradient */}
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
            
            {/* Header Content */}
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ChevronLeft size={24} color="white" />
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>Withdraw</Text>
              
              <View style={styles.placeholderIcon} />
            </View>
          </LinearGradient>
          
          {/* Balance Card */}
          <View style={styles.balanceCardContainer}>
            <View style={styles.balanceCard}>
              <View style={styles.balanceCardHeader}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <View style={styles.instantBadge}>
                  <BadgeIndianRupee size={12} color="#16a34a" style={{marginRight: 4}} />
                  <Text style={styles.instantBadgeText}>Instant Withdraw</Text>
                </View>
              </View>
              
              <Text style={styles.balanceAmount}>₹1,25,500.42</Text>
              
              <View style={styles.balanceCardFooter}>
                <View style={styles.limitBadge}>
                  <Text style={styles.limitBadgeText}>24h Limit: ₹50,000</Text>
                </View>
                <View style={styles.processingInfo}>
                  <Clock size={14} color="#6b7280" style={{marginRight: 4}} />
                  <Text style={styles.processingInfoText}>Processed in 10 minutes</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Recent Withdrawals */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Withdrawals</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.withdrawalsList}>
              {recentWithdrawals.map((transaction, idx) => (
                <Animated.View 
                  key={idx} 
                  style={[
                    styles.withdrawalItem,
                    scaleAnims.current[`withdraw-${idx}`] ? 
                      { transform: [{ scale: scaleAnims.current[`withdraw-${idx}`] }] } : 
                      undefined
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.withdrawalItemContent}
                    onPress={() => animateElement(`withdraw-${idx}`)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.withdrawalItemLeft}>
                      <View style={[
                        styles.withdrawalItemIcon,
                        {backgroundColor: transaction.type === 'withdrawal' ? '#fee2e2' : '#dbeafe'}
                      ]}>
                        {transaction.icon}
                      </View>
                      <View>
                        <Text style={styles.withdrawalItemTitle}>{transaction.title}</Text>
                        <Text style={styles.withdrawalItemDate}>{transaction.date}</Text>
                      </View>
                    </View>
                    <Text style={styles.withdrawalItemAmount}>{transaction.amount}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
          
          {/* Withdraw Form */}
          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              {showSuccess ? (
                <View style={styles.successContainer}>
                  <View style={styles.successIconContainer}>
                    <Check size={30} color="#16a34a" />
                  </View>
                  <Text style={styles.successTitle}>Withdrawal Initiated!</Text>
                  <Text style={styles.successMessage}>
                    Your withdrawal of ₹{amount} is being processed
                  </Text>
                  <View style={styles.successTimeInfo}>
                    <Clock size={14} color="#6b7280" style={{marginRight: 4}} />
                    <Text style={styles.successTimeText}>
                      Estimated completion: {selectedMethodDetails?.processingTime}
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.amountInputContainer}>
                    <Text style={styles.inputLabel}>Amount to Withdraw</Text>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.currencySymbol}>₹</Text>
                      <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        placeholderTextColor="#9ca3af"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                      />
                    </View>
                    
                    <View style={styles.minMaxContainer}>
                      <Text style={styles.minMaxText}>Min: ₹500.00</Text>
                      <Text style={styles.minMaxText}>Max: ₹50,000.00</Text>
                    </View>
                  </View>
                  
                  <View style={styles.quickAmountsContainer}>
                    {quickAmounts.map((amt, index) => (
                      <Animated.View 
                        key={amt}
                        style={[
                          styles.quickAmountWrapper,
                          scaleAnims.current[`quick-amount-${index}`] ? 
                            { transform: [{ scale: scaleAnims.current[`quick-amount-${index}`] }] } : 
                            undefined
                        ]}
                      >
                        <TouchableOpacity
                          style={[
                            styles.quickAmountButton,
                            amount === amt.toString() && styles.quickAmountButtonActive
                          ]}
                          onPress={() => {
                            setAmount(amt.toString());
                            animateElement(`quick-amount-${index}`);
                          }}
                          activeOpacity={0.7}
                        >
                          <Text 
                            style={[
                              styles.quickAmountText,
                              amount === amt.toString() && styles.quickAmountTextActive
                            ]}
                          >
                            ₹{amt.toLocaleString()}
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    ))}
                  </View>
                  
                  <View style={styles.methodsContainer}>
                    <Text style={styles.inputLabel}>Select Withdrawal Method</Text>
                    <View style={styles.methodsList}>
                      {withdrawalMethods.map((method, index) => (
                        <Animated.View 
                          key={method.id}
                          style={[
                            scaleAnims.current[`method-${index}`] ? 
                              { transform: [{ scale: scaleAnims.current[`method-${index}`] }] } : 
                              undefined
                          ]}
                        >
                          <TouchableOpacity 
                            style={[
                              styles.methodCard,
                              selectedMethod === method.id && styles.methodCardActive
                            ]}
                            onPress={() => {
                              setSelectedMethod(method.id);
                              animateElement(`method-${index}`);
                            }}
                            activeOpacity={0.7}
                          >
                            <View style={[
                              styles.methodIconContainer,
                              {backgroundColor: method.bgColor}
                            ]}>
                              {method.icon}
                            </View>
                            <View style={styles.methodInfo}>
                              <Text style={styles.methodTitle}>{method.title}</Text>
                              <Text style={styles.methodDescription}>{method.description}</Text>
                            </View>
                            <View style={[
                              styles.methodCheckbox,
                              selectedMethod === method.id && styles.methodCheckboxActive
                            ]}>
                              {selectedMethod === method.id && (
                                <Check size={16} color="white" />
                              )}
                            </View>
                          </TouchableOpacity>
                        </Animated.View>
                      ))}
                    </View>
                  </View>
                  
                  {/* Processing Information */}
                  <View style={styles.infoCard}>
                    <View style={styles.infoCardContent}>
                      <Info size={18} color="#8b5cf6" style={{marginRight: 12}} />
                      <View>
                        <Text style={styles.infoCardTitle}>Withdrawal Information</Text>
                        <View style={styles.infoGridContainer}>
                          <View style={styles.infoGridItem}>
                            <Text style={styles.infoLabel}>Processing Time</Text>
                            <Text style={styles.infoValue}>{selectedMethodDetails?.processingTime}</Text>
                          </View>
                          <View style={styles.infoGridItem}>
                            <Text style={styles.infoLabel}>Fee</Text>
                            <Text style={styles.infoValue}>{selectedMethodDetails?.fee}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  
                  {/* Additional info based on selected method */}
                  {selectedMethod === "usdt" && (
                    <View style={[styles.infoCard, styles.warningCard]}>
                      <View style={styles.infoCardContent}>
                        <AlertCircle size={18} color="#ca8a04" style={{marginRight: 12}} />
                        <View style={{flex: 1}}>
                          <Text style={styles.warningCardTitle}>Important USDT Information</Text>
                          <Text style={styles.warningCardText}>
                            Please double-check your wallet address. Transactions cannot be reversed once initiated.
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  
                  {selectedMethod === "check" && (
                    <View style={[styles.infoCard, styles.errorCard]}>
                      <View style={styles.infoCardContent}>
                        <AlertCircle size={18} color="#dc2626" style={{marginRight: 12}} />
                        <View style={{flex: 1}}>
                          <Text style={styles.errorCardTitle}>Check Delivery Information</Text>
                          <Text style={styles.errorCardText}>
                            Physical checks are delivered by courier and require signature confirmation. Additional ₹100 fee applies.
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  
                  <TouchableOpacity 
                    style={[
                      styles.withdrawButton,
                      (!amount || isProcessing) && styles.withdrawButtonDisabled
                    ]}
                    onPress={handleWithdraw}
                    disabled={!amount || isProcessing}
                    activeOpacity={0.8}
                  >
                    {isProcessing ? (
                      <View style={styles.processingContent}>
                        <ActivityIndicator size="small" color="white" style={{marginRight: 8}} />
                        <Text style={styles.withdrawButtonText}>Processing...</Text>
                      </View>
                    ) : (
                      <Text style={styles.withdrawButtonText}>
                        Withdraw ₹{amount ? parseFloat(amount).toLocaleString() : '0'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
            
            <Text style={styles.footerText}>
              Withdrawals processed Monday-Friday. Weekend requests will be processed on the next business day.
            </Text>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  patternTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.05,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholderIcon: {
    width: 40,
    height: 40,
  },
  balanceCardContainer: {
    marginTop: -40,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  instantBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instantBadgeText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  balanceCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  limitBadge: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  limitBadgeText: {
    color: '#8b5cf6',
    fontSize: 12,
    fontWeight: '500',
  },
  processingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  processingInfoText: {
    color: '#6b7280',
    fontSize: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    color: '#8b5cf6',
    fontSize: 14,
    fontWeight: '500',
  },
  withdrawalsList: {
    marginBottom: 8,
  },
  withdrawalItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  withdrawalItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  withdrawalItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  withdrawalItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawalItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  withdrawalItemDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  withdrawalItemAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    marginBottom: 16,
  },
  amountInputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    height: 56,
  },
  currencySymbol: {
    position: 'absolute',
    left: 16,
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  amountInput: {
    flex: 1,
    height: 56,
    paddingLeft: 32,
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  minMaxText: {
    fontSize: 12,
    color: '#6b7280',
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAmountWrapper: {
    width: (width - 96) / 4, // Account for container padding and gaps
  },
  quickAmountButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAmountButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  quickAmountText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
  quickAmountTextActive: {
    color: 'white',
  },
  methodsContainer: {
    marginBottom: 20,
  },
  methodsList: {
    gap: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  methodCardActive: {
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  methodDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  methodCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodCheckboxActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  infoCard: {
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  warningCard: {
    backgroundColor: '#fef9c3',
  },
  errorCard: {
    backgroundColor: '#fee2e2',
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  warningCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ca8a04',
    marginBottom: 4,
  },
  warningCardText: {
    fontSize: 12,
    color: '#78716c',
    lineHeight: 18,
  },
  errorCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#dc2626',
    marginBottom: 4,
  },
  errorCardText: {
    fontSize: 12,
    color: '#78716c',
    lineHeight: 18,
  },
  infoGridContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  infoGridItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginTop: 2,
  },
  withdrawButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  withdrawButtonDisabled: {
    backgroundColor: '#c4b5fd',
    shadowOpacity: 0.1,
  },
  withdrawButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  processingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 20,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 16,
  },
  successTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successTimeText: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default Withdraw;