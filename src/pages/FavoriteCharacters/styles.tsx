import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #312e38;
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
