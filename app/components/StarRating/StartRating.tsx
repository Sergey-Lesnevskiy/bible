import React from 'react';
import { View, ViewStyle } from 'react-native';
import MyStartSVGYellow from '../../assets/icons/onboarding/star-notification-yellow.svg';
import MyStartSVGray from '../../assets/icons/onboarding/star-notification-gray.svg';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  starSize?: number;
  style?: ViewStyle;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  starSize = 20,
  style,
}) => {
  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const StarIcon = index < rating ? MyStartSVGYellow : MyStartSVGray;
        return (
          <StarIcon
            key={index}
            width={starSize}
            height={starSize}
            style={{ marginHorizontal: 2 }}
          />
        );
      })}
    </View>
  );
};
