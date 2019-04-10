import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Animated,
  Dimensions
} from "react-native";
import Swiper from "react-native-deck-swiper";
import PictureSwiper from "react-native-swiper";
import {
  ParallaxSwiper,
  ParallaxSwiperPage
} from "react-native-parallax-swiper";
const { width, height } = Dimensions.get("window");

import profileImage1 from "../assets/images/stockProfileImages/profileImage1.jpg";
import profileImage2 from "../assets/images/stockProfileImages/profileImage2.png";
import profileImage3 from "../assets/images/stockProfileImages/profileImage3.jpg";
import profileImage4 from "../assets/images/stockProfileImages/profileImage4.jpg";
import profileImage5 from "../assets/images/stockProfileImages/profileImage5.jpg";
import profileImage6 from "../assets/images/stockProfileImages/profileImage6.jpg";

export default class SwiperComponent extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.swipeContainer}>
        <Swiper
          cards={this.props.jobs}
          verticalSwipe={false}
          renderCard={card => {
            return (
              // <PictureSwiper style={styles.wrapper} horizontal={true} showsButtons={true}>
              //   <View style={styles.slide}>
              //     <Image style={styles.profileImage} source={profileImage3} />
              //   </View>
              //   <View style={styles.slide}>
              //     <Image style={styles.profileImage} source={profileImage1} />
              //   </View>
              //   <View style={styles.slide}>
              //     <Image style={styles.profileImage} source={profileImage4} />
              //   </View>
              // </PictureSwiper>
              <View style={styles.card}>
                <Text>{card.companyName}</Text>
                <Text>{card.hours}</Text>
                <Text>{card.jobDescription}</Text>
              </View>
            );
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          stackSize={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  swipeContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignSelf: "stretch",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  card: {
    borderRadius: 10,
    justifyContent: "center",
    height: "95%",
    display: "flex",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%",
    backgroundColor: "white"
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  profileImage: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    width: "100%"
  }
});
