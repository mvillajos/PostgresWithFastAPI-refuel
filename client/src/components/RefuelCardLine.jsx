const RefuelCardLine = ({ texto_label, texto_info, es_titulo }) => {
  return (
    <div className="text-slate-300 grid grid-cols-2">
      <h3 className={`${es_titulo ? "text-2xl font-bold" : "text-l"}`}>
        {texto_label}{" "}
      </h3>
      <h3
        className={`${
          es_titulo ? "text-2xl font-bold" : "text-l"
        } text-green-200`}
      >
        {texto_info}
      </h3>
    </div>
  );
};

export default RefuelCardLine;
