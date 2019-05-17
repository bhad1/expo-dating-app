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

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

let jobsThatUserSwipedRightOn = ["default"];
let jobsThatUserSwipedLeftOn = ["default"];
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
    jobsThatUserSwipedRightOn.push({
      jobId: this.props.jobs[cardIndex].id,
      company: this.props.jobs[cardIndex].company,
      jobDescription: this.props.jobs[cardIndex].jobDescription
    });
    this.recordSwipingInDBApiCallDebounced(
      this.props.jobs[cardIndex].id,
      this.props.userId
    );
  };

  onLeftSwipe = async cardIndex => {
    jobsThatUserSwipedLeftOn.push({
      jobId: this.props.jobs[cardIndex].id
    });
    this.recordSwipingInDBApiCallDebounced(
      this.props.jobs[cardIndex].id,
      this.props.userId
    );
  };

  // We do one api call for both jobsThatUserSwipedRightOn and jobsThatUserSwipedLeftOn, even if one
  // array is empty because we want to debounce one api call vs two and have less writes.
  // We have the 'default' value in the array because it will throw an error if its empty
  recordSwipingInDBApiCall = (jobId, userId) => {
    db.collection("users")
      .doc(userId)
      .update({
        jobsThatUserSwipedRightOn: firebase.firestore.FieldValue.arrayUnion(
          ...jobsThatUserSwipedRightOn
        ),
        jobsThatUserSwipedLeftOn: firebase.firestore.FieldValue.arrayUnion(
          ...jobsThatUserSwipedLeftOn
        )
      })
      .then(function() {
        console.log("Swipe was recorded in users collection");
      });
  };

  recordSwipingInDBApiCallDebounced = AwesomeDebouncePromise(
    this.recordSwipingInDBApiCall,
    1000
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
          onSwiped={cardIndex => {}}
          onSwipedAll={() => {
            this.props.onFinishedSwiping();
          }}
          onSwipedRight={cardIndex => {
            this.onRightSwipe(cardIndex);
          }}
          onSwipedLeft={cardIndex => {
            this.onLeftSwipe(cardIndex);
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
