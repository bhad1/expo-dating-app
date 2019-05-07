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
import { connect } from "react-redux";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { firebase, db, geo } from "../firebase";

const { width, height } = Dimensions.get("window");

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};
let jobsThatUserSwipedRightOn = [];
class SwiperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsThatUserSwipedRightOn: []
    };
  }
  static navigationOptions = {
    header: null
  };

  onRightSwipe = async cardIndex => {
    jobsThatUserSwipedRightOn.push(this.props.jobs[cardIndex].id);
    await this.setState({
      jobsThatUserSwipedRightOn: jobsThatUserSwipedRightOn
    });
    this.addPotentialEmployeeToJobApiCallDebounced(
      this.props.jobs[cardIndex].id,
      this.props.userId
    );
  };

  addPotentialEmployeeToJobApiCall = (jobId, userId) => {
    db.collection("users")
      .doc(userId)
      .update({
        jobsThatUserSwipedRightOn: firebase.firestore.FieldValue.arrayUnion(
          ...this.state.jobsThatUserSwipedRightOn
        )
      })
      .then(function() {
        console.log(
          "Job was added to jobsThatUserSwipedRightOn array in users collection"
        );
      });
    // db.collection("jobs")
    //   .doc(jobId)
    //   .update({
    //     usersThatSwipedRight: firebase.firestore.FieldValue.arrayUnion(
    //       ...this.state.jobsThatUserSwipedRightOn
    //     )
    //   })
    //   .then(function() {
    //     console.log("User was added on swipe right to job");
    //   });
  };

  addPotentialEmployeeToJobApiCallDebounced = AwesomeDebouncePromise(
    this.addPotentialEmployeeToJobApiCall,
    5000
  );

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
                <Text>Company: {card.company}</Text>
                <Text>Hours per Week: {card.weeklyHours}</Text>
                <Text>Job Description: {card.jobDescription}</Text>
              </View>
            );
          }}
          onSwiped={cardIndex => {
            // console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedRight={cardIndex => {
            this.onRightSwipe(cardIndex);
          }}
          onSwipedLeft={cardIndex => {
            console.log(cardIndex);
          }}
          cardIndex={0}
          backgroundColor={"#4FD0E9"}
          stackSize={3}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(SwiperComponent);

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
