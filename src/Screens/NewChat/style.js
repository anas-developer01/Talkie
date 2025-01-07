import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    paddingBottom: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  searchContainer: {
    width: '85%',
    height: 45,
    borderRadius: 8,
    marginLeft: 10,
    color: 'white',
  },
  chatContainer: {
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 42,
    height: 42,
    marginHorizontal: 3,
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 2,
  },
  imgText: {
    fontSize: 17,
    alignSelf: 'center',
  },
  image: {
    width: 37,
    height: 36,
    alignSelf: 'center',
    borderRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    borderRadius: 30,
  },
});
export default styles;
