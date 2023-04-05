
import styled from 'styled-components';
export const Container = styled.div`
  width:50%;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 auto;
`;

export const InnerContainer = styled.div`
padding-top: 20px;
padding-bottom: 20px;
border-bottom:2px solid #f5f5f6;
`
export const ContainerHeader = styled.div`
display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center
`
export const ContainerHeaderRight = styled.div`
float:left

display: flex;
  flex-direction: row;
`
export const ContainerAvatarSec = styled.div`
display: flex;
flex-direction: row;
`
export const ContainerHeaderLeft = styled.div`
border-bottom:1px solid red
float:left;
`

export const Avatar = styled.div`
    width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  margin-right:10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`
export const AvatarName = styled.p`

`
export const ContainerHeaderRightData = styled.div`
display: flex;
  flex-direction: row;
  align-items:center;
  float:left;
  justify-content: center;
  margin-left:15px
`

export const ContainerCreatedSection = styled.div`
margin-top:10px;
display: flex;
  flex-direction: row;
`
export const ContainerCreated = styled.div`
margin-Right:10px;
`
export const GenratedSection = styled.div`
margin-top:10px;
`
export const AvatarImg = styled.div`
// width: 50px;
//   height: 50px;
`
export const ContainerIcon = styled.div`

`
export const ContainerText = styled.div`
margin-left:8px;

p a {
    text-decoration-line : none;
    font-size:13px;
  }
`
export const FileSection = styled.div`
display: flex;
flex-direction: row;
align-items:center;
max-width:100%
`
export const InnerFileSection = styled.div`
display: flex;
flex-direction: row;
align-items:center;
`
export const FileTags = styled.div`
display: flex;
  flex-direction: row;
    margin-left:10px;
    margin-right:6px;
  p a {
    text-decoration-line : none;
    font-size:13px;
  }
`

export const FileIcon = styled.div`
display: flex;
flex-direction: row;
`