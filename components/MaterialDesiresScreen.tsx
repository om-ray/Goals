/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState, useRef} from 'react';
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
  SafeAreaView,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Header from './Header';
import Styles from './Style/Styles';
import {Context} from '../Context';

const alertMessage =
  'You can only select 3 items. You can deselect items by tapping on them again';

const SelectableList = ({
  items,
  title,
  onSelect,
  selectedItems,
  customItemsList,
  setCustomItemsList,
  section,
}: {
  items: string[];
  title: string;
  onSelect: (item: string) => void;
  selectedItems: string[];
  customItemsList: any;
  setCustomItemsList: any;
  section: string;
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [itemsList, setItemsList] = useState([...items]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const filteredItemsList = customItemsList[section].filter((item: string) =>
      selectedItems.includes(item),
    );
    setItemsList([...items, ...filteredItemsList]);
  }, [selectedItems, customItemsList[section]]);

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
                  ? Styles.textSmallSelected
                  : Styles.textSmall
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
            maxLength={32}
            onChangeText={setUserInput}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onSubmitEditing={({nativeEvent}) => {
              const newItem = nativeEvent.text.trim();
              if (
                newItem &&
                !itemsList.includes(newItem) &&
                selectedItems.length < 3
              ) {
                setCustomItemsList((prevCustom: any) => ({
                  ...prevCustom,
                  [section]: [...prevCustom[section], newItem],
                }));
                setItemsList(prevItems => [...prevItems, newItem]);
                handleSelectCustomItem(newItem);
              } else if (selectedItems.length === 3) {
                Alert.alert('', alertMessage);
              }
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
  const [customItemsList, setCustomItemsList] = useState<any>({
    home: [],
    ride: [],
    style: [],
    misc: [],
  });

  useEffect(() => {
    const initializeSelections = () => {
      const sections = ['home', 'ride', 'style', 'misc'];
      const newCustomItems = {...customItemsList};

      sections.forEach(section => {
        const contextItems = selectedOptions.materialDesires[section];
        const stateSetter = {
          home: setDreamHome,
          ride: setDreamRide,
          style: setDreamStyle,
          misc: setDreamMisc,
        }[section];

        // const newItems = contextItems.filter((item: any) => {
        //   if (
        //     !customItemsList[section].includes(item) &&
        //     !item.includes(item)
        //   ) {
        //     newCustomItems[section].push(item);
        //     return true;
        //   }
        //   return item.includes(item);
        // });

        if (stateSetter) {
          stateSetter([...contextItems]);
        }
      });

      setCustomItemsList(newCustomItems);
    };

    initializeSelections();
    if (
      dreamHome.length >= 1 &&
      dreamRide.length >= 1 &&
      dreamStyle.length >= 1 &&
      dreamMisc.length >= 1
    ) {
      navigation.navigate('PfpScreen');
    }
  }, []);

  useEffect(() => {
    const newMaterialDesires = {
      home: [...dreamHome],
      ride: [...dreamRide],
      style: [...dreamStyle],
      misc: [...dreamMisc],
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
    item: string,
    selectedItems: any[],
    setSelectedItems: {
      (value: React.SetStateAction<string[]>): void;
      (value: React.SetStateAction<string[]>): void;
      (value: React.SetStateAction<string[]>): void;
      (value: React.SetStateAction<string[]>): void;
      (arg0: any[]): void;
    },
    section: string,
  ) => {
    if (selectedItems.includes(item)) {
      const newSelectedItems = selectedItems.filter(i => i !== item);
      setSelectedItems(newSelectedItems);

      if (customItemsList[section].includes(item)) {
        const newCustomItemsList = {
          ...customItemsList,
          [section]: customItemsList[section].filter((i: string) => i !== item),
        };
        setCustomItemsList(newCustomItemsList);
      }
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, item]);
      } else {
        Alert.alert('', alertMessage);
      }
    }
  };

  const handleSelectHome = (item: string) =>
    toggleSelection(item, dreamHome, setDreamHome, 'home');
  const handleSelectRide = (item: string) =>
    toggleSelection(item, dreamRide, setDreamRide, 'ride');
  const handleSelectStyle = (item: string) =>
    toggleSelection(item, dreamStyle, setDreamStyle, 'style');
  const handleSelectMisc = (item: string) =>
    toggleSelection(item, dreamMisc, setDreamMisc, 'misc');

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={170} />
      <Text style={Styles.mainText}>We all want “stuff” so tap a few...</Text>
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
              customItemsList={customItemsList}
              setCustomItemsList={setCustomItemsList}
              section="home"
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
              customItemsList={customItemsList}
              setCustomItemsList={setCustomItemsList}
              section="ride"
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
              customItemsList={customItemsList}
              setCustomItemsList={setCustomItemsList}
              section="style"
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
              customItemsList={customItemsList}
              setCustomItemsList={setCustomItemsList}
              section="misc"
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 20,
  },
  title: {
    ...Styles.textSmall,
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 20,
    paddingBottom: 10,
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...Styles.textSmall,
    width: '80%',
    margin: 5,
  },
  inputContainerFocused: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 'auto',
    paddingVertical: 10,
    ...Styles.textSmall,
    width: '95%',
    margin: 5,
  },
  inputPlaceholder: {
    padding: 10,
    marginRight: 10,
    marginLeft: -30,
    opacity: 0.2,
  },
  input: {
    width: 'auto',
    color: '#fff',
  },
});

export default MaterialDesiresScreen;
