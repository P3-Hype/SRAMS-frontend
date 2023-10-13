import { Container } from "@mui/material";
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";

function HomePage() {
    const alert = useAlert();
    
    return (
        <BasePage alert={alert}>
            <Container>
            </Container>
        </BasePage>
    );
}

export default HomePage;