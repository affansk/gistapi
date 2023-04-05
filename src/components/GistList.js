import React, { } from 'react'
import { FileTags, FileIcon, FileSection, GenratedSection, ContainerCreated, ContainerCreatedSection, Avatar, ContainerHeaderRight, ContainerIcon, ContainerText, ContainerHeaderRightData, InnerContainer, Container, ContainerHeader, ContainerHeaderLeft, ContainerAvatarSec, AvatarName } from '../components/styles/styles.styled'
import Octicon from 'react-octicon';
import PropTypes from 'prop-types';


const GistList = (props) => {
    const { sText, filterObjectLength, gist, isLoading } = props;

    const getFormattedDate = (dateS = new Date()) => {
        const dateString = dateS;
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate() - 1}/${date.getFullYear()}`;
    }
    return (
        <Container>

            {
                isLoading ? <p>Gist Loading..</p>
                    :
                    !isLoading && gist === undefined ?
                        <p>No Available Data</p>
                        : sText?.length > 0 && filterObjectLength === 0 ?
                            <p>No Data Found!</p>
                            :
                            gist?.map((item, index) => {
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
                                                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={'#'}>{`${Object.keys(item?.files).length} Files`}</a></p>
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
                                                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.owner?.starred_url}>Stars</a></p>
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
                                                            <p> <a rel="noreferrer" key={key} target='_blank' href={value?.raw_url}>{key}</a></p>
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
GistList.propTypes = {
    sText: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filterObjectLength: PropTypes.number.isRequired,
    gist: PropTypes.object.isRequired,
};


export default GistList
