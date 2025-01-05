import useFetch from "hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import Quiz from "./Quiz"
const index = () => {
    const params = useParams();
    const { id_nilai } = params
    const { result } = useFetch({ link: "/pembahasan/get_nilai/" + id_nilai })
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title="Pembahasan">
                        {/* <pre>
                            {JSON.stringify(result, null, 2)}
                        </pre> */}
                        <Quiz Result={result}/>
                    </CustomPaper>
                </ContentParent>
                <Footer/>
            </CustomContainer>
        </>
    )
};

export default index;