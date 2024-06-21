import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { stories } from './exportedFunction';
import styles from './styles'
const { width } = Dimensions.get('window');

const StoryFeature = ({ closeModal }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pausedProgress = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentStory = stories[currentStoryIndex];
  const [isMuted, setIsMuted] = useState(false);
  const [wentBack, setWentBack] = useState(0);

  const renderStoryContent = (story) => {
    switch (story.type) {
      case 'image':
        return (
          <>
            <Image source={{ uri: story.image }} style={styles.backgroundImage} />
            <View style={styles.textBox}>
              <Text style={styles.textBoxText}>{story.description}</Text>
            </View>
          </>

        )
      case 'video':
        return (
          <Video
            source={story.video}
            resizeMode="cover"
            style={styles.backgroundImage}
            paused={isPaused}
            muted={isMuted}
          />
        );
      default:
        return null;
    }
  };

  /**
   * The function `goToNextStory` advances to the next story in a list of stories, animating the progress
   * and resetting it if the end of the list is reached.
   */
  const goToNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3,
        useNativeDriver: false,
      }).start(() => {
        pausedProgress.current = 0;
        setCurrentStoryIndex(currentStoryIndex + 1);
        progressAnim.setValue(0);
      });
    } else {
      setWentBack(0);
      //   closeModal();
      setCurrentStoryIndex(0);
    }
  };

  /**
   * The function `runProgressAnimation` animates a progress bar to completion and triggers a function
   * when finished.
   */
  const runProgressAnimation = () => {
    progressAnim.setValue(pausedProgress.current);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: (1 - pausedProgress.current) * 6000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory();
      }
    });
  };

  /**
   * The function `getProgressBarWidth` returns the width of a progress bar based on the current index
   * and story index.
   * @param storyIndex - StoryIndex is the index of the story in a list of stories. It represents the
   * position of a specific story within the list.
   * @param currentIndex - The `currentIndex` parameter represents the current index of the story or
   * progress in the sequence.
   * @returns The function `getProgressBarWidth` returns the width of a progress bar based on the
   * `storyIndex` and `currentIndex` parameters.
   */
  const getProgressBarWidth = (storyIndex, currentIndex) => {
    if (currentIndex > storyIndex) {
      return '100%';
    }
    if (currentIndex === storyIndex) {
      return progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      });
    }
    return '0%';
  };

  /**
   * The function `goToPreviousStory` handles the logic for navigating to the previous story in a
   * sequence, including resetting progress and handling edge cases.
   */
  const goToPreviousStory = () => {
    if (isPaused) {
      setIsPaused(false);
    }
    pausedProgress.current = 0;
    progressAnim.setValue(0);
    if (currentStoryIndex === 0) {
      setWentBack(wentBack + 1);
      runProgressAnimation();
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  /**
   * The `handlePressIn` function sets the `isPaused` state to true when a user presses and holds the
   * screen.
   */
  const handlePressIn = () => {
    //for pause if user holds the screen
    setIsPaused(true);
  };

  /**
   * The `handlePressOut` function sets `isPaused` to false when the user releases the screen.
   */
  const handlePressOut = () => {
    //for pause if user releases the holded screen
    setIsPaused(false);
  };

  /**
   * The function `handleScreenTouch` determines whether a touch event was on the left or right side of
   * the screen and triggers corresponding actions.
   * @param evt - The `evt` parameter in the `handleScreenTouch` function is typically an event object
   * that contains information about the touch event that occurred on the screen. It may include details
   * such as the location of the touch event, target element, type of event, and other relevant
   * information related to the touch interaction
   */
  const handleScreenTouch = (evt) => {
    //this function takes the width and decided where the click was pressed if left or right
    const touchX = evt.nativeEvent.locationX;
    if (touchX < width / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const pausePlay = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  const muteAndUnMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      runProgressAnimation();
    } else {
      progressAnim.stopAnimation(value => {
        pausedProgress.current = value;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex, isPaused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        onPress={handleScreenTouch}
        onLongPress={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.9 : 1, //when clicked shows the user screen a little dimmed for feedback
          },
          styles.container,
        ]}>
        <View style={styles.container}>
          {currentStory.type && renderStoryContent(currentStory)}
          <SafeAreaView>
            <View style={styles.progressBarContainer}>
              {stories.map((story, index) => (
                <View key={index} style={styles.progressBarBackground}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      {
                        width: getProgressBarWidth(index, currentStoryIndex),
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
            {/* <View style={styles.topBar}>
              <Image source={logo} style={styles.logo} />
            </View> */}
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => muteAndUnMute()}>
                <Image source={isMuted ? mute : unmute} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => pausePlay()}>
                <Image source={isPaused ? play : pause} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onFinishStory()}>
                <Image source={cross} style={styles.icon} />
              </TouchableOpacity>
            </View> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeModal}>
                <Image style={{ width: 20, height: 20 }} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default StoryFeature;