import { useTranslation } from 'react-i18next';

import LifeGameBoard from '../components/LifeGameBoard';
import { useTitle } from '../../../hooks/useTitle';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';

const Life = () => {
  const { t } = useTranslation();

  useTitle(t('life_game'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.life]);

  return (
    <div className="container game-page-container">
      <h2 className="page-title">{t('life_game')}</h2>
      <LifeGameBoard />
    </div>
  );
};

export default Life;
