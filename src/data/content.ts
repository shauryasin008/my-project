/**
 * Default content for the entire experience.
 * Edits made in the admin panel are stored in localStorage and
 * override these defaults at runtime.
 */

export type Note = {
  id: string;
  // 'note' = a written card
  // 'memory' = a memory card with a photo
  // 'song' = a song / lyrics card
  // 'letter' = a long letter
  // 'time-capsule' = a number / date card
  // 'tiny' = a tiny floating one-liner
  type: "note" | "memory" | "song" | "letter" | "time-capsule" | "tiny";
  title?: string;
  body: string;
  /** For memory type only: a photo path under /images or external URL. */
  photo?: string;
  /** For memory type only: edit each photo's pixel box and fitting here. */
  photoAdjustment?: {
    width: number;
    height: number;
    fit: "cover" | "contain";
  };
  /** Optional metadata. */
  date?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  reaction: string;
};

export const site = {
  appName: "Our Little World",
  herName: "my favourite women",
  yourName: "your favourite disaster",
  tagline: "scroll slow. every page is a little love letter.",
  anniversaryDate: "23 September 2026",
  headerEmoji: "🐻💗🐻",
};

export const passwordGate = {
  intro: "before you enter, I need to make sure it's really you.",
  question: "what do I call you the most?",
  placeholder: "type the secret word...",
  cta: "open my heart ✨",
  failTitle: "hmm… that's not it 😭",
  failSubtitle: "try again 💕",
  accepted: ["bubu", "Bubu", "mumma", "Mumma"]
};

export const notes: Note[] = [
  {
    id: "n1",
    type: "tiny",
    body: "you opened it. I'm already smiling like an idiot.",
  },
  {
    id: "n2",
    type: "note",
    title: "okay so",
    body: "I have been trying to write this for weeks. I keep deleting it. I keep starting. nothing sounds right. you make me feel things that don't have a language yet. so here's me, trying anyway.",
  },
  {
    id: "n3",
    type: "memory",
    title: "Ham to aise photo dekh ke gir he jate",
    body: "Pyari lag rahi ho bhut katai ham gir ka pade bas iska thoda khayal rakha kro.",
    photo: "/images/Screenshot 2026-09-21 213745.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "Ufff lekin bach gaye",
  },
  {
    id: "n4",
    type: "tiny",
    body: "you're my favourite hello and my hardest BYE.",
  },
  {
    id: "n5",
    type: "letter",
    title: "a letter I almost didn't send",
    body: "I don't know how you do it. I come home tired, I come home sad, I come home every kind of broken — and somehow you hand me a glass of water and the world is okay again. I don't tell you this enough. you are the gravity I didn't know I was missing. before you, days just passed. with you, days mean something. you turned my calendar into a story. and I never want the story to end. if I'm honest, I'm a little scared of how much I need you. but I think that's what love is — being a little terrified of how much someone matters. so here I am. terrified. yours. always yours.",
  },
  {
    id: "n6",
    type: "song",
    title: "a song that sounds like you",
    body: "🎵 \"I found a love for me\ndarling just dive right in\nand follow my lead\nwell I found a girl, beautiful and sweet\nI never knew you were the someone waiting for me\" 🎵\n\n— Ed Sheeran, Thinking Out Loud\n\n(this is the one. forever the one.)",
  },
  {
    id: "n7",
    type: "memory",
    title: "Gandi bubu hamesha roti rhte hoo",
    body: "Sorry bubu hamesha rula deta hu tumko lekin sahi be pyar bhe utna he krta hu mai. But i am trying my best to make you happy.",
    photo: "/images/Screenshot 2026-09-21 213915.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "Rulata bhe to mai he hu :(",
  },
  {
    id: "n8",
    type: "tiny",
    body: "I love you in ways I haven't even invented words for yet.",
  },
  {
    id: "n9",
    type: "note",
    title: "the truth",
    body: "I'm not good with words. but I'm good with you. and I think that has to count for something.",
  },
  {
    id: "n10",
    type: "time-capsule",
    title: "tiny facts about us",
    body: "• days together: too many to count, never enough\n• inside jokes invented: classified\n• times I've said I love you and meant it more than the last time: every single time\n• fights we've had: a handful\n• fights I've regretted: every one\n• the way you say my name: reason #1 I keep going",
  },
  {
    id: "n11",
    type: "memory",
    title: "the day you held my hand and didn't let go",
    body: "we were just sitting. nothing special. except it was. it was everything. and you just… held on. like you were saying, I'm not letting this go.",
    photo: "/images/Screenshot 2026-09-21 214109.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "[a small happening, a huge moment]",
  },
  {
    id: "n12",
    type: "tiny",
    body: "you are my favourite place to go when my mind needs peace.",
  },
  {
    id: "n13",
    type: "letter",
    title: "what I want to say at 3am",
    body: "I know I don't always say the right thing. I know I shut down sometimes. I know I'm bad at replying when I should reply. but please know — every night, the last thought I have before I sleep is some version of you. sometimes it's your laugh. sometimes it's the way you tilt your head when you're confused. sometimes it's just \"I hope she's okay.\" you're the last line of every page of my day. and if I'm being honest, you're the first line too.",
  },
  {
    id: "n14",
    type: "note",
    title: "a confession",
    body: "I still get nervous around you. after all this time. is that stupid? maybe. but you still take my breath away in the smallest ways. the way you hum when you cook. the way you tuck your hair behind your ear. the way you look at me like I'm someone worth looking at. I don't know how I tricked you into this, but I'm never giving you a reason to leave.",
  },
  {
    id: "n15",
    type: "song",
    title: "another one. because you deserve two.",
    body: "🎵 \"I love you always forever\nnear and far, closer together\neverywhere I will be with you\neverything I will do for you\" 🎵\n\n— Donna Lewis, I Love You Always Forever",
  },
  {
    id: "n16",
    type: "tiny",
    body: "if I had to choose again, a thousand times, a million times — still you.",
  },
  {
    id: "n17",
    type: "memory",
    title: "Best Recharge of the Day",
    body: "no one around us just you and me and the world feels perfect. I love you lugai ji.",
    photo: "/images/Screenshot 2026-09-21 213935.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "[an unforgettable day, a tiny moment, a giant feeling]",
  },
  {
    id: "n18",
    type: "note",
    title: "things I never said out loud",
    body: "you make me want to be a better person. not the polished, instagram kind. the real kind. the kind that calls their mother. the kind that saves money. the kind that says sorry first. you make me want to grow up just enough to deserve you, and stay soft enough to still be the person you fell in love with.",
  },
  {
    id: "n19",
    type: "memory",
    title: "BAD day for me chasma but one of the best day for us.",
    body: "Tuu hove Maii hovaaa dunia te duurr hoiyeaa otthe na hoyeee or koiii. Aanand Aanand",
    photo: "/images/Screenshot 2026-09-21 214028.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "[a small gift, a giant feeling]",
  },
  {
    id: "n20",
    type: "tiny",
    body: "I love you more than coffee. and you know that's serious.",
  },
  {
    id: "n21",
    type: "letter",
    title: "if I forget to say it, please read this",
    body: "I'm not perfect. I'll forget anniversaries sometimes. I'll say the wrong thing. I'll come home and not want to talk. I'll do the dishes wrong, leave the lights on, lose my keys, and somehow always find a way to be difficult when you're trying to love me. but I need you to know — every single day I'm trying. and every single day, you are the first person I want to see and the last person I want to lose. you are not a habit. you are not a backup plan. you are the plan. you have always been the plan.",
  },
  {
    id: "n22",
    type: "memory",
    title: "My Cutieeeeeeeeeeeee",
    body: "Hamare khushi ka thekana nahi the isko dekhne ke bad ham to bas hawa me he udd rahe hai aisa orr photo bhej dainge dar hai kahi space me na chala jou udte udte",
    photo: "/images/Screenshot 2026-09-21 214055.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "[katai fugunia lag rahi ho ji]",
  },
  {
    id: "n23",
    type: "tiny",
    body: "you're the plot twist I never saw coming and now can't imagine the story without.",
  },
  {
  id: "n24",
  type: "note",
  title: "the list I keep in my head",
  body: "things I love about you (incomplete, in no order):\n1. the way you text me when you miss me\n2. the way your messages always make my day better\n3. how you always make time to talk to me\n4. the way you defend me when other people are mean to me\n5. your voice on our calls\n6. the way you say \"hmm\" when you're thinking\n7. the little things you remember about me\n8. the fact that you're still here reading this\n9. everything else"
},
    id: "n25",
    type: "tiny",
    body: "loving you is the easiest thing I've ever done.",
  },
  {
    id: "n26",
    type: "memory",
    title: "Habibiiii yaad hai na ye photo",
    body: "Madam ji ye wahi photo hai kisko dekh ke hamne thaan ke liya tha girlfriend aise he chiyea or aap to ban bhe gyi hehehe lekin sahi me ye photo koi na jindgi me kuch bhe replace nahi kr sakta.",
    photo: "/images/Screenshot 2026-09-21 214216.png",
    photoAdjustment: { width: 690, height: 650, fit: "contain" },
    date: "[Cant be replaced with anything this is OG]",
  },
  {
    id: "n27",
    type: "note",
    title: "for the future us",
    body: "I don't know where we'll be in five years. I don't know if we'll be in the same city, the same house, the same timezone. but I know that if you're there, I want to be there too. and I think that's enough. I think that's everything.",
  },
  {
    id: "n28",
    type: "tiny",
    body: "you are the best thing that has ever happened to me. and I am not even a little bit exaggerating.",
  },
  {
    id: "n29",
    type: "letter",
    title: "the last one. the most honest one.",
    body: "I'm not good at goodbyes. I'm not good at grand gestures. I'm not good at any of this. but I am good at loving you. I am good at showing up. I am good at trying. and I promise you — for every hard day, for every fight, for every quiet night when we don't know what to say, I will choose you. again and again and again. I will choose you on the easy days. I will choose you on the impossible days. I will choose you when you're kind and when you're difficult and when you're tired and when you're the most beautiful version of yourself and when you feel like you're the least. I will keep choosing you. not because I have to. because I get to. and that is the greatest gift you have ever given me.",
  },
];

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "what do I call you the most?",
    options: ["Bubu", "Madam ji", "Hello ma'am"],
    correct: 0,
    reaction: "obvious. you should know this by now 😤💗",
  },
  {
    id: "q2",
    question: "what did we first bond over?",
    options: ["a song", "a block", "a fight"],
    correct: 1,
    reaction: "suruat me hamko kitna tadpaya tha wo to ham he jaante hai madam.",
  },
  {
    id: "q3",
    question: "if I had to pick one word for you, it would be…",
    options: ["home", "loud", "mystery"],
    correct: 0,
    reaction: "home. you. you ARE home. 😭",
  },
  {
    id: "q4",
    question: "what is my favourite thing you do without trying?",
    options: ["the head tilt", "the laugh", "the hair tuck"],
    correct: 1,
    reaction: "the snort. every time. ICONIC. 😭💗",
  },
  {
    id: "q5",
    question: "if we could teleport anywhere right now, where would we go?",
    options: ["a tiny cafe in paris", "a quiet beach in goa", "our bed, with food"],
    correct: 2,
    reaction: "correct. forever correct. why would I want the world when I have you + snacks. 💗",
  },
];

export const finalNote = {
  date: "23 September 2026",
  headline: "happy anniversary, my love.",
  body: [
    "we made it.",
    "another year of you and me. another year of choosing each other. another year of the same laugh, the same fight, the same forgiveness, the same hand in mine.",
    "I know I'm not the easiest person. I know I forget things. I know I get inside my own head too much. but you love me anyway. and I want you to know — I see it. every time. and I am grateful in ways I don't have the words for yet.",
    "so here's to us. the messy, soft, ridiculous, beautiful us.",
    "I'd choose you in every lifetime. in every universe. in every version of every story.",
    "thank you for being mine.",
    "— yours, always. 🐻💗",
  ],
  finalSurprisePrompt: "psst… one last thing 👀",
  finalSurprise: "I love you. I love you. I love you.\n\nI will probably never get tired of saying it.\n\ngo to sleep, my favourite person.\nI'll be here when you wake up.\n\n🐻💗",
};

export const admin = {
  username: "shaurya",
  password: "shaurya@123",
};
