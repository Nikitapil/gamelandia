import React, { FC } from 'react'
import { Figure } from '../../models/chess/figures/figure';

interface LostFiguresProps {
    title: string;
    figures: Figure[]
}

export const LostFigures:FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className='lost-figures'>
        <h3 className='lost-figures__title'>{title}:</h3>
        {figures.map(figure => 
            <div key={figure.id} className='lost-figures__item'>
                {figure.name} {figure.logo && <img src={figure.logo}/>}
            </div>
            )}
    </div>
  )
}
