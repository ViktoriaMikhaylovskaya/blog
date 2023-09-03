import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LikeIcon, DislikeIcon, ArrowIcon } from '../../static/index';
import { store } from "../../store";
import { getPost } from "../../store/api-actions";
import { selector } from "../../store/selectors";
import actions from "../../store/reducer";
import { Button, ContentWrapper, Header, Icons, Title } from "./styles"

const PostInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { postInfo, isLoading, postList } = useSelector(selector);
    const fillLikeIcon = postInfo?.userAction === 'like' ? 'green' : 'black';
    const fillDislikeIcon = postInfo?.userAction === 'dislike' ? 'red' : 'black';

    const onClickLike = () => {
        const likesCount = postInfo?.likesCount ? postInfo?.likesCount : 0;
        if (postInfo?.userAction === 'like') {
            store.dispatch(actions.changePostReaction({
                ...postInfo, userAction: 'default', likesCount: likesCount - 1
            }));
        } else if (postInfo?.userAction === 'dislike') {
            store.dispatch(actions.changePostReaction({
                ...postInfo,
                userAction: 'like',
                likesCount: likesCount + 1,
                dislikesCount: postInfo?.dislikesCount && postInfo?.dislikesCount - 1,
            }));
        } else {
            store.dispatch(actions.changePostReaction({
                ...postInfo, userAction: 'like', likesCount: likesCount + 1
            }));
        }
    }

    const onClickDislike = () => {
        const dislikesCount = postInfo?.dislikesCount ? postInfo?.dislikesCount : 0;
        if (postInfo?.userAction === 'dislike') {
            store.dispatch(actions.changePostReaction({
                ...postInfo, userAction: 'default', dislikesCount: dislikesCount - 1
            }));
        } else if (postInfo?.userAction === 'like') {
            store.dispatch(actions.changePostReaction({
                ...postInfo,
                userAction: 'dislike',
                dislikesCount: dislikesCount + 1,
                likesCount: postInfo?.likesCount && postInfo?.likesCount - 1,
            }));
        } else {
            store.dispatch(actions.changePostReaction({
                ...postInfo, userAction: 'dislike', dislikesCount: dislikesCount + 1
            }));
        }
    }

    useEffect(() => {
        if (!!postList[Number(id)]) {
            const { likesCount, dislikesCount, userAction } = postList[Number(id)];
            store.dispatch(getPost({ id: String(id), reactions: { likesCount, dislikesCount, userAction } }));
        } else {
            store.dispatch(getPost({
                id: String(id),
                reactions: {
                    likesCount: Math.floor(Math.random() * 50),
                    dislikesCount: Math.floor(Math.random() * 50),
                    userAction: 'default',
                }
            }));
        }
    }, [id, postList]);

    return <>
        <Header>
            <Button onClick={() => navigate('/')}>
                <ArrowIcon />
                Вернуться к статьям
            </Button>
            <Icons>
                <LikeIcon fill={fillLikeIcon} onClick={onClickLike} />
                {postInfo?.likesCount}
                <DislikeIcon fill={fillDislikeIcon} onClick={onClickDislike} />
                {postInfo?.dislikesCount}
            </Icons>
        </Header>
        <ContentWrapper>
            {isLoading ? <div>Loading...</div>
                : <>
                    <Title>{postInfo?.title}</Title>
                    <img alt='картинка поста' src='https://placehold.co/800x500/darkblue/yellow?text=Image' width='100%' />
                    <p>{postInfo?.body}</p>
                </>
            }
        </ContentWrapper>

    </>
}

export default PostInfo;
