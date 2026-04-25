import Choice from '../Choice/Choice';
import { IWithOnClick, IWithSelectString } from '../../../../types/iWith';

const gender = ['Male', 'Female'];

const ChoiceGenderPage = ({
  onClick,
  onSelect,
}: IWithOnClick & IWithSelectString) => {
  return (
    <Choice
      title="What is your gender?"
      description="This allows us to personalize your experience"
      options={gender}
      onSelect={onSelect}
      onClick={onClick}
    />
  );
};

export default ChoiceGenderPage;
