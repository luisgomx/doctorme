import ContentContainer from "./components/containers/ContentContainer";
import HeaderContainer from "./components/containers/HeaderContainer";
import Header from "./components/header/Header";
import List from "./components/list/List";

function App() {
  return (
    <>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <ContentContainer>
        <List />
      </ContentContainer>
    </>
  );
}

export default App;
