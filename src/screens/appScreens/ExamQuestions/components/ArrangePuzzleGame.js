import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';
import {COLORS} from '../../../../constants/theme';

const ArrangePuzzleGame = ({question, onAnswerChange, selectedAnswer}) => {
  const isCharacterMode = question.gameType === 'character';
  const [sortedWords, setSortedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(
    question.str_shuffle ? [...question.str_shuffle] : [],
  );

  useEffect(() => {
    // Reset when question changes
    if (selectedAnswer && selectedAnswer.trim() !== '') {
      // Restore state from selectedAnswer
      const restoredItems = isCharacterMode
        ? selectedAnswer.split('')
        : selectedAnswer.split(' ').filter(item => item.trim() !== '');
      const allItems = question.str_shuffle ? [...question.str_shuffle] : [];
      
      // Create a copy of all items and remove used ones
      const availableCopy = [...allItems];
      restoredItems.forEach(item => {
        const index = availableCopy.indexOf(item);
        if (index !== -1) {
          availableCopy.splice(index, 1);
        }
      });
      
      setSortedWords(restoredItems);
      setAvailableWords(availableCopy);
    } else {
      setSortedWords([]);
      setAvailableWords(question.str_shuffle ? [...question.str_shuffle] : []);
    }
  }, [question.question_id, question.str_shuffle, isCharacterMode, selectedAnswer]);

  const handleWordClick = word => {
    const newSorted = [...sortedWords, word];
    const newAvailable = availableWords.filter((w, idx) => {
      const wordIndex = availableWords.indexOf(word);
      return idx !== wordIndex;
    });

    setSortedWords(newSorted);
    setAvailableWords(newAvailable);

    // Update answer - join with space for words, without space for letters
    const answer = isCharacterMode
      ? newSorted.join('')
      : newSorted.join(' ');
    onAnswerChange(answer);
  };

  const handleRemoveWord = (word, index) => {
    const newSorted = sortedWords.filter((_, idx) => idx !== index);
    const newAvailable = [...availableWords, word];

    setSortedWords(newSorted);
    setAvailableWords(newAvailable);

    // Update answer - join with space for words, without space for letters
    const answer = isCharacterMode
      ? newSorted.join('')
      : newSorted.join(' ');
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
      <Text style={styles.arrangeGameTitle}>
        {isCharacterMode
          ? 'لعبة تسميع الكلمات (الأحرف)'
          : 'لعبة تسميع الكلمات (الجمل)'}
      </Text>
      <Text style={styles.arrangeGameSubtitle}>
        {isCharacterMode
          ? 'رتب الأحرف لتكوين كلمة صحيحة'
          : 'رتب الكلمات لتكوين جملة صحيحة'}
      </Text>

      {/* Hint Button - Only show in character mode, in separate row */}
      {isCharacterMode && question.hint && (
        <View style={styles.hintButtonContainer}>
          <TouchableOpacity
            style={styles.hintButton}
            activeOpacity={0.7}>
            <Text style={styles.hintButtonText}>{question.hint}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.arrangeActionButtons}>
        <TouchableOpacity
          style={styles.shuffleButton}
          onPress={handleShuffle}
          activeOpacity={0.7}>
          <Ionicons name="shuffle" size={RFValue(14)} color="#fff" />
          <Text style={styles.shuffleButtonText}>
            {isCharacterMode ? 'خلط الأحرف' : 'خلط الكلمات'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}>
          <Text style={styles.resetButtonText}>إعادة تعيين</Text>
          <Ionicons name="refresh" size={RFValue(14)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sorted Sentence/Word Section */}
      <View style={styles.sortedSentenceContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.orangeDot} />
          <Text style={styles.sectionTitle}>
            {isCharacterMode ? 'الكلمة المرتبة' : 'الجملة المرتبة'}
          </Text>
        </View>
        <View style={styles.sortedWordsContainer}>
          {sortedWords.length === 0 ? (
            <Text style={styles.placeholderText}>
              {isCharacterMode
                ? 'اضغط على الأحرف لترتيب الكلمة...'
                : 'اسحب الكلمات هنا لترتيب الجملة...'}
            </Text>
          ) : (
            <View style={styles.sortedWordsRow}>
              {sortedWords.map((word, index) => (
                <TouchableOpacity
                  key={`sorted-${index}`}
                  style={[
                    styles.sortedWordBlock,
                    isCharacterMode && styles.sortedLetterBlock,
                  ]}
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

      {/* Available Words/Letters Section */}
      <View style={styles.availableWordsContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.purpleDot} />
          <Text style={styles.sectionTitle}>
            {isCharacterMode ? 'الأحرف المتاحة' : 'الكلمات المتاحة'}
          </Text>
        </View>
        {availableWords.length === 0 ? (
          <View style={styles.allUsedContainer}>
            <Ionicons name="checkmark-circle" size={RFValue(18)} color="#4CAF50" />
            <Text style={styles.allUsedText}>
              {isCharacterMode
                ? 'جميع الأحرف مستخدمة!'
                : 'جميع الكلمات مستخدمة!'}
            </Text>
          </View>
        ) : (
          <View style={styles.availableWordsRow}>
            {availableWords.map((word, index) => (
              <TouchableOpacity
                key={`available-${index}`}
                style={[
                  styles.availableWordBlock,
                  isCharacterMode && styles.availableLetterBlock,
                ]}
                onPress={() => handleWordClick(word)}
                activeOpacity={0.7}>
                <Text style={styles.availableWordText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Current Result */}
      {sortedWords.length > 0 && (
        <View style={styles.currentResultContainer}>
          <Text style={styles.currentResultText}>
            النتيجة الحالية: "{isCharacterMode
              ? sortedWords.join('')
              : sortedWords.join(' ')}"
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
          
          <Text style={styles.howToPlayText}>
            {isCharacterMode
              ? 'طريقة اللعب: اضغط ع الكلمة'
              : 'طريقة اللعب: اضغط ع الكلمة'}
          </Text>
          <View style={styles.goalRow}>
            {/* <Ionicons name="star" size={RFValue(12)} color="#FFC107" /> */}
            <Text style={styles.goalText}>
              {isCharacterMode
                ? 'الهدف: رتب الأحرف لتكوين كلمة'
                : 'الهدف: رتب الكلمات لتكوين جملة'}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  arrangeGameContainer: {
    marginBottom: RFValue(18),
    borderRadius: RFValue(16),
    padding: RFValue(16),
    elevation: RFValue(8),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(4)},
    shadowOpacity: 0.4,
    shadowRadius: RFValue(12),
  },
  arrangeGameTitle: {
    fontSize: RFValue(18),
    color: '#fff',
    textAlign: 'center',
    marginBottom: RFValue(6),
    ...FONTS.body2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(4),
  },
  arrangeGameSubtitle: {
    fontSize: RFValue(12),
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: RFValue(16),
    ...FONTS.body4,
  },
  hintButtonContainer: {
    marginBottom: RFValue(12),
    width: '100%',
  },
  hintButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C27B0',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(12),
    borderWidth: RFValue(2),
    borderColor: '#BA68C8',
    width: '100%',
    elevation: RFValue(4),
    shadowColor: '#9C27B0',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(4),
  },
  arrangeActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(14),
    gap: RFValue(8),
  },
  hintButtonText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body4,
  },
  shuffleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C42',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
    borderRadius: RFValue(12),
    borderTopRightRadius: RFValue(16),
    gap: RFValue(6),
    elevation: RFValue(4),
    shadowColor: '#FF8C42',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(4),
  },
  shuffleButtonText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body4,
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
    borderRadius: RFValue(12),
    borderTopLeftRadius: RFValue(16),
    gap: RFValue(6),
    elevation: RFValue(4),
    shadowColor: '#4A90E2',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(4),
  },
  resetButtonText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body4,
  },
  sortedSentenceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: RFValue(14),
    padding: RFValue(12),
    marginBottom: RFValue(12),
    minHeight: RFValue(100),
    elevation: RFValue(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.1,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(1),
    borderColor: 'rgba(255, 140, 66, 0.2)',
  },
  availableWordsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: RFValue(14),
    padding: RFValue(12),
    marginBottom: RFValue(12),
    elevation: RFValue(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.1,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(1),
    borderColor: 'rgba(156, 39, 176, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(8),
  },
  orangeDot: {
    width: RFValue(6),
    height: RFValue(6),
    borderRadius: RFValue(3),
    backgroundColor: '#FF8C42',
    marginLeft: RFValue(6),
  },
  yellowDot: {
    width: RFValue(6),
    height: RFValue(6),
    borderRadius: RFValue(3),
    backgroundColor: '#FFC107',
    marginLeft: RFValue(6),
  },
  purpleDot: {
    width: RFValue(6),
    height: RFValue(6),
    borderRadius: RFValue(3),
    backgroundColor: '#9C27B0',
    marginLeft: RFValue(6),
  },
  blueDot: {
    width: RFValue(6),
    height: RFValue(6),
    borderRadius: RFValue(3),
    backgroundColor: '#2196F3',
    marginLeft: RFValue(6),
  },
  sectionTitle: {
    fontSize: RFValue(13),
    color: '#2C3E50',
    ...FONTS.body3,
  },
  sortedWordsContainer: {
    minHeight: RFValue(60),
    justifyContent: 'center',
    direction: 'ltr',
  },
  placeholderText: {
    fontSize: RFValue(12),
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    ...FONTS.body4,
    paddingVertical: RFValue(14),
    opacity: 0.7,
  },
  sortedWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFValue(6),
  },
  sortedWordBlock: {
    backgroundColor: '#FFE5D9',
    borderRadius: RFValue(12),
    padding: RFValue(10),
    paddingTop: RFValue(18),
    marginBottom: RFValue(6),
    position: 'relative',
    minWidth: RFValue(70),
    alignItems: 'center',
    elevation: RFValue(2),
    shadowColor: '#FF8C42',
    shadowOffset: {width: 0, height: RFValue(1)},
    shadowOpacity: 0.2,
    shadowRadius: RFValue(3),
    borderWidth: RFValue(1.5),
    borderColor: '#FF8C42',
  },
  sortedLetterBlock: {
    backgroundColor: '#E1F5FE',
    minWidth: RFValue(55),
    padding: RFValue(10),
    borderColor: '#4A90E2',
  },
  wordNumberBadge: {
    position: 'absolute',
    top: RFValue(4),
    left: RFValue(4),
    width: RFValue(20),
    height: RFValue(20),
    borderRadius: RFValue(10),
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(2),
    shadowColor: '#4A90E2',
    shadowOffset: {width: 0, height: RFValue(1)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(2),
    borderWidth: RFValue(1.5),
    borderColor: '#fff',
  },
  wordNumberText: {
    color: '#fff',
    fontSize: RFValue(10),
    ...FONTS.body5,
  },
  sortedWordText: {
    fontSize: RFValue(12),
    color: '#2C3E50',
    ...FONTS.body4,
  },
  availableWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFValue(6),
    paddingVertical: RFValue(4),
  },
  availableWordBlock: {
    backgroundColor: '#F3E5F5',
    borderRadius: RFValue(12),
    padding: RFValue(10),
    minWidth: RFValue(60),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(2),
    shadowColor: '#9C27B0',
    shadowOffset: {width: 0, height: RFValue(1)},
    shadowOpacity: 0.2,
    shadowRadius: RFValue(3),
    borderWidth: RFValue(1.5),
    borderColor: '#9C27B0',
  },
  availableLetterBlock: {
    backgroundColor: '#E1BEE7',
    minWidth: RFValue(45),
    padding: RFValue(8),
    borderColor: '#7B1FA2',
  },
  availableWordText: {
    fontSize: RFValue(12),
    color: '#4A148C',
    ...FONTS.body4,
  },
  currentResultContainer: {
    marginTop: RFValue(6),
    marginBottom: RFValue(12),
    padding: RFValue(12),
    borderRadius: RFValue(12),
    backgroundColor: '#9C27B0',
    elevation: RFValue(3),
    shadowColor: '#9C27B0',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(4),
    borderWidth: RFValue(2),
    borderColor: '#BA68C8',
  },
  currentResultText: {
    fontSize: RFValue(12),
    color: '#FFE5D9',
    textAlign: 'center',
    ...FONTS.body4,
  },
  allUsedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RFValue(8),
    paddingVertical: RFValue(12),
    backgroundColor: '#E8F5E9',
    borderRadius: RFValue(10),
    borderWidth: RFValue(2),
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
  },
  allUsedText: {
    fontSize: RFValue(12),
    color: '#2E7D32',
    textAlign: 'center',
    fontStyle: 'italic',
    ...FONTS.body4,
  },
  howToPlayContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: RFValue(14),
    padding: RFValue(12),
    elevation: RFValue(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.1,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(1),
    borderColor: 'rgba(33, 150, 243, 0.2)',
  },
  howToPlayContent: {
    marginTop: RFValue(6),
  },
  howToPlayText: {
    fontSize: RFValue(12),
    color: '#1976D2',
    marginBottom: RFValue(6),
    ...FONTS.body4,
    lineHeight: RFValue(16),
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(4),
  },
  goalText: {
    fontSize: RFValue(12),
    color: '#1976D2',
    ...FONTS.body4,
    flex: 1,
  },
});

export default ArrangePuzzleGame;


