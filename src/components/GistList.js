import React, { useMemo} from 'react'

import { FileTags, FileIcon, FileSection, GenratedSection, ContainerCreated, ContainerCreatedSection, Avatar, ContainerHeaderRight, ContainerIcon, ContainerText, ContainerHeaderRightData, InnerContainer, Container, ContainerHeader, ContainerHeaderLeft, ContainerAvatarSec, AvatarName } from '../components/styles/styles.styled'
import Octicon from 'react-octicon';
import PropTypes from 'prop-types';


const GistList = (props) => {
    const { sText, filterObjectLength, gist, isLoading } = props;

    const getFormattedDate = useMemo(
        () => (dateS) => {
          const dateString = dateS;
          const date = new Date(dateString);
          return `${date.getMonth() + 1}/${date.getDate() - 1}/${date.getFullYear()}`;
        },
        []
      );
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
                                const {owner} = item;
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
                                            <ContainerHeaderRight>
                                                <ContainerHeaderRightData>
                                                    <ContainerIcon>
                                                        <Octicon name="code" small='true' />
                                                    </ContainerIcon>
                                                    <ContainerText>
                                                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={'#'}>{`${Object.keys(item?.files).length} Files`}</a></p>
                                                        {/* <h5>{`${Object.keys(item?.files).length} Files`}</h5> */}
                                                    </ContainerText>
                                                </ContainerHeaderRightData>
                                                <ContainerHeaderRightData>
                                                    <ContainerIcon>
                                                        <Octicon name="repo-forked" small='true' />
                                                    </ContainerIcon>
                                                    <ContainerText>
                                                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.forks_url}>Fork</a></p>
                                                    </ContainerText>
                                                </ContainerHeaderRightData>
                                                <ContainerHeaderRightData>
                                                    <ContainerIcon>
                                                        <Octicon name="comment" small='true' />
                                                    </ContainerIcon>
                                                    <ContainerText>
                                                        <p> <a rel="noreferrer" key={'#'} target='_blank' href={item?.comments_url}>Comments</a></p>
                                                    </ContainerText>
                                                </ContainerHeaderRightData>
                                                <ContainerHeaderRightData>
                                                    <ContainerIcon>
                                                        <Octicon name="star" small='true' />
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
                                                return (
                                                    <div key={`${key}-${value}`}>
                                                        <FileIcon>
                                                            <Octicon name="file" small='true' />
                                                        </FileIcon>
                                                        <FileTags>
                                                            <p> <a rel="noreferrer" key={key} target='_blank' href={value?.raw_url}>{key}</a></p>
                                                        </FileTags>
                                                    </div>
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
    sText: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    filterObjectLength: PropTypes.number.isRequired,
    gist: PropTypes.array,
};


export default GistList
