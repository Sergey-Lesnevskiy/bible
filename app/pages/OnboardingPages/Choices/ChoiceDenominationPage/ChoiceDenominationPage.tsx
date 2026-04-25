import Choice from '../Choice/Choice';
import { IWithOnClick, IWithSelectString } from '../../../../types/iWith';

export const religions = [
  'Catholic',
  'Protestant',
  'Baptist',
  'Nondenominational',
  'Methodist',
  'Pentecostal',
  'Lutheran',
  'Evangelical',
  'Adventist',
  'Orthodox',
  'Other',
];

interface ChoiceDenominationPageProps extends IWithOnClick, IWithSelectString {
}

const ChoiceDenominationPage = ({
  onClick,
  onSelect,
}: ChoiceDenominationPageProps) => {
  return (
    <Choice
      title="What is your denomination?"
      description="We’ll tailor our resources to fit your
unique background"
      options={religions}
      onClick={onClick}
      onSelect={onSelect}
    />
  );
};

export default ChoiceDenominationPage;
