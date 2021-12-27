import useData from "./hooks/useData";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator";

const App = () => {
  const props = useData();
  const { onKeyPress } = props;

  return (
    <div onKeyPress={onKeyPress} tabIndex="0" className="full">
      <Calculator {...props} />
      <Footer />
    </div>
  );
};

export default App;
