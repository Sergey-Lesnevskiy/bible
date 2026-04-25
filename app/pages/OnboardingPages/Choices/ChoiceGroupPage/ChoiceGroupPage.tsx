import Choice from '../Choice/Choice';
import { IWithOnClick, IWithSelectString } from '../../../../types/iWith';

const ageGroups = ['13-17', '18-24', '25-34', '35-44', '45+'];

const ChoiceGroupPage = ({
  onClick,
  onSelect,
}: IWithOnClick & IWithSelectString) => {
  return (
    <Choice
      title="Which age group do you belong to?"
      description="This allows us to personalize your experience"
      options={ageGroups}
      onSelect={onSelect}
      onClick={onClick}
    />
  );
};

export default ChoiceGroupPage;
