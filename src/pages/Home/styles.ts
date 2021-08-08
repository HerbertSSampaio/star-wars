import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const ListCharacter = styled.ScrollView`
  margin: 10px;
  background-color: #312e38;
  border-radius: 10px;
`;

export const NameCharacter = styled.Text`
  text-align: center;
  color: #ffe81f;
`;

export const CharactersButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 20px;
  background-color: #000000;
  margin: 10px 30px 0px 30px;
`;

export const Pagination = styled.View`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px 0;
`;

export const PaginationButton = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  background-color: #312e38;
`;

export const PaginationText = styled.Text`
  text-align: center;
  margin: auto;
`;

export const FavoriteCharactersButton = styled.TouchableOpacity`
  height: 50px;
  background-color: #312e38;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

export const FavoriteCharactersText = styled.Text`
  text-align: center;
  margin: auto;
  color: #ffe81f;
`;
