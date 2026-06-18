const paises = [
  "mexico", "sudafrica", "corea-del-sur", "chequia", "canada", "bosnia",
  "qatar", "suiza", "brasil", "marruecos", "haiti", "escocia",
  "estados-unidos", "paraguay", "australia", "turquia", "alemania", "curazao",
  "costa-marfil", "ecuador", "ghana", "haiti", "iran", "irak",
  "japon", "jordania", "corea-del-sur", "mexico", "marruecos", "paises-bajos",
  "nueva-zelanda", "noruega", "panama", "paraguay", "portugal", "qatar",
  "arabia-saudita", "escocia", "senegal", "sudafrica", "espana", "suecia",
  "suiza", "tunez", "turquia", "estados-unidos", "uruguay", "uzbekistan",
];

const GrupoBanderas = () => (
  <div className="flex shrink-0 items-center gap-5">
    {paises.map((pais) => (
      <div
        className="h-9 w-14 shrink-0 overflow-hidden rounded-sm border border-green-primary/15 bg-white shadow-sm"
        key={pais}
      >
        <img
          alt=""
          className="h-full w-full object-cover"
          src={`/banderas-mundial-2026/${pais}.png`}
        />
      </div>
    ))}
  </div>
);

const FranjaBanderasCatalogo = () => (
  <div
    aria-hidden="true"
    className="w-full overflow-hidden bg-white pb-0 pt-3"
  >
    <div className="pl-5">
      <div className="flex w-max gap-5 animate-banderas-catalogo">
        <GrupoBanderas />
        <GrupoBanderas />
      </div>
    </div>
  </div>
);

export default FranjaBanderasCatalogo;
