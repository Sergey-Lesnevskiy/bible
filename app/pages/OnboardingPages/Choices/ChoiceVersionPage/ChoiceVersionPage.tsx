import Choice from '../Choice/Choice';
import { IWithOnClick, IWithSelectString } from '../../../../types/iWith';

const bibleVersions = [
  'Revised Standart Version\n Catholic Edition',
  'New International Version\n (Anglicised) ',
  'New King James Version',
  'Amplifield',
  'New American Standart Bible',
  'King James (Authorised) Version',
  'World Messianic Bible',
  'Free Bible Version',
  "World English Bible, American English Edition, without Strong's Numbers",
  'The Passion Translation',
  'Nueva Versión Internacional(ES)',
  'Die Bibel',
  'La Parola è Vita',
  'Nova Versão Internacional(PT)',
  'La Bible du Semeur',
  'Noua Traducere Românească',
  'Ang Salita ng Dios',
  'Het Boek',
  'Reina-Valera',
];

const ChoiceVersionPage = ({
  onClick,
  onSelect,
}: IWithOnClick & IWithSelectString) => {
  return (
    <Choice
      title="Which Bible version do you prefer?"
      description="Find the version that speaks to your heart"
      options={bibleVersions}
      onSelect={onSelect}
      onClick={onClick}
    />
  );
};

export default ChoiceVersionPage;
