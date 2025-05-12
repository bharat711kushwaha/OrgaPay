import { Tabs, useRouter, usePathname } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { 
  Home, 
  LayoutList, 
  BanknoteIcon, 
  Upload, 
  User, 
  Plus 
} from 'lucide-react-native';
import Header from '../../components/Header';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Función para determinar el título basado en la ruta actual
  const getHeaderTitle = () => {
    if (pathname === '/(tabs)' || pathname === '/(tabs)/index') return 'Home';
    if (pathname === '/(tabs)/transactions') return 'Transactions';
    if (pathname === '/(tabs)/withdraw') return 'Withdraw';
    if (pathname === '/(tabs)/profile') return 'Profile';
    if (pathname === '/(tabs)/deposit') return 'Deposit';
    return 'MyApp';
  };
  
  return (
    <View style={{ flex: 1 }}>
      {/* Header permanente */}
      <Header title={getHeaderTitle()} />
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' } // Hide default tab bar
        }}
        tabBar={props => (
          <View style={styles.bottomNavigation}>
            {['Home', 'Transactions', '', 'Deposit', 'Profile'].map((label, index) => {
              // Middle empty slot for FAB
              if (index === 2) {
                return (
                  <View key={index} style={styles.fabContainer}>
                    <TouchableOpacity
                      style={styles.fab}
                      onPress={() => router.push('/withdraw')}
                      activeOpacity={0.8}
                    >
                      <BanknoteIcon size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                );
              }

              // For regular nav items - use the exact file paths based on your folder structure
              let routeName = '';
              if (index === 0) routeName = '/(tabs)';
              else if (index === 1) routeName = '/(tabs)/transactions';
              else if (index === 3) routeName = '/(tabs)/deposit';
              else if (index === 4) routeName = '/(tabs)/profile';
              
              // Check if path is active - needs to match your file structure
              const active = pathname === routeName || 
                         (index === 0 && pathname === '/(tabs)/index') ||
                         (pathname && pathname.startsWith(routeName));
                         
              // Icons for tabs
              const Icon = index === 0 ? Home : 
                          index === 1 ? LayoutList : 
                          index === 3 ? Upload : User;
                          
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.navItem}
                  onPress={() => router.push(routeName)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
                    <Icon size={22} color={active ? '#8b5cf6' : '#64748b'} />
                  </View>
                  <Text style={[styles.navText, active && styles.activeNavText]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: 'Transactions',
          }}
        />
        <Tabs.Screen
          name="deposit"
          options={{
            title: 'Deposit',
          }}
        />
        <Tabs.Screen
          name="withdraw"
          options={{
            title: 'Withdraw',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
    </View>
  );
}


const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 25 : 20, // Extra padding for iPhone home indicator
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  navText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
  fabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginTop: -30, // Lift up the FAB
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});