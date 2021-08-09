import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #312e38;
`;

export const Detail = styled.Text`
  padding: 10px;
  font-size: 24px;
  color: #ffe81f;
`;

export const AddFavoriteButton = styled.TouchableOpacity`
  margin: auto 30px 30px 30px;
  padding: 10px 10px;
  background-color: green;
`;

export const FavoritedButton = styled.TouchableOpacity`
  margin: auto 30px 30px 30px;
  padding: 10px 10px;
  background-color: gray;
`;

export const TextButton = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
`;
