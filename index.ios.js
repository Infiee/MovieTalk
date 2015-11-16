/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    Image,
    View,
    } = React;

const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

class MovieTalk extends React.Component {
    constructor(props) {
        super(props);

        //let movieLists = [
        //    {title: '肖申克的救赎'},
        //    {title: '这个杀手不太冷'},
        //    {title: '阿甘正传'},
        //    {title: '霸王别姬1'},
        //    {title: '美丽人生13'},
        //];

        //todo:自定义模拟数据
        //let dataSource = new ListView.DataSource({
        //    rowHasChanged: (row1, row2) => row1 !== row2
        //});

        this.state = {
            movieLists: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        this.fetchData();
    }

    //todo:使用豆瓣api数据
    fetchData() {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                //console.log(responseData)
                this.setState({
                    movieLists: this.state.movieLists.cloneWithRows(responseData.subjects)
                });
            })
            .done();
    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.backgroundImage}
                    source={{uri:'http://img3.douban.com/view/photo/photo/public/p2191398861.jpg'}}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.overlaySubHeader}>
                            豆瓣Top501
                        </Text>
                    </View>
                </Image>
                <ListView
                    dataSource={this.state.movieLists}
                    renderRow={
                        movieList =>
                        <Text style={styles.itemText}>
                          {movieList.title}
                        </Text>
                    }
                />

            </View>
        )
    }
}


let styles = StyleSheet.create({
    itemText: {
        padding: 10,
        marginBottom: 1,
        backgroundColor: 'rgba(100,139,238,0.5)',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    overlayHeader: {
        fontSize: 33,
        fontFamily: 'Helvetica Neue',
        fontWeight: '200',
        color: '#eae7ff',
        padding: 10,
    },
    overlaySubHeader: {
        fontSize: 16,
        //fontFamily: 'Helvetica Neue',
        fontWeight: '200',
        color: '#eae7ff',
    },
    backgroundImage: {
        height: 138,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    image: {
        width: 99,
        height: 138,
        margin: 6,
    },
    container: {
        backgroundColor: '#eae7ff',
        flex: 1,
        paddingTop: 23,
    }
});


AppRegistry.registerComponent('MovieTalk', () => MovieTalk);


