import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  description: {
    marginHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
  },
});

export default styles;
