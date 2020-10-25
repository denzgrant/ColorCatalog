import { useState, useEffect } from "react";
import { generate } from "shortid";
import AsyncStorage from '@react-native-community/async-storage';

export const useColors = () => {
  const [colors, setColors] = useState([]);

  const loadColors = async () => {
      // save any data from AysncStorage
    const colorData = await AsyncStorage.getItem(
      "@ColorListStore:Colors" //create a key 
    );
    if (colorData) {
      const colors = JSON.parse(colorData); //covert string to array of colors
      setColors(colors); 
    }
  };
  // Load Colors
  useEffect(() => {
      if (colors.length) return;
      loadColors();
    }, []);
    
//Save colors
  useEffect(() => {
    AsyncStorage.setItem(
      "@ColorListStore:Colors",
      JSON.stringify(colors) //change in array? save under same key
    );
  }, [colors]);

  const addColor = color => {
    const newColor = { id: generate(), color };
    setColors([newColor, ...colors]);
  };
  return { colors, addColor };
};
