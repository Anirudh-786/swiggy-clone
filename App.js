import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Get screen dimensions for responsiveness
const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;

// Dummy Data
const categories = [
  { id: '1', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop' },
  { id: '2', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { id: '3', name: 'Chinese', image: 'https://images.unsplash.com/photo-1570898995876-3c8350edada1?q=80&w=268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=200&h=200&fit=crop' },
  { id: '4', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop' },
  { id: '5', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop' },
  { id: '6', name: 'South Indian', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=200&fit=crop' },
];

const restaurants = [{
    id: '1',
    name: 'Indiya Oye (Radisson Blu Nagpur)',
    rating: 4.2,
    time: '35-45 min',
    description: 'Indian, Chinese, Biryani',
    offer: '30% OFF',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'The Pizza Place',
    rating: 4.5,
    time: '30-40 min',
    description: 'Pizzas, Italian, Fast Food',
    offer: '50% OFF up to ₹100',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Burger Nation',
    rating: 4.3,
    time: '20-30 min',
    description: 'Burgers, Fast Food, American',
    offer: 'Free delivery',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Spice Hub',
    rating: 4.2,
    time: '35-45 min',
    description: 'Indian, Chinese, Biryani',
    offer: '30% OFF',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Sweet Tooth',
    rating: 4.7,
    time: '25-35 min',
    description: 'Desserts, Ice Cream, Cakes',
    offer: 'Buy 1 Get 1',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
  },
   {
    id: '6',
    name: 'Mullaji Biryani',
    rating: 4.5,
    time: '20-25 min',
    description: 'Pizzas, Italian, Fast Food',
    offer: '50% OFF up to ₹155',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&h=300&fit=crop',
  },
];

// Theme Colors
const ORANGE = '#FC8019';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F8F8F8';
const GRAY = '#E0E0E0';
const TEXT_PRIMARY = '#1C1C1C';
const TEXT_SECONDARY = '#686B78';

// Tab Item Component
const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(8),
    }}
    activeOpacity={0.7}
  >
    <Feather
      name={icon}
      size={scale(24)}
      color={active ? ORANGE : TEXT_SECONDARY}
    />
    <Text
      style={{
        fontSize: scale(10),
        marginTop: scale(2),
        color: active ? ORANGE : TEXT_SECONDARY,
        fontWeight: active ? '600' : '400',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleRestaurantPress = (restaurantName) => {
    Alert.alert('Restaurant Selected', `You tapped on ${restaurantName}`);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        marginRight: scale(16),
        width: scale(70),
      }}
      activeOpacity={0.7}
      onPress={() => Alert.alert('Category', `You selected ${item.name}`)}
    >
      <View
        style={{
          width: scale(70),
          height: scale(70),
          borderRadius: scale(35),
          backgroundColor: LIGHT_GRAY,
          borderWidth: 1,
          borderColor: GRAY,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          marginTop: scale(8),
          fontSize: scale(12),
          fontWeight: '500',
          color: TEXT_PRIMARY,
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: WHITE,
        borderRadius: scale(12),
        marginBottom: scale(16),
        marginHorizontal: scale(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: scale(8),
        elevation: 5,
        overflow: 'hidden',
      }}
      activeOpacity={0.8}
      onPress={() => handleRestaurantPress(item.name)}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: '100%',
          height: scale(180),
          backgroundColor: GRAY,
        }}
        resizeMode="cover"
      />

      <View
        style={{
          position: 'absolute',
          top: scale(12),
          left: 0,
          backgroundColor: ORANGE,
          paddingVertical: scale(4),
          paddingHorizontal: scale(12),
          borderTopRightRadius: scale(20),
          borderBottomRightRadius: scale(20),
        }}
      >
        <Text style={{ color: WHITE, fontWeight: 'bold', fontSize: scale(12) }}>
          {item.offer}
        </Text>
      </View>

      <View style={{ padding: scale(12) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: scale(18), fontWeight: 'bold', color: TEXT_PRIMARY, flex: 1 }}>
            {item.name}
          </Text>
          <View
            style={{
              backgroundColor: '#48C479',
              borderRadius: scale(6),
              paddingVertical: scale(3),
              paddingHorizontal: scale(8),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: WHITE, fontWeight: 'bold', fontSize: scale(14), marginRight: scale(4) }}>
              {item.rating}
            </Text>
            <Feather name="star" size={scale(12)} color={WHITE} />
          </View>
        </View>

        <Text style={{ fontSize: scale(14), color: TEXT_SECONDARY, marginTop: scale(4) }}>
          {item.description}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: scale(8) }}>
          <Feather name="clock" size={scale(14)} color={TEXT_SECONDARY} />
          <Text style={{ fontSize: scale(14), color: TEXT_SECONDARY, marginLeft: scale(6) }}>
            {item.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <StatusBar backgroundColor={ORANGE} barStyle="light-content" />

      {/* Header */}
      <View
        style={{
          backgroundColor: ORANGE,
          paddingHorizontal: scale(20),
          paddingVertical: scale(30),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="map-pin" size={scale(20)} color={WHITE} />
          <Text style={{ color: WHITE, fontWeight: '600', marginLeft: scale(6), fontSize: scale(16) }}>
            Home - Nagpur
          </Text>
          <Feather name="chevron-down" size={scale(20)} color={WHITE} style={{ marginLeft: scale(4) }} />
        </View>
        <TouchableOpacity onPress={() => Alert.alert('Profile', 'User profile tapped')}>
          <Feather name="user" size={scale(24)} color={WHITE} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(20) }}
        style={{ flex: 1, backgroundColor: LIGHT_GRAY }}
      >
        {/* Search Bar */}
        <View style={{ paddingHorizontal: scale(16), marginTop: scale(16) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: WHITE,
              borderRadius: scale(30),
              paddingHorizontal: scale(16),
              paddingVertical: scale(12),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: scale(4),
              elevation: 3,
            }}
          >
            <Feather name="search" size={scale(20)} color={TEXT_SECONDARY} />
            <TextInput
              placeholder="Search for restaurants or dishes"
              placeholderTextColor={TEXT_SECONDARY}
              style={{
                flex: 1,
                marginLeft: scale(12),
                fontSize: scale(16),
                color: TEXT_PRIMARY,
              }}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={{ marginTop: scale(24) }}>
          <Text
            style={{
              fontSize: scale(18),
              fontWeight: 'bold',
              color: TEXT_PRIMARY,
              paddingHorizontal: scale(16),
              marginBottom: scale(12),
            }}
          >
            What's on your mind?
          </Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: scale(16) }}
          />
        </View>

        {/* Restaurants */}
        <View style={{ marginTop: scale(24), paddingHorizontal: scale(16) }}>
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: 'bold',
              color: TEXT_PRIMARY,
              marginBottom: scale(12),
            }}
          >
            Top restaurants for you
          </Text>
          <FlatList
            data={restaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: WHITE,
          borderTopWidth: 1,
          borderTopColor: GRAY,
          paddingBottom: scale(10),
          paddingTop: scale(5),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: scale(4),
          elevation: 8,
        }}
      >
        <TabItem icon="home" label="Home" active={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
        <TabItem icon="search" label="Search" active={activeTab === 'Search'} onPress={() => setActiveTab('Search')} />
        <TabItem icon="shopping-cart" label="Cart" active={activeTab === 'Cart'} onPress={() => setActiveTab('Cart')} />
        <TabItem icon="user" label="Profile" active={activeTab === 'Profile'} onPress={() => setActiveTab('Profile')} />
      </View>
    </SafeAreaView>
  );
}
