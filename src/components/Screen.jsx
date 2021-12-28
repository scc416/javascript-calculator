const Screen = ({ value, calculations }) => {
  return (
    <div className="screen">
      <div>
        {calculations}
        {value}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default Screen;
