import React, { useRef, useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Carousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data for the slides with local image sources
  const slides = [
    {
      id: "1",
      imageUrl: require("../../assets/slide1.jpg"), // Local image
    },
    {
      id: "2",
      imageUrl: require("../../assets/slide1.jpg"), // Another local image
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
    <View style={[styles.slide]}>
      <Image
        source={item.imageUrl}
        style={styles.image}
      />
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
    height: 130, // Reduced height
    borderRadius: 15, // Border radius for entire carousel
    overflow: "hidden", // Ensures slides stay within the rounded border
    alignSelf: "center",
    marginTop: 56,
    marginBottom: 16,
  },
  slide: {
    width, // Full screen width for each slide
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15, // Border radius for individual slides
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15, // Border radius for the images
  },
});

export default Carousel;
