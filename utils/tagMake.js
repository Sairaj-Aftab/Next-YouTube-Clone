function tagMake(sentence) {
  // Step 1: Tokenize the sentence into words
  const words = sentence.split(/\s+/);

  // Step 2 (optional): Filter out common stop words
  const stopWords = ["the", "a", "an", "and", "or", "in", "on", "at", "with"];
  const filteredWords = words.filter(
    (word) => !stopWords.includes(word.toLowerCase())
  );

  // Step 3: Normalize words (convert to lowercase and remove punctuation)
  const normalizedWords = filteredWords.map((word) =>
    word.toLowerCase().replace(/[^\w\s]/g, "")
  );

  // Step 4: Create a set to store unique tags
  const uniqueTags = new Set();

  // Step 5: Add normalized words to the set
  normalizedWords.forEach((word) => {
    if (word.length > 0) {
      // Exclude empty strings
      uniqueTags.add(word);
    }
  });

  return Array.from(uniqueTags);
}

export default tagMake;
