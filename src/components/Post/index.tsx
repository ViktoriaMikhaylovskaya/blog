import { BigTitle, Button, BigPostWrapper, Icons, Title, TitleWrapper, Wrapper, Photo, Content, IconsWrapper } from "./styles";
import { LikeIcon, DislikeIcon } from '../../static/index';
import { store } from "../../store";
import actions from "../../store/reducer";
import { IPost } from "../../store/interfaces";

interface IProps {
    info: IPost,
    onClickButton: () => void,
    isBigPost?: boolean,
}


const Post = ({ info, onClickButton, isBigPost }: IProps) => {
    const fillLikeIcon = info?.userAction === 'like' ? 'green' : 'black';
    const fillDislikeIcon = info?.userAction === 'dislike' ? 'red' : 'black';

    const onClickLike = () => {
        const likesCount = info.likesCount ? info.likesCount : 0;
        if (info.userAction === 'like') {
            store.dispatch(actions.changeReaction({
                id: info?.id,
                postInfo: { ...info, userAction: 'default', likesCount: likesCount - 1 }
            }));
        } else if (info.userAction === 'dislike') {
            store.dispatch(actions.changeReaction({
                id: info?.id,
                postInfo: {
                    ...info,
                    userAction: 'like',
                    likesCount: likesCount + 1,
                    dislikesCount: info.dislikesCount && info.dislikesCount - 1
                }
            }));
        } else {
            store.dispatch(actions.changeReaction({
                id: info?.id,
                postInfo: { ...info, userAction: 'like', likesCount: likesCount + 1 }
            }));
        }
    }

    const onClickDislike = () => {
        const dislikesCount = info?.dislikesCount ? info?.dislikesCount : 0;
        if (info.userAction === 'dislike') {
            store.dispatch(actions.changeReaction({
                id: info?.id,
                postInfo: { ...info, userAction: 'default', dislikesCount: dislikesCount - 1 }
            }));
        } else if (info.userAction === 'like') {
            store.dispatch(actions.changeReaction({
                id: info?.id,
                postInfo: {
                    ...info,
                    userAction: 'dislike',
                    dislikesCount: dislikesCount + 1,
                    likesCount: info.likesCount && info.likesCount - 1
                }
            }));
        } else {
            store.dispatch(actions.changeReaction({
                id: info?.id,
                postInfo: { ...info, userAction: 'dislike', dislikesCount: dislikesCount + 1 }
            }));
        }
    }

    return isBigPost
        ? <BigPostWrapper>
            <Photo alt='картинка большого поста' src='https://placehold.co/1200x500/orange/white?text=Big+photo' />
            <Content>
                <TitleWrapper>
                    <BigTitle>{info?.title}</BigTitle>
                    <Icons>
                        <LikeIcon fill={fillLikeIcon} onClick={onClickLike} />{info?.likesCount}
                        <DislikeIcon fill={fillDislikeIcon} onClick={onClickDislike} />{info?.dislikesCount}
                    </Icons>
                </TitleWrapper>
                <p>{info?.body}</p>
                <Button onClick={onClickButton}>Читать далее</Button>
            </Content>
        </BigPostWrapper>
        : <Wrapper>
            <Photo alt='картинка поста' src='https://placehold.co/600x300/darkcyan/white?text=image' />
            <Content>
                <Title>{info?.title}</Title>
                <IconsWrapper>
                    <Icons>
                        <LikeIcon fill={fillLikeIcon} onClick={onClickLike} />
                        {info?.likesCount}
                        <DislikeIcon fill={fillDislikeIcon} onClick={onClickDislike} />
                        {info?.dislikesCount}
                    </Icons>
                    <Button onClick={onClickButton}>Читать далее</Button>
                </IconsWrapper>
            </Content>
        </Wrapper>
}

export default Post;