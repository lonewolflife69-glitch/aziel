/**
 * ===================================================================
 * PAUL & RYAN - ANNIVERSARY WEBSITE CONFIGURATION
 * ===================================================================
 * Ryan, you can easily edit any text, photos, memory cards, quiz items,
 * songs, or love letter content right here!
 * ===================================================================
 */

window.PAUL_CONFIG = {
  // Names & Signatures
  boyfriendName: "Paul",
  partnerName: "Merlin",
  partnerSignature: "Merlin",

  // Introductory & Hero Messages
  introText: {
    greeting: "Paul...",
    subtext: "I made a little world for you.",
    takeTime: "Take your time. ♡",
    button: "BEGIN ♡"
  },

  frameRevealText: {
    line1: "For the boy who deserves the world...",
    line2: "...and blooming roses just for him.",
    line3: "Paul, if I could give you one thing today, it would be the ability to see yourself through my eyes."
  },

  heroText: {
    title: "Happy Anniversary, Paul ♡",
    line1: "I could have just sent you a message.",
    line2: "But you deserve something that took a little more of my heart.",
    line3: "So I made this for you."
  },

  // Romantic Quotes Scattered Throughout
  romanticQuotes: [
    "Somewhere along the way, you became my favorite part of my days.",
    "You make ordinary moments feel like memories I want to keep forever.",
    "I hope you know how handsome and amazing you are, especially when you don't realize it.",
    "If I could keep one feeling forever, it would be the feeling of being around you.",
    "Of all the little things life could have given me, I'm most grateful it gave me you.",
    "Sometimes I look at you and still wonder how I got this lucky.",
    "I don't just love the big moments with you. I love the tiny ones I'll probably remember forever."
  ],

  // Selective Quiet Photo Appreciation Messages
  photoAppreciations: [
    {
      photo: "assets/images/paul_1.jpg",
      quote: "Can we just take a second to appreciate you? Yeah... you're really handsome."
    },
    {
      photo: "assets/images/paul_2.jpg",
      quote: "Look at you. How did I get this lucky?"
    }
  ],

  // ===================================================================
  // OUR STORY — "JUST US." (MEMORY BOX EXPERIENCE)
  // ===================================================================
  justUsConfig: {
    title: "Just Us.",
    subtitle: "Some memories don't need a reason to be special.",
    
    // Scattered memories with varied presentations
    memories: [
      {
        type: "text-first",
        quote: "Some of my favorite memories with you are the ones that probably seemed completely ordinary at the time.",
        photo: "assets/images/paul_story1.jpg",
        caption: "A random quiet afternoon with you ♡"
      },
      {
        type: "interactive-card",
        cardTitle: "Tap to unwrap a secret memory 🎁",
        photo: "assets/images/paul_story2.jpg",
        caption: "Okay, we don't talk about this one 😂",
        badge: "Inside Joke"
      },
      {
        type: "photo-first",
        photo: "assets/images/paul_story3.jpg",
        quote: "I don't think you realize how many tiny moments with you I've kept locked in my head.",
        caption: "You probably forgot this happened. I didn't."
      },
      {
        type: "fullscreen-pause",
        photo: "assets/images/paul_story4.jpg",
        line1: "I'd go back to this moment for a minute if I could.",
        line2: "Not because it was perfect...",
        line3: "...but because it was ours."
      },
      {
        type: "interactive-card",
        cardTitle: "Tap for another favorite memory ✨",
        photo: "assets/images/paul_polaroid1.jpg",
        caption: "Still one of my absolute favorite days.",
        badge: "Unforgettable"
      },
      {
        type: "text-first",
        quote: "Sometimes I randomly remember something we did and catch myself smiling like an idiot.",
        photo: "assets/images/paul_polaroid2.jpg",
        caption: "Us being completely us."
      },
      {
        type: "interactive-card",
        cardTitle: "Tap to reveal a silly moment 😜",
        photo: "assets/images/paul_polaroid3.jpg",
        caption: "This one will always make me laugh!",
        badge: "Silly Moments"
      },
      {
        type: "photo-first",
        photo: "assets/images/paul_polaroid4.jpg",
        quote: "You've somehow turned so many ordinary moments into things I'll always want to remember.",
        caption: "Moments that made me smile."
      }
    ],

    // Finale Sequence of "Just Us."
    endingQuotes: {
      line1: "Looking at all these little pieces of us...",
      line2: "I think that's what I love most.",
      line3: "Not one perfect moment.",
      line4: "Just all these little moments that became ours.",
      finalTag: "Just us. ♡"
    }
  },

  // Floating Polaroid Gallery Photos
  polaroids: [
    {
      photo: "assets/images/paul_polaroid1.jpg",
      caption: "my handsome boy ♡",
      rotation: -3
    },
    {
      photo: "assets/images/paul_polaroid2.jpg",
      caption: "this smile.",
      rotation: 4
    },
    {
      photo: "assets/images/paul_polaroid3.jpg",
      caption: "still not over this photo.",
      rotation: -2
    },
    {
      photo: "assets/images/paul_polaroid4.jpg",
      caption: "one of my favorites.",
      rotation: 3
    },
    {
      photo: "assets/images/paul_polaroid5.jpg",
      caption: "how are you even real?",
      rotation: -4
    },
    {
      photo: "assets/images/paul_polaroid6.jpg",
      caption: "one picture, a thousand memories.",
      rotation: 2
    }
  ],

  // "Things I Don't Say Enough" Interactive Reasons
  reasons: [
    "I love the way you laugh — it instantly brightens my worst days.",
    "You make ordinary days feel so special just by being in them.",
    "I love how even a small conversation with you can completely turn my mood around.",
    "I hope you know how deeply, genuinely appreciated you are every single day.",
    "If I had to choose my favorite person in the entire universe again, I'd still find you.",
    "I love your kindness, your strong heart, and the warmth you give to everyone around you.",
    "I love the silly faces you make and how we can be completely unfiltered together.",
    "I love how safe and peaceful I feel whenever I hold your hand.",
    "Honestly, I could write a thousand reasons and still feel like I forgot something."
  ],

  // "How Well Do You Know Us?" Relationship Quiz
  quiz: [
    {
      question: "What is Paul's absolute favorite flower in the world?",
      options: ["Lilies", "Red Roses", "Sunflowers", "Tulips"],
      correctIndex: 1,
      correctMsg: "Correct! Roses are your favorite, blooming just for you! 🌹✨",
      wrongMsg: "Hmm... try again! Hint: Look at the blooming red flowers on screen! 🌿"
    },
    {
      question: "Who is the luckiest person on planet Earth to have Paul?",
      options: ["Ryan", "Definitely Ryan", "100% Ryan", "All of the above"],
      correctIndex: 3,
      correctMsg: "100% true! Ryan is the luckiest person alive to have you! ❤️",
      wrongMsg: "Oops! There's only one right answer: Ryan is insanely lucky! 😉"
    },
    {
      question: "What makes an ordinary day feel like an extraordinary memory?",
      options: ["Winning the lottery", "Eating pizza", "Spending it with Paul", "A rainy afternoon"],
      correctIndex: 2,
      correctMsg: "Spot on! Any moment with you is an extraordinary memory! 🥰",
      wrongMsg: "Close... but being with you beats everything else! 💖"
    }
  ],

  // "Our Soundtrack" Songs
  soundtrack: [
    {
      title: "Golden Hour",
      artist: "JVKE",
      description: "Because that's what it feels like whenever light hits your eyes.",
      audioUrl: "assets/music/song2.mp3"
    },
    {
      title: "Until I Found You",
      artist: "Stephen Sanchez",
      description: "Because my world was completely different before you walked into it.",
      audioUrl: "assets/music/song3.mp3"
    },
    {
      title: "Lover",
      artist: "Taylor Swift",
      description: "Because every line reminds me of building a quiet, beautiful life with you.",
      audioUrl: "assets/music/song1.mp3"
    }
  ],

  // Interactive Love Letter
  loveLetter: {
    heading: "There's something I wanted to tell you...",
    salutation: "My Dearest Paul,",
    bodyParagraphs: [
      "I wanted to take a moment today to put into words a fraction of what you mean to me. Sometimes life moves so fast that we forget to slow down and truly express the gratitude in our hearts.",
      "From the moment you came into my life, everything became warmer, brighter, and stronger. You have this rare magic about you — the way you smile, the way you care so deeply, and the effortless way you make everywhere feel like home.",
      "I love all the little things: our inside jokes, the quiet moments when we don't even need to speak, the shared glances, and the sound of your laugh. You've taught me what true gentleness and strength feel like.",
      "Thank you for being my favorite person, my safe space, my best friend, and my boyfriend. I wouldn't trade a single second we've shared for anything in the world.",
      "I choose you today, tomorrow, and every single day that follows. Here's to us, to our memories, and to all the beautiful chapters we haven't even written yet."
    ],
    closing: "Always yours,",
    signature: "Ryan"
  },

  // Final Cinematic Surprise
  finale: {
    preText1: "Okay...",
    preText2: "One last thing.",
    name: "Paul ♡",
    choiceQuote: "If I had to choose one person to keep making memories with...\nI'd choose you. Again. Every time.",
    finalPhoto: "assets/images/paul_final.jpg",
    dayGreeting: "Happy Anniversary, Paul.",
    thankYou: "Thank you for being you.",
    always: "Always.",
    signature: "— RYAN"
  }
};
