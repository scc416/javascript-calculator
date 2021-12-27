const Screen = ({value, calculations}) => {
  return (
    <div className="button screen">
      <div className="equation">
        {calculations}
        {value}
      </div>
      <div id="display">{value}</div>
    </div>
  );
};

export default Screen;
