export interface IWithOnClick {
  onClick: VoidFunction;
}

export interface IWithSelectString {
  onSelect: (value: string) => void;
}

export interface IWithPopupTwoButtons {
  onCancel: VoidFunction;
  onTryAgain: VoidFunction;
}
