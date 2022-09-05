import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Figure } from "../../models/chess/figures/figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  const {t} = useTranslation()
  return (
    <div className="lost-figures">
      <h3 className="lost-figures__title">{title}:</h3>
      {figures.map((figure) => (
        <div key={figure.id} className="lost-figures__item">
          {t(figure.name)} {figure.logo && <img src={figure.logo} alt="figure icon" />}
        </div>
      ))}
    </div>
  );
};
