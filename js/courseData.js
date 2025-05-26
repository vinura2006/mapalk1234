/**
 * Course data with lessons for each language stream and grade
 */
export const courseData = {
  tamil: [
    {
      grade: 1,
      title: "Tamil Grade 1",
      description: "Introduction to Tamil alphabet and basic vocabulary.",
      image: "https://images.pexels.com/photos/8422403/pexels-photo-8422403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Alphabet", "Numbers", "Basic Words", "Simple Sentences"],
      lessons: 12,
      lessonDetails: [
        {
          title: "Tamil Alphabet Introduction",
          introduction: "In this lesson, we'll learn about the Tamil alphabet and its unique characteristics. Tamil is one of the oldest languages in the world with a rich history spanning thousands of years.",
          videoUrl: "https://www.youtube.com/embed/w8f4XbASv2I",
          pdfMaterials: [
            {
              title: "Tamil Alphabet Worksheets",
              description: "Practice worksheets for writing Tamil letters"
            },
            {
              title: "Tamil Vowels Guide",
              description: "Comprehensive guide to Tamil vowels with examples"
            }
          ],
          exercise: {
            title: "Identifying Tamil Vowels",
            question: "Which of the following is a Tamil vowel?",
            options: ["க", "ங", "அ", "ட"],
            correctOption: 2
          }
        },
        {
          title: "Basic Tamil Vocabulary",
          introduction: "This lesson covers essential Tamil vocabulary for beginners. You'll learn common words used in everyday conversations.",
          videoUrl: "https://www.youtube.com/embed/w8f4XbASv2I",
          pdfMaterials: [
            {
              title: "Basic Tamil Vocabulary List",
              description: "List of 100 common Tamil words with translations"
            }
          ],
          exercise: {
            title: "Matching Tamil Words",
            question: "What is the Tamil word for 'water'?",
            options: ["தண்ணீர்", "பால்", "பழம்", "வீடு"],
            correctOption: 0
          }
        },
        {
          title: "Counting in Tamil",
          introduction: "Learn how to count from 1 to 10 in Tamil. Numbers are essential for everyday communication.",
          videoUrl: "https://www.youtube.com/embed/w8f4XbASv2I",
          pdfMaterials: [
            {
              title: "Tamil Numbers Worksheet",
              description: "Practice writing and recognizing Tamil numbers"
            }
          ],
          exercise: {
            title: "Tamil Numbers Quiz",
            question: "Which is the correct Tamil word for number 5?",
            options: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"],
            correctOption: 1
          }
        }
      ],
      relatedMaterials: [
        {
          type: "video",
          title: "Tamil Alphabet Songs",
          description: "Fun songs to help remember the Tamil alphabet",
          image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          url: "#"
        },
        {
          type: "pdf",
          title: "Tamil Coloring Book",
          description: "Learn Tamil letters through coloring activities",
          image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          url: "#"
        },
        {
          type: "exercise",
          title: "Tamil Letter Matching Game",
          description: "Interactive game to practice Tamil letter recognition",
          image: "https://images.pexels.com/photos/7087668/pexels-photo-7087668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          url: "#"
        }
      ]
    }
  ],
  english: [
    {
      grade: 1,
      title: "English Grade 1",
      description: "Introduction to English alphabet and basic vocabulary.",
      image: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      topics: ["Alphabet", "Phonics", "Basic Words", "Simple Sentences"],
      lessons: 12,
      lessonDetails: [
        {
          title: "English Alphabet",
          introduction: "This lesson introduces the English alphabet, including both uppercase and lowercase letters. You'll learn how to recognize and write each letter correctly.",
          videoUrl: "https://www.youtube.com/embed/jPvcqBqFPjE",
          pdfMaterials: [
            {
              title: "English Alphabet Worksheets",
              description: "Practice worksheets for writing English letters"
            },
            {
              title: "Letter Recognition Activities",
              description: "Fun activities to help recognize English letters"
            }
          ],
          exercise: {
            title: "Letter Identification",
            question: "Which letter comes after 'D' in the English alphabet?",
            options: ["C", "E", "F", "G"],
            correctOption: 1
          }
        },
        {
          title: "Basic English Phonics",
          introduction: "Learn the sounds associated with each letter of the English alphabet. Phonics is the foundation for reading and pronunciation.",
          videoUrl: "https://www.youtube.com/embed/jPvcqBqFPjE",
          pdfMaterials: [
            {
              title: "Phonics Practice Sheets",
              description: "Exercises to practice letter sounds"
            }
          ],
          exercise: {
            title: "Letter Sounds Quiz",
            question: "Which word starts with the /b/ sound?",
            options: ["Apple", "Dog", "Ball", "Cat"],
            correctOption: 2
          }
        },
        {
          title: "Simple English Words",
          introduction: "This lesson covers basic English vocabulary that beginners should know, including common nouns, verbs, and adjectives.",
          videoUrl: "https://www.youtube.com/embed/jPvcqBqFPjE",
          pdfMaterials: [
            {
              title: "Basic English Vocabulary List",
              description: "List of 100 common English words with pictures"
            }
          ],
          exercise: {
            title: "Word Matching",
            question: "Which of these is NOT an animal?",
            options: ["Cat", "Apple", "Dog", "Bird"],
            correctOption: 1
          }
        }
      ],
      relatedMaterials: [
        {
          type: "video",
          title: "English Alphabet Songs",
          description: "Catchy songs to help memorize the English alphabet",
          image: "https://images.pexels.com/photos/8471958/pexels-photo-8471958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          url: "#"
        },
        {
          type: "pdf",
          title: "English Phonics Guide",
          description: "Comprehensive guide to English phonics for beginners",
          image: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          url: "#"
        },
        {
          type: "exercise",
          title: "Word Recognition Game",
          description: "Interactive game to practice English vocabulary",
          image: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          url: "#"
        }
      ]
    }
  ]
};

// Add more data for other grades as needed
// This is just a sample for Grade 1 in each language

// Helper function to generate more course data (would be replaced with real data in a production app)
export function generateMoreCourseData() {
  // Template for generating more course data if needed
  const lessonTemplate = {
    introduction: "This is a placeholder introduction for the lesson.",
    videoUrl: "https://www.youtube.com/embed/jPvcqBqFPjE",
    pdfMaterials: [
      {
        title: "Lesson Worksheet",
        description: "Practice worksheets for this lesson"
      }
    ],
    exercise: {
      title: "Practice Quiz",
      question: "Sample question for this lesson?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctOption: 1
    }
  };
  
  // Generate more lesson details for existing grades
  Object.keys(courseData).forEach(language => {
    courseData[language].forEach(grade => {
      // Only generate if we have fewer lessons than the specified count
      if (grade.lessonDetails.length < grade.lessons) {
        const lessonsToAdd = grade.lessons - grade.lessonDetails.length;
        
        for (let i = 0; i < lessonsToAdd; i++) {
          const lessonIndex = grade.lessonDetails.length + 1;
          
          grade.lessonDetails.push({
            title: `${language === 'tamil' ? 'Tamil' : 'English'} Lesson ${lessonIndex}`,
            introduction: `This is lesson ${lessonIndex} for ${language === 'tamil' ? 'Tamil' : 'English'} Grade ${grade.grade}.`,
            videoUrl: "https://www.youtube.com/embed/jPvcqBqFPjE",
            pdfMaterials: [
              {
                title: `Lesson ${lessonIndex} Worksheets`,
                description: `Practice worksheets for lesson ${lessonIndex}`
              }
            ],
            exercise: {
              title: `Lesson ${lessonIndex} Quiz`,
              question: `Sample question for lesson ${lessonIndex}?`,
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctOption: 1
            }
          });
        }
      }
    });
  });
}