import React, {useEffect, useState, useRef} from 'react';
import Axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

const App = () => {
  const carouselRef = useRef();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {width, height} = Dimensions.get('window');
  const setHandle = () => {
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    (async () => {
      const response = await Axios.get(
        `https://jsonplaceholder.typicode.com/photos?_limit10&_page=${currentPage}`,
      );
      console.log(`useEffect currentPage :` + currentPage);
      setData(data.concat(response.data));
    })();
    return {};
  }, [currentPage]);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => {
          return (
            <Card>
              <Card.Title title={item.id} />
              <Card.Content>
                <Card.Cover source={{url: `${item.url}`}} />
                <Paragraph>{item.title}</Paragraph>
              </Card.Content>
            </Card>
          );
        }}
        onEndReached={setHandle}
        onEndReachedThreshold={0}
      />

      {/* <Carousel
        ref={carouselRef}
        data={data}
        layout={'stack'}
        renderItem={({item}) => {
          return (
            <Card>
              <Card.Title title={item.id} />
              <Card.Content>
                <Card.Cover source={{url: `${item.url}`}} />
                <Paragraph>{item.title}</Paragraph>
              </Card.Content>
            </Card>
          );
        }}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={1000}
        sliderWidth={width}
        layoutCardOffset={18}
        itemWidth={width - 20}
        inactiveSlideOpacity={0.4}
        containerCustomStyle={{
          overflow: 'visible',
          marginVertical: 30,
        }}
        contentContainerCustomStyle={{
          paddingTop: 14,
        }}
      /> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  listView: {
    borderBottomWidth: 1,
    padding: 16,
  },
});
