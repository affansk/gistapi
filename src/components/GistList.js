import React, { useMemo } from 'react'

import { CenteredParagraph, FileTags, FileIcon, InnerFileSection, FileSection, GenratedSection, ContainerCreated, ContainerCreatedSection, Avatar, ContainerHeaderRight, ContainerIcon, ContainerText, ContainerHeaderRightData, InnerContainer, Container, ContainerHeader, ContainerHeaderLeft, ContainerAvatarSec, AvatarName } from '../components/styles/styles.styled'
import Octicon from 'react-octicon';
import PropTypes from 'prop-types';


const GistList = (props) => {
    // This component will receave all needed props. 
    const { sText, filterObjectLength, gist, isLoading, isError } = props;
    /* 
    This Functions format the date with function memoization
    input : This FUnctions Take Date Receive from API 
    Output : This Function Outpit the formatted Date.
    */
    const getFormattedDate = useMemo(
        () => (dateS) => {
            const dateString = dateS;
            const date = new Date(dateString);
            return `${date.getMonth() + 1}/${date.getDate() - 1}/${date.getFullYear()}`;
        },
        []
    );

    /* 
    We have Seperated The Ui for Readibilty
    input : This FUnctions Take item as parameter, because some of the value is dependend on API resonse
    Output : This FUnction Render Section with contant all user files
    */
    const renderFileSection = (item) => {
        return (
            <FileSection>
                {item?.files && Object.entries(item?.files).map(([key, value]) => {
                    return (
                        <InnerFileSection key={`${key}-${value}`}>

                            <FileIcon>
                                <Octicon name="file" small='true' style={{ color: '#2974da' }} />
                            </FileIcon>
                            <FileTags>
                                <p> <a style={{ color: '#2974da' }} rel="noreferrer" key={key} target='_blank' href={value?.raw_url}>{key}</a></p>
                            </FileTags>


                        </InnerFileSection>
                    )
                })}
            </FileSection>
        )
    }
    /* 
   We have Seperated The Ui for Readibilty
   input : This FUnctions Take item as parameter, because some of the value is dependend on API resonse
   Output : This FUnction Render Section with contant like fork, comments, etc.
   */
    const renderContaineHeaderRight = (item) => {
        return (
            <ContainerHeaderRight>
                <ContainerHeaderRightData>
                    <ContainerIcon>
                        <Octicon name="code" small='true' style={{ color: '#2974da' }} />
                    </ContainerIcon>
                    <ContainerText>
                        <p> <a rel="noreferrer" key={'#'} href={'/'} style={{ color: '#2974da' }}>
                            {item?.files ? `${Object.keys(item.files).length} Files` : 'No files'}
                        </a></p>
                    </ContainerText>
                </ContainerHeaderRightData>
                <ContainerHeaderRightData>
                    <ContainerIcon>
                        <Octicon name="repo-forked" small='true' style={{ color: '#2974da' }} />
                    </ContainerIcon>
                    <ContainerText>
                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.forks_url} style={{ color: '#2974da' }}>Forks</a></p>
                    </ContainerText>
                </ContainerHeaderRightData>
                <ContainerHeaderRightData>
                    <ContainerIcon>
                        <Octicon name="comment" small='true' style={{ color: '#2974da' }} />
                    </ContainerIcon>
                    <ContainerText>
                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.comments_url} style={{ color: '#2974da' }}>Comments</a></p>
                    </ContainerText>
                </ContainerHeaderRightData>
                <ContainerHeaderRightData>
                    <ContainerIcon>
                        <Octicon name="star" small='true' style={{ color: '#2974da' }} />
                    </ContainerIcon>
                    <ContainerText>
                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.owner?.starred_url} style={{ color: '#2974da' }}>Stars</a></p>
                    </ContainerText>
                </ContainerHeaderRightData>


            </ContainerHeaderRight>
        )
    }


    return (
        <Container>

            {
                isLoading ? <CenteredParagraph>Gist Loading..</CenteredParagraph>
                    :
                    !isLoading && isError ?
                        <CenteredParagraph>Some Problem in Loading Data</CenteredParagraph>
                        : sText?.length > 0 && filterObjectLength === 0 ?
                            <CenteredParagraph>No Data Found!</CenteredParagraph>
                            :
                            gist?.map((item, index) => {
                                const { owner, created_at, updated_at } = item;
                                return (
                                    <InnerContainer key={index}>
                                        <ContainerHeader>
                                            <ContainerHeaderLeft>
                                                <ContainerAvatarSec>
                                                    <Avatar>
                                                        <img src={owner?.avatar_url} alt={owner?.login} />
                                                    </Avatar>
                                                    <AvatarName>
                                                        {owner?.login}
                                                    </AvatarName>
                                                </ContainerAvatarSec>

                                            </ContainerHeaderLeft>
                                            {renderContaineHeaderRight(item)}
                                        </ContainerHeader>
                                        <ContainerCreatedSection>
                                            <ContainerCreated>
                                                {`Created at: ${getFormattedDate(created_at)}`}
                                            </ContainerCreated>
                                            <ContainerCreated>
                                                {`Updated at: ${getFormattedDate(updated_at)}`}
                                            </ContainerCreated>
                                        </ContainerCreatedSection>
                                        <GenratedSection>
                                            {`${item?.description}`}
                                        </GenratedSection>
                                        {renderFileSection(item)}
                                    </InnerContainer>
                                )
                            }
                            )}

        </Container>
    )
}

// This Is for Type Checking of Props/Params. it will allow those which is part of this propstype
GistList.propTypes = {
    sText: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    filterObjectLength: PropTypes.number.isRequired,
    gist: PropTypes.array,
    isError: PropTypes.bool
};


export default GistList
