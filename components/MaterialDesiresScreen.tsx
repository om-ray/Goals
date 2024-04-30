/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Context} from '../Context';
import {NavigationProp} from '@react-navigation/native';

const SelectableList = ({
  items,
  title,
  onSelect,
  selectedItems,
}: {
  items: string[];
  title: string;
  onSelect: (item: string) => void;
  selectedItems: string[];
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [itemsList, setItemsList] = useState([...items]);
  const inputRef = useRef<TextInput>(null);

  const handleSelectCustomItem = (text: string) => {
    if (text) {
      onSelect(text);
      setUserInput('');
    }
    setInputFocused(false);
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.view}>
        {itemsList.map(item => (
          <TouchableOpacity
            key={item}
            style={
              selectedItems.includes(item) ? styles.itemSelected : styles.item
            }
            onPress={() => onSelect(item)}>
            <Text
              style={
                selectedItems.includes(item)
                  ? styles.itemTextSelected
                  : styles.itemText
              }>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={
            inputFocused ? styles.inputContainerFocused : styles.inputContainer
          }
          onPress={() => {
            setInputFocused(true);
            inputRef.current?.focus();
          }}
          activeOpacity={1}>
          <Image
            style={styles.inputPlaceholder}
            source={require('../assets/TextBox.png')}
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="type your own"
            placeholderTextColor="#888"
            value={userInput}
            onChangeText={setUserInput}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onSubmitEditing={({nativeEvent}) => {
              setItemsList([...itemsList, nativeEvent.text]);
              handleSelectCustomItem(nativeEvent.text);
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MaterialDesiresScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const {selectedOptions, setSelectedOptions} = useContext(Context);

  const [dreamHome, setDreamHome] = useState<string[]>([]);
  const [dreamRide, setDreamRide] = useState<string[]>([]);
  const [dreamStyle, setDreamStyle] = useState<string[]>([]);
  const [dreamMisc, setDreamMisc] = useState<string[]>([]);

  useEffect(() => {
    const newMaterialDesires = {
      home: dreamHome,
      ride: dreamRide,
      style: dreamStyle,
      misc: dreamMisc,
    };

    setSelectedOptions({
      ...selectedOptions,
      materialDesires: newMaterialDesires,
    });

    if (
      dreamHome.length >= 1 &&
      dreamRide.length >= 1 &&
      dreamStyle.length >= 1 &&
      dreamMisc.length >= 1
    ) {
      navigation.navigate('PfpScreen');
    }
  }, [dreamHome, dreamRide, dreamStyle, dreamMisc]);

  const toggleSelection = (
    item: any,
    selectedItems: any[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i: any) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectHome = (item: string) =>
    toggleSelection(item, dreamHome, setDreamHome);
  const handleSelectRide = (item: string) =>
    toggleSelection(item, dreamRide, setDreamRide);
  const handleSelectStyle = (item: string) =>
    toggleSelection(item, dreamStyle, setDreamStyle);
  const handleSelectMisc = (item: string) =>
    toggleSelection(item, dreamMisc, setDreamMisc);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBar} />
        <TouchableOpacity style={styles.backButton}>
          <Text
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButtonText}>
            ←
          </Text>
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.question}>We all want “stuff” so tap a few...</Text>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <SelectableList
              title="Dream home 🏠"
              items={[
                'Beach house',
                'Modern mansion',
                'Castle',
                'Spanish villa',
                'Penthouse',
                'Country home',
                'Mountain residence',
                'Remote Ranch',
              ]}
              onSelect={handleSelectHome}
              selectedItems={dreamHome}
            />
            <SelectableList
              title="Dream ride 🚗"
              items={[
                'Lamborghini',
                'Ferrari',
                'McLaren',
                'Aston Martin',
                'Bugatti',
                'Rolls Royce',
                'Porsche',
                'Supercar',
                'Truck/Offroad',
              ]}
              onSelect={handleSelectRide}
              selectedItems={dreamRide}
            />
            <SelectableList
              title="Dream style 👔"
              items={[
                'Semiformal attire',
                'Athletic',
                'Streetwear',
                'Casual clothes',
                'Watches',
                'Old money',
                'European style',
                'Jewelry',
                'Dressed up',
              ]}
              onSelect={handleSelectStyle}
              selectedItems={dreamStyle}
            />
            <SelectableList
              title="Dream misc. 💰"
              items={[
                'Luxury vacations',
                'Active lifestyle',
                'Yacht',
                'Socially active',
                'Healthy',
                'Beach goer',
                'Flashy wealth',
                'Lowkey wealth',
                'Jetski',
              ]}
              onSelect={handleSelectMisc}
              selectedItems={dreamMisc}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2c2c2c',
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    paddingTop: 10,
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}],
  },
  progressBar: {
    width: 170,
    height: 5,
    backgroundColor: '#CC6F35',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: 0,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  question: {
    color: '#fff',
    fontSize: 25,
    marginTop: 40,
    marginBottom: 20,
    fontFamily: 'Bodoni-72-Book',
    letterSpacing: -1.9,
    width: '100%',
    textAlign: 'center',
  },
  listContainer: {
    marginVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Bodoni-72-Book',
    paddingHorizontal: 20,
    paddingBottom: 10,
    letterSpacing: -1,
  },
  view: {
    paddingLeft: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemSelected: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  itemTextSelected: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    width: 250,
    margin: 5,
  },
  inputContainerFocused: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    width: '90%',
    margin: 5,
  },
  inputPlaceholder: {
    padding: 10,
    marginRight: 10,
    opacity: 0.2,
  },
  input: {
    width: 100,
    color: '#fff',
  },
});

export default MaterialDesiresScreen;
