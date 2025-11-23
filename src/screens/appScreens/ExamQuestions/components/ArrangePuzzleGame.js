import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';
import {COLORS} from '../../../../constants/theme';

const ArrangePuzzleGame = ({question, onAnswerChange, selectedAnswer}) => {
  const [sortedWords, setSortedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(
    question.str_shuffle ? [...question.str_shuffle] : [],
  );

  useEffect(() => {
    // Reset when question changes
    setSortedWords([]);
    setAvailableWords(question.str_shuffle ? [...question.str_shuffle] : []);
  }, [question.question_id, question.str_shuffle]);

  const handleWordClick = word => {
    const newSorted = [...sortedWords, word];
    const newAvailable = availableWords.filter((w, idx) => {
      const wordIndex = availableWords.indexOf(word);
      return idx !== wordIndex;
    });

    setSortedWords(newSorted);
    setAvailableWords(newAvailable);

    // Update answer
    const answer = newSorted.join(' ');
    onAnswerChange(answer);
  };

  const handleRemoveWord = (word, index) => {
    const newSorted = sortedWords.filter((_, idx) => idx !== index);
    const newAvailable = [...availableWords, word];

    setSortedWords(newSorted);
    setAvailableWords(newAvailable);

    // Update answer
    const answer = newSorted.join(' ');
    onAnswerChange(answer);
  };

  const handleShuffle = () => {
    const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
  };

  const handleReset = () => {
    setSortedWords([]);
    setAvailableWords(question.str_shuffle ? [...question.str_shuffle] : []);
    onAnswerChange('');
  };

  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.arrangeGameContainer}>
      {/* Title */}
      <Text style={styles.arrangeGameTitle}>لعبة تسميع الكلمات (الجمل)</Text>
      <Text style={styles.arrangeGameSubtitle}>
        رتب الكلمات لتكوين جملة صحيحة
      </Text>

      {/* Action Buttons */}
      <View style={styles.arrangeActionButtons}>
        <TouchableOpacity
          style={styles.shuffleButton}
          onPress={handleShuffle}
          activeOpacity={0.7}>
          <Ionicons name="shuffle" size={RFValue(18)} color="#fff" />
          <Text style={styles.shuffleButtonText}>خلط الكلمات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}>
          <Text style={styles.resetButtonText}>إعادة تعيين</Text>
          <Ionicons name="refresh" size={RFValue(18)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sorted Sentence Section */}
      <View style={styles.sortedSentenceContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.yellowDot} />
          <Text style={styles.sectionTitle}>الجملة المرتبة</Text>
        </View>
        <View style={styles.sortedWordsContainer}>
          {sortedWords.length === 0 ? (
            <Text style={styles.placeholderText}>
              اسحب الكلمات هنا لترتيب الجملة...
            </Text>
          ) : (
            <View style={styles.sortedWordsRow}>
              {sortedWords.map((word, index) => (
                <TouchableOpacity
                  key={`sorted-${index}`}
                  style={styles.sortedWordBlock}
                  onPress={() => handleRemoveWord(word, index)}
                  activeOpacity={0.7}>
                  <View style={styles.wordNumberBadge}>
                    <Text style={styles.wordNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.sortedWordText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Available Words Section */}
      <View style={styles.availableWordsContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.purpleDot} />
          <Text style={styles.sectionTitle}>الكلمات المتاحة</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.availableWordsRow}>
          {availableWords.map((word, index) => (
            <TouchableOpacity
              key={`available-${index}`}
              style={styles.availableWordBlock}
              onPress={() => handleWordClick(word)}
              activeOpacity={0.7}>
              <Text style={styles.availableWordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Current Result */}
      {sortedWords.length > 0 && (
        <View style={styles.currentResultContainer}>
          <Text style={styles.currentResultText}>
            النتيجة الحالية: "{sortedWords.join(' ')}"
          </Text>
        </View>
      )}

      {/* How to Play Section */}
      <View style={styles.howToPlayContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueDot} />
          <Text style={styles.sectionTitle}>كيفية اللعب</Text>
        </View>
        <View style={styles.howToPlayContent}>
          <Text style={styles.howToPlayText}>طريقة اللعب: اضغط ع الكلمة</Text>
          <View style={styles.goalRow}>
            <Ionicons name="star" size={RFValue(16)} color="#FFC107" />
            <Text style={styles.goalText}>الهدف: رتب الكلمات لتكوين جملة</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  arrangeGameContainer: {
    marginBottom: RFValue(24),
    borderRadius: RFValue(16),
    padding: RFValue(20),
    elevation: RFValue(4),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(8),
  },
  arrangeGameTitle: {
    fontSize: RFValue(22),
    color: '#fff',
    textAlign: 'center',
    marginBottom: RFValue(8),
    ...FONTS.body2,
    fontWeight: 'bold',
  },
  arrangeGameSubtitle: {
    fontSize: RFValue(14),
    color: '#fff',
    textAlign: 'center',
    marginBottom: RFValue(20),
    ...FONTS.body4,
  },
  arrangeActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(20),
    gap: RFValue(10),
  },
  shuffleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C42',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(12),
    borderTopRightRadius: RFValue(20),
    gap: RFValue(8),
  },
  shuffleButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(12),
    borderTopLeftRadius: RFValue(20),
    gap: RFValue(8),
  },
  resetButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },
  sortedSentenceContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: RFValue(16),
    padding: RFValue(16),
    marginBottom: RFValue(16),
    minHeight: RFValue(120),
  },
  availableWordsContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: RFValue(16),
    padding: RFValue(16),
    marginBottom: RFValue(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(12),
  },
  yellowDot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#FFC107',
    marginLeft: RFValue(8),
  },
  purpleDot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#9C27B0',
    marginLeft: RFValue(8),
  },
  blueDot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#2196F3',
    marginLeft: RFValue(8),
  },
  sectionTitle: {
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body4,
    fontWeight: '600',
  },
  sortedWordsContainer: {
    minHeight: RFValue(80),
    justifyContent: 'center',
    direction: 'ltr',
  },
  placeholderText: {
    fontSize: RFValue(14),
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    ...FONTS.body4,
  },
  sortedWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFValue(8),
  },
  sortedWordBlock: {
    backgroundColor: '#D3D3D3',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    paddingTop: RFValue(20),
    marginBottom: RFValue(8),
    position: 'relative',
    minWidth: RFValue(80),
    alignItems: 'center',
  },
  wordNumberBadge: {
    position: 'absolute',
    top: RFValue(4),
    left: RFValue(4),
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: RFValue(12),
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordNumberText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  sortedWordText: {
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body4,
  },
  availableWordsRow: {
    flexDirection: 'row',
    gap: RFValue(8),
    paddingVertical: RFValue(4),
  },
  availableWordBlock: {
    backgroundColor: '#D3D3D3',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    minWidth: RFValue(70),
    alignItems: 'center',
  },
  availableWordText: {
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body4,
  },
  currentResultContainer: {
    marginTop: RFValue(8),
    marginBottom: RFValue(16),
    padding: RFValue(12),
    borderRadius: RFValue(8),
  },
  currentResultText: {
    fontSize: RFValue(14),
    color: COLORS.black,
    textAlign: 'center',
    ...FONTS.body4,
  },
  howToPlayContainer: {
    backgroundColor: '#B3E5FC',
    borderRadius: RFValue(16),
    padding: RFValue(16),
  },
  howToPlayContent: {
    marginTop: RFValue(8),
  },
  howToPlayText: {
    fontSize: RFValue(13),
    color: '#333',
    marginBottom: RFValue(8),
    ...FONTS.body4,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
  },
  goalText: {
    fontSize: RFValue(13),
    color: '#333',
    ...FONTS.body4,
  },
});

export default ArrangePuzzleGame;

