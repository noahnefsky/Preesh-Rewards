import React, {useState} from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ( {isSearching, onClickedStateChange, onSearchStateChange} ) => {
    const [clicked, setClicked] = useState(isSearching);
    const [searchPhrase, setSearchPhrase] = useState(isSearching);

    const handleClickedStatechange = (newState) => {
        setClicked(newState);
        onClickedStateChange(newState); // Notify the parent about the state change
      };

      const handleSearchChange = (query) => {
        setSearchPhrase(query)
        onSearchStateChange(query); // Notify the parent about the state change
      };
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search restaurants..."
          value={searchPhrase}
          onChangeText={handleSearchChange}
          onFocus={() => {
            handleClickedStatechange(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              handleClickedStatechange(false);
              setSearchPhrase(null)
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: 375,
    height: 38,
    top: 50,
    alignSelf: 'center',
    left: 2
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    alignItems: "center",
    left: 5
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
});