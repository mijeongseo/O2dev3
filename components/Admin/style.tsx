import styled from "styled-components";

export const AdminContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const UserImageListContainer = styled.div`
  margin: 50px;
`;

export const UserImageItemDiv = styled.div`
  display: flex;

  & > div {
    text-align: center;
    flex: 1 1 0;
  }

  & + & {
    margin-top: 10px;
  }
`;
