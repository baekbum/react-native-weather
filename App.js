import React, { useEffect, useState } from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "";

export default App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    setWeather(data);
  };
  const getLocation = () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude);
      setIsLoading(true);
    } catch (error) {
      Alert.alert("오류", "데이터를 찾을 수 없습니다.");
    }
  }
  useEffect(() => {
    getLocation();
  },[])
  return (
    isLoading ? (<Loading />) : null
  );
}
