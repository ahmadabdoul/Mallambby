import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Carousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data for the slides
  const slides = [
    {
      id: "1",
      title: "Slide 1",
      description: "This is the first slide of the carousel.",
      backgroundColor: "#f9c2ff",
    },
    {
      id: "2",
      title: "Slide 2",
      description: "This is the second slide of the carousel.",
      backgroundColor: "#f8b400",
    },
  ];

  // Auto play effect
  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        flatListRef.current.scrollToIndex({ index: nextIndex });
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoplay);
  }, []);

  // Render each slide as a view
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "80%", // Fit parent width
    height: 130,   // Reduced height
    borderRadius: 15, // Border radius for entire carousel
    overflow: "hidden", // Ensures slides stay within the rounded border
    alignSelf: "center",
    marginTop: 56,
    marginBottom: 16
  },
  slide: {
    width, // Full screen width for each slide
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15, // Border radius for individual slides
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Carousel;
