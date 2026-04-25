import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

import type { BibleJson } from '../../../../utils/bibleJson';

import { ThemedText } from '../../../General/ThemedText/ThemedText';

import { styles } from '../PopupBiblePicker.styles';

type VersionListItem = {
  key: string;
  code: string;
  name: string;
  description?: string;
  json: BibleJson;
};

type VersionListProps = {
  itemBg: string;
  versions: VersionListItem[];
  selectedName: string;
  isControlled: boolean;
  onPickVersion: (json: BibleJson) => void;
};

const VersionList: React.FC<VersionListProps> = ({
  itemBg,
  versions,
  selectedName,
  isControlled,
  onPickVersion,
}) => {
  return (
    <FlatList
      data={versions}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const isSelected = item.code === selectedName;
        const displayCode = item.code.replace(/_/g, ' ');

        return (
          <Pressable
            style={({ pressed }) => [
              styles.versionCard,
              { backgroundColor: itemBg, opacity: pressed ? 0.9 : 1 },
              isSelected && { opacity: 1 },
            ]}
            onPress={() => {
              onPickVersion(item.json);
            }}
          >
            <ThemedText variant="amBody20Default">
              {item.name} ({displayCode})
            </ThemedText>
            <ThemedText variant="sfBody17Regular" notifiCationText>
              {item.description || ''}
            </ThemedText>
          </Pressable>
        );
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListFooterComponent={() => <View style={{ height: 18 }} />}
    />
  );
};

export default VersionList;
