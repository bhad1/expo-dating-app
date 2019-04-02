import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-base-switch';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left } from 'native-base';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderOneChanging: false,
      sliderOneValue: 18,
      sliderTwoValue: 24,
      genderShownSelection: 'Women'
    };
    this.SliderOneValuesChangeStart = this.SliderOneValuesChangeStart.bind(this);
    this.SliderOneValuesChange = this.SliderOneValuesChange.bind(this);
    this.SliderOneValuesChangeFinish = this.SliderOneValuesChangeFinish.bind(this);
  }
  static navigationOptions = {
    title: 'Settings'
  };

  onToggleSwitch(isActive) {
    console.log(isActive);
  }

  SliderOneValuesChangeStart() {
    this.setState({
      sliderOneChanging: true
    });
  }

  SliderOneValuesChange(values) {
    this.setState({
      sliderOneValue: values[0],
      sliderTwoValue: values[1]
    });
  }

  SliderOneValuesChangeFinish() {
    this.setState({
      sliderOneChanging: false
    });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <View style={styles.toggleSwitchSection}>
          <View style={styles.toggleSwitchTextContainer}>
            <Text style={styles.toggleSwitchText}>Profile Public</Text>
          </View>
          <View style={styles.toggleSwitchContainer}>
            <View style={styles.toggleSwitch}>
              <Switch onChangeState={this.onToggleSwitch} />
            </View>
          </View>
        </View>
        <View style={styles.toggleSwitchDescriptionSection}>
          <View style={styles.toggleSwitchDescriptionContainer}>
            <Text style={styles.toggleSwitchDescription}>
              Switching your public profile off makes you hidden to anybody new matching with you,
              but does not hide you from your current matches
            </Text>
          </View>
        </View>

        <View style={styles.ageSliderSection}>
          <View style={styles.ageTextSection}>
            <View style={styles.ageTextContainer}>
              <Text style={styles.ageText}>Age</Text>
            </View>
            <View style={styles.ageValuesContainer}>
              <Text style={styles.ageValues}>
                {this.state.sliderOneValue} - {this.state.sliderTwoValue}
              </Text>
            </View>
          </View>
          <View style={styles.ageSliderContainer}>
            <View style={styles.ageSlider}>
              <MultiSlider
                values={[this.state.sliderOneValue, this.state.sliderTwoValue]}
                sliderLength={280}
                onValuesChangeStart={this.SliderOneValuesChangeStart}
                onValuesChange={this.SliderOneValuesChange}
                onValuesChangeFinish={this.SliderOneValuesChangeFinish}
                min={18}
                max={65}
              />
            </View>
          </View>
        </View>

        <View style={styles.showGenderSection}>
          <View style={styles.showGenderIndicatorSection}>
            <View style={styles.showGenderIndicatorTextContainer}>
              <Text style={styles.showGenderIndicatorText}>Show</Text>
            </View>
            <View style={styles.showGenderIndicatorValueContainer}>
              <Text style={styles.showGenderIndicatorValue}>{this.state.genderShownSelection}</Text>
            </View>
          </View>
          <Container>
            <Content>
              <ListItem onPress={() => this.setState({ genderShownSelection: 'Men' })}>
                <Left>
                  <Text>Men</Text>
                </Left>
                <Right>
                  <TouchableOpacity>
                    <Radio selected={this.state.genderShownSelection == 'Men'} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem onPress={() => this.setState({ genderShownSelection: 'Women' })}>
                <Left>
                  <Text>Women</Text>
                </Left>
                <Right>
                  <TouchableOpacity>
                    <Radio selected={this.state.genderShownSelection == 'Women'} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem onPress={() => this.setState({ genderShownSelection: 'Everyone' })}>
                <Left>
                  <Text>Everyone</Text>
                </Left>
                <Right>
                  <TouchableOpacity>
                    <Radio
                      onPress={() => this.setState({ genderShownSelection: 'Everyone' })}
                      selected={this.state.genderShownSelection == 'Everyone'}
                    />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </Content>
          </Container>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toggleSwitchSection: {
    marginTop: 40,
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row'
  },
  toggleSwitchTextContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  toggleSwitchContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  toggleSwitchText: {
    paddingLeft: 20,
    fontSize: 19
  },
  toggleSwitch: {
    paddingRight: 20
  },
  ageSliderSection: {
    marginTop: 5,
    height: 110,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex'
  },
  ageTextSection: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  ageSliderContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ageSlider: {},
  ageTextContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  ageValuesContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  ageText: {
    paddingLeft: 20,
    fontSize: 19
  },
  ageValues: {
    paddingRight: 20,
    fontSize: 19
  },
  showGenderSection: {
    marginTop: 40,
    height: 175,
    width: '100%',
    backgroundColor: '#f8c536'
  },
  showGenderIndicatorSection: {
    height: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  showGenderIndicatorValueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  showGenderIndicatorValue: {
    fontSize: 19,
    paddingRight: 20,
    color: '#fff'
  },
  showGenderIndicatorTextContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  showGenderIndicatorText: {
    fontSize: 19,
    paddingLeft: 20,
    color: '#fff'
  },
  toggleSwitchDescription: {
    padding: 10
  }
});
