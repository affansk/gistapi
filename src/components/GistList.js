import React, { } from 'react'
import styled from 'styled-components';
import Octicon from 'react-octicon'
const GistList = (props) => {
    const { gist } = props;
    console.log("GistList", props)

    const getFormattedDate = (dateS = new Date()) => {
        const dateString = dateS;
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate() -1}/${date.getFullYear()}`;
    }
    return (
        <Container>

            {gist?.map((item, index) => {
                console.log("item", item?.created_at)
                return (
                    <InnerContainer key={index}>
                        <ContainerHeader>
                            <ContainerHeaderLeft>
                                <ContainerAvatarSec>
                                    <Avatar>
                                        <img src={item?.owner?.avatar_url} alt={item?.owner?.login} />
                                    </Avatar>
                                    <AvatarName>
                                        {item?.owner?.login}
                                    </AvatarName>
                                </ContainerAvatarSec>

                            </ContainerHeaderLeft>
                            <ContainerHeaderRight>
                                <ContainerHeaderRightData>
                                    <ContainerIcon>
                                        <Octicon name="code" small />
                                    </ContainerIcon>
                                    <ContainerText>
                                     <p> <a rel="noreferrer"  key={'#'} target='_blank' href={'#'}>{`${Object.keys(item?.files).length} Files`}</a></p>
                                        {/* <h5>{`${Object.keys(item?.files).length} Files`}</h5> */}
                                    </ContainerText>
                                </ContainerHeaderRightData>
                                <ContainerHeaderRightData>
                                    <ContainerIcon>
                                        <Octicon name="repo-forked" small />
                                    </ContainerIcon>
                                    <ContainerText>
                                    <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.forks_url}>Fork</a></p>
                                    </ContainerText>
                                </ContainerHeaderRightData>
                                <ContainerHeaderRightData>
                                    <ContainerIcon>
                                        <Octicon name="comment" small />
                                    </ContainerIcon>
                                    <ContainerText>
                                    <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.comments_url}>Comments</a></p>
                                    </ContainerText>
                                </ContainerHeaderRightData>
                                <ContainerHeaderRightData>
                                    <ContainerIcon>
                                        <Octicon name="star" small />
                                    </ContainerIcon>
                                    <ContainerText>
                                    <p> <a  rel="noreferrer" key={'#'} target='_blank' href={item?.owner?.starred_url}>Stars</a></p>
                                    </ContainerText>
                                </ContainerHeaderRightData>


                            </ContainerHeaderRight>
                        </ContainerHeader>
                        <ContainerCreatedSection>
                            <ContainerCreated>
                                {`Created at: ${getFormattedDate(item?.created_at)}`}
                            </ContainerCreated>
                            <ContainerCreated>
                                {`Updated at: ${getFormattedDate(item?.updated_at)}`}
                            </ContainerCreated>


                        </ContainerCreatedSection>
                        <GenratedSection>
                            {`${item?.description}`}
                        </GenratedSection>
                        <FileSection>
                            {Object.entries(item?.files).map(([key, value]) => {
                                console.log(value, "value")
                                return (
                                    <>
                                        <FileIcon>
                                            <Octicon name="file" small />
                                        </FileIcon>
                                        <FileTags>
                                            <p> <a  rel="noreferrer" key={key} target='_blank' href={value?.raw_url}>{key}</a></p>
                                        </FileTags>
                                    </>
                                )
                            })}
                        </FileSection>
                    </InnerContainer>
                )
            }
            )}

        </Container>
    )
}
const Container = styled.div`
  width:50%;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 auto;
`;

const InnerContainer = styled.div`
padding-top: 20px;
padding-bottom: 20px;
border-bottom:2px solid #f5f5f6;
`
const ContainerHeader = styled.div`
display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center
`
const ContainerHeaderRight = styled.div`
float:left

display: flex;
  flex-direction: row;
`
const ContainerAvatarSec = styled.div`
display: flex;
flex-direction: row;
`
const ContainerHeaderLeft = styled.div`
border-bottom:1px solid red
float:left;
`

const Avatar = styled.div`
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
const AvatarName = styled.p`

`
const ContainerHeaderRightData = styled.div`
display: flex;
  flex-direction: row;
  align-items:center;
  float:left;
  justify-content: center;
  margin-left:15px
`

const ContainerCreatedSection = styled.div`
margin-top:10px;
display: flex;
  flex-direction: row;
`
const ContainerCreated = styled.div`
margin-Right:10px;
`
const GenratedSection = styled.div`
margin-top:10px;
`
const AvatarImg = styled.div`
// width: 50px;
//   height: 50px;
`
const ContainerIcon = styled.div`

`
const ContainerText = styled.div`
margin-left:8px;

p a {
    text-decoration-line : none;
    font-size:13px;
  }
`
const FileSection = styled.div`
display: flex;
flex-direction: row;
align-items:center;
`
const FileTags = styled.div`
display: flex;
  flex-direction: row;
    margin-left:10px;
    margin-right:6px;
  p a {
    text-decoration-line : none;
    font-size:13px;
  }
`

const FileIcon = styled.div`
display: flex;
flex-direction: row;
`

export default GistList
