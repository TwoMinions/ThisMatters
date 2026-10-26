export const QUOTES = [
  {
    text: "How we spend our days is, of course, how we spend our lives.",
    author: "Annie Dillard",
  },
  {
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  {
    text: "It is not enough to be busy; so are the ants. The question is: What are we busy about?",
    author: "Henry David Thoreau",
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "You don't have to see the whole staircase, just take the first step.",
    author: "Martin Luther King Jr.",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
  },
  {
    text: "There is no exquisite beauty without some strangeness in the proportion.",
    author: "Edgar Allan Poe",
  },
  {
    text: "A journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
  },
  {
    text: "The more that you read, the more things you will know.",
    author: "Dr. Seuss",
  },
  { text: "Attention is the beginning of devotion.", author: "Mary Oliver" },
  {
    text: "Nothing diminishes anxiety faster than action.",
    author: "Walter Anderson",
  },
  {
    text: "Nature does not hurry, yet everything is accomplished.",
    author: "Lao Tzu",
  },
];

const task = (title, description, minutes) => ({ title, description, minutes });
export const SKILLS = [
  {
    id: "coding",
    title: "Coding fundamentals",
    category: "Technology",
    emoji: "⌘",
    tint: "#dfefe5",
    description: "Think in logic. Create with code.",
    minutes: 15,
    tasks: [
      task(
        "Solve a tiny logic puzzle",
        "Write a program that finds the largest of three numbers. Try it without looking up the answer.",
        15,
      ),
      task(
        "Build a reusable function",
        "Write a function that checks whether a word is a palindrome. Test 5 inputs.",
        15,
      ),
      task(
        "Make a mini interaction",
        "Create a button and use JavaScript to update text when clicked.",
        15,
      ),
      task(
        "Practice arrays",
        "Loop through an array and display only numbers greater than 10.",
        12,
      ),
      task(
        "Handle input safely",
        "Validate an email input and show a clear helpful error message.",
        15,
      ),
      task(
        "Build a tiny to-do",
        "Add items to a list and remove them with a button.",
        20,
      ),
      task(
        "Refactor something small",
        "Improve yesterday’s code by simplifying variable names and splitting one function.",
        15,
      ),
    ],
  },
  {
    id: "writing",
    title: "Creative writing",
    category: "Creativity",
    emoji: "✎",
    tint: "#f7e5d9",
    description: "Find the voice that is yours.",
    minutes: 10,
    tasks: [
      task(
        "Write a six-sentence story",
        "Write a story with a beginning, a turn and an ending in exactly six sentences.",
        10,
      ),
      task(
        "Describe an ordinary moment",
        "Choose an everyday scene and describe it using all five senses.",
        10,
      ),
      task(
        "Write a letter to future you",
        "Write about three things you hope to learn in one year.",
        12,
      ),
      task(
        "Make a metaphor list",
        "Write 10 comparisons for the word “growth.” Choose your favorite.",
        10,
      ),
      task(
        "Revise with intention",
        "Rewrite a paragraph to make it clearer and 20% shorter.",
        12,
      ),
      task(
        "Find your first sentence",
        "Create five opening lines for a story you might love to write.",
        10,
      ),
    ],
  },
  {
    id: "design",
    title: "Visual design",
    category: "Creativity",
    emoji: "◈",
    tint: "#e6e4f7",
    description: "Turn good ideas into great visuals.",
    minutes: 15,
    tasks: [
      task(
        "Collect three great designs",
        "Save three interfaces you admire; identify one detail that makes each work.",
        15,
      ),
      task(
        "Explore a type scale",
        "Design a heading, subtitle and paragraph using a clear visual hierarchy.",
        15,
      ),
      task(
        "Make a two-color palette",
        "Pick two harmonious colors and use them on a simple card.",
        15,
      ),
      task(
        "Sketch one screen",
        "Draw a mobile landing screen on paper before touching a tool.",
        15,
      ),
      task(
        "Improve a button",
        "Design three button states: default, hover and disabled.",
        12,
      ),
      task(
        "Audit spacing",
        "Improve an existing screen using an 8px spacing rhythm.",
        15,
      ),
    ],
  },
  {
    id: "public-speaking",
    title: "Public speaking",
    category: "Communication",
    emoji: "◉",
    tint: "#f9ead8",
    description: "Speak with clarity and confidence.",
    minutes: 10,
    tasks: [
      task(
        "One minute, one idea",
        "Record a 60-second explanation of something you enjoy. Listen once and note one improvement.",
        10,
      ),
      task(
        "Practice an opening",
        "Write and deliver three different opening lines for a short talk.",
        10,
      ),
      task(
        "Slow down on purpose",
        "Read a page out loud with intentional pauses and steady breathing.",
        10,
      ),
      task(
        "Tell a short story",
        "Explain a lesson you learned using a situation, challenge and outcome.",
        12,
      ),
      task(
        "Make it simple",
        "Explain a complicated idea without using any technical jargon.",
        10,
      ),
      task(
        "Rewatch and improve",
        "Record the same 60-second talk and compare clarity with your first version.",
        10,
      ),
    ],
  },
  {
    id: "language",
    title: "Learn a language",
    category: "Communication",
    emoji: "文",
    tint: "#e3edf4",
    description: "A little practice opens a world.",
    minutes: 12,
    tasks: [
      task(
        "Learn ten everyday words",
        "Pick one language, learn ten common nouns and say each out loud.",
        12,
      ),
      task(
        "Introduce yourself",
        "Practice a short self-introduction with your name, interests and city.",
        12,
      ),
      task(
        "Practice listening",
        "Listen to five minutes of beginner audio and write down words you recognize.",
        12,
      ),
      task(
        "Build five questions",
        "Practice how to ask five questions you would use while traveling.",
        12,
      ),
      task(
        "Label your room",
        "Learn words for ten objects around you and point to each object.",
        12,
      ),
      task(
        "Write a mini diary",
        "Write four simple sentences about your day in your target language.",
        12,
      ),
    ],
  },
  {
    id: "finance",
    title: "Personal finance",
    category: "Life skills",
    emoji: "₹",
    tint: "#e1eddf",
    description: "Make money decisions intentionally.",
    minutes: 10,
    tasks: [
      task(
        "See where it goes",
        "List the last five things you spent money on and mark needs vs wants.",
        10,
      ),
      task(
        "Define a tiny saving goal",
        "Choose one specific amount to save this week and why it matters.",
        10,
      ),
      task(
        "Understand an emergency fund",
        "Read a basic explanation and estimate one month of essential expenses.",
        12,
      ),
      task(
        "Check subscriptions",
        "List recurring payments and identify anything unused.",
        10,
      ),
      task(
        "Practice unit prices",
        "Compare two products by price per gram or per unit.",
        10,
      ),
      task(
        "Draft a simple budget",
        "Allocate your next month’s spending across three or four categories.",
        15,
      ),
    ],
  },
  {
    id: "wellbeing",
    title: "Mindfulness",
    category: "Wellbeing",
    emoji: "☼",
    tint: "#efe6d8",
    description: "Create a moment of calm.",
    minutes: 5,
    tasks: [
      task(
        "A mindful five minutes",
        "Sit comfortably and gently return your attention to your breathing for five minutes.",
        5,
      ),
      task(
        "Notice without judging",
        "Take a quiet walk and note five things you can see or hear.",
        8,
      ),
      task(
        "Check in with yourself",
        "Write down how you feel and what you need, without trying to fix it.",
        6,
      ),
      task(
        "Make space for rest",
        "Take a screen-free break and consciously relax your shoulders.",
        6,
      ),
      task(
        "Practice gratitude",
        "Write down three small moments you appreciated today.",
        5,
      ),
      task(
        "Reset the room",
        "Slow down and spend eight minutes making your space calmer.",
        8,
      ),
    ],
  },
  {
    id: "fitness",
    title: "Everyday movement",
    category: "Wellbeing",
    emoji: "↗",
    tint: "#e7ecdc",
    description: "Move more, feel more alive.",
    minutes: 10,
    tasks: [
      task(
        "Go for a gentle walk",
        "Walk at a comfortable pace for at least 10 minutes.",
        10,
      ),
      task(
        "Try a mobility break",
        "Gently move your shoulders, hips and ankles for ten minutes.",
        10,
      ),
      task(
        "Find your favorite movement",
        "Try an accessible movement you enjoy at a comfortable intensity.",
        12,
      ),
      task(
        "Stretch between tasks",
        "Take a short standing and stretching break, avoiding painful ranges.",
        10,
      ),
      task(
        "Walk somewhere new",
        "Explore a different safe route and notice your surroundings.",
        12,
      ),
      task(
        "Build a repeatable ritual",
        "Choose a realistic time to move and write down your plan.",
        10,
      ),
    ],
  },
  {
    id: "reading",
    title: "Reading habit",
    category: "Life skills",
    emoji: "▤",
    tint: "#e9e2f1",
    description: "A few pages change perspective.",
    minutes: 10,
    tasks: [
      task(
        "Read with curiosity",
        "Read 8–10 pages of any book you genuinely enjoy.",
        10,
      ),
      task(
        "Remember one idea",
        "Read for ten minutes and write down one interesting thing.",
        10,
      ),
      task(
        "Try a new genre",
        "Read a short sample outside your usual favorites.",
        10,
      ),
      task(
        "Read without multitasking",
        "Put your phone away and read for an uninterrupted 12 minutes.",
        12,
      ),
      task(
        "Tell someone what you read",
        "Explain one idea from a book using your own words.",
        10,
      ),
      task(
        "Make a personal reading list",
        "Find three books you would enjoy; explain why you chose them.",
        10,
      ),
    ],
  },
  {
    id: "photography",
    title: "Photography",
    category: "Creativity",
    emoji: "◎",
    tint: "#e8edf2",
    description: "Notice beauty in ordinary things.",
    minutes: 15,
    tasks: [
      task(
        "Find the light",
        "Take five photos of one object in different lighting.",
        15,
      ),
      task(
        "Try the rule of thirds",
        "Take three photos using off-center composition.",
        15,
      ),
      task(
        "Photograph a color",
        "Capture six interesting things that share a color.",
        15,
      ),
      task(
        "Use a new angle",
        "Photograph one scene from below, above and at eye level.",
        15,
      ),
      task(
        "Tell a story in photos",
        "Capture three images with a clear beginning, middle and end.",
        15,
      ),
      task(
        "Edit with restraint",
        "Choose one photo and adjust light, contrast and crop gently.",
        15,
      ),
    ],
  },
  {
    id: "music",
    title: "Music practice",
    category: "Creativity",
    emoji: "♫",
    tint: "#f5e5e2",
    description: "Make room for sound.",
    minutes: 12,
    tasks: [
      task(
        "Start with rhythm",
        "Clap or tap along to a simple rhythm and keep steady time.",
        12,
      ),
      task(
        "Practice one short phrase",
        "Sing or play a short musical phrase slowly and repeat it.",
        12,
      ),
      task(
        "Listen actively",
        "Listen to a favorite track and identify its instruments.",
        12,
      ),
      task(
        "Learn something small",
        "Practice four bars of a song or a basic chord progression.",
        15,
      ),
      task(
        "Record your practice",
        "Record a short attempt; listen for one thing to improve.",
        12,
      ),
      task(
        "Play for enjoyment",
        "Make music without judging the result for fifteen minutes.",
        15,
      ),
    ],
  },
  {
    id: "cooking",
    title: "Cooking basics",
    category: "Life skills",
    emoji: "✳",
    tint: "#f3eadf",
    description: "Learn one useful thing at a time.",
    minutes: 15,
    tasks: [
      task(
        "Plan a balanced plate",
        "Plan a simple meal with produce, protein and a satisfying carbohydrate.",
        15,
      ),
      task(
        "Practice safe prep",
        "Learn proper handwashing, kitchen cleanliness and safe knife basics.",
        15,
      ),
      task(
        "Learn one new recipe",
        "Choose a beginner-friendly meal and read every step before cooking.",
        15,
      ),
      task(
        "Make a snack thoughtfully",
        "Prepare a simple snack using ingredients you already have.",
        15,
      ),
      task(
        "Learn ingredient storage",
        "Check best practices for keeping three common ingredients fresh.",
        15,
      ),
      task(
        "Write your signature recipe",
        "Record the ingredients and steps for a dish you can make again.",
        15,
      ),
    ],
  },
];

export const HOBBY_CATALOG = [
  {
    id: "journaling",
    title: "Journaling",
    icon: "✎",
    color: "#ece7fa",
    descriptor: "Make sense of the small things",
  },
  {
    id: "drawing",
    title: "Sketching",
    icon: "✳",
    color: "#f9e6dc",
    descriptor: "Create without expectations",
  },
  {
    id: "gardening",
    title: "Gardening",
    icon: "❀",
    color: "#e1f0df",
    descriptor: "Grow something slowly",
  },
  {
    id: "walking",
    title: "Nature walks",
    icon: "↗",
    color: "#edf0d7",
    descriptor: "Find a different rhythm",
  },
  {
    id: "reading-hobby",
    title: "Reading for fun",
    icon: "▤",
    color: "#e6eafa",
    descriptor: "Get lost in a good story",
  },
  {
    id: "photography-hobby",
    title: "Photography",
    icon: "◎",
    color: "#e8f0f1",
    descriptor: "Notice what others miss",
  },
  {
    id: "music-hobby",
    title: "Playing music",
    icon: "♫",
    color: "#f6e4ea",
    descriptor: "Follow your own beat",
  },
  {
    id: "crafts",
    title: "Making things",
    icon: "✂",
    color: "#f4ead9",
    descriptor: "Work with your hands",
  },
];
