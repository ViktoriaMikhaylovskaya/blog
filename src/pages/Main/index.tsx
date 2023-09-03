import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import { store } from "../../store";
import { selector } from "../../store/selectors";
import { fetchPostsAction } from "../../store/api-actions";
import { ContentWrapper, Description, SearchInput, Title } from "./styles";

const Main = () => {
    const navigate = useNavigate();
    const { postList, isLoading } = useSelector(selector);
    const [searchValue, setSearchValue] = useState('');

    const onClickReadMoreButton = (id: number) => {
        navigate(`/post/${id}`);
    }

    useEffect(() => {
        store.dispatch(fetchPostsAction({
            postCount: `?_start=${0}&_limit=20`,
            searchValue: searchValue ? `&title=${searchValue}` : '',
        }));
    }, [searchValue])


    return <div>
        <Title>Блог</Title>
        <Description>
            Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи.
        </Description>
        <SearchInput
            type="text"
            placeholder="Поиск по названию статьи"
            onChange={(e) => setSearchValue(e.target.value)}
        />

        <ContentWrapper>
            {isLoading ? <div>Loading...</div>
                : <>
                    {postList ? Object.values(postList).map((el, i) =>
                        <Post
                            key={el?.id}
                            info={el}
                            onClickButton={() => onClickReadMoreButton(el?.id)}
                            isBigPost={i === 0}
                        />
                    ) : <div>Список пуст.</div>}
                </>
            }
        </ContentWrapper>
    </div>
}

export default Main;