import { StoryChapter, HelplineResource } from '../types/story';

export const STORY_METADATA = {
  title: "STILL STANDING",
  subtitle: "A Story of Rejection, Loneliness, and Refusing to Disappear",
  dedication: [
    "For everyone who kept applying after the world stopped replying.",
    "For the ones who were told they were behind, while they were secretly fighting just to survive."
  ],
  authorsNote: `This is not a manual on how to conquer an industry overnight, nor is it a polished collection of corporate success formulas. It is an account of what happens in the silent, suffocating chasm between desperate effort and an answer that never comes. It is about the dreams that were taken away before they could breathe, the hundreds of applications that disappear into automated algorithms, the humiliating phone calls home to ask for basic rent, the physical toll of insomnia, the relentless headaches, and the bewildering ache of watching friends leave you behind in the dust.

To preserve privacy and protect personal boundaries, names, identifying features, and specific locations have been altered. But the wounds, the tears shed onto keyboard keys in the middle of the night, and the stubborn refusal to stop breathing are entirely real.`
};

export const CHAPTERS: StoryChapter[] = [
  {
    id: "prologue",
    number: "Prologue",
    title: "The Appraisal",
    subtitle: "Four casual words that measure a lifetime of sacrifice",
    pullQuote: "“Did you get placed?” To anyone on the outside, it is small talk. But for a graduate in a rented room, it strikes like a cold, unsparing audit.",
    paragraphs: [
      "There is a question that sounds completely harmless until you are the one forced to stand under its weight. It consists of four casual words, usually tossed across a dining table or asked in passing at a family gathering:",
      "“Did you get placed?”",
      "To anyone on the outside, it is small talk—idle curiosity forgotten ten seconds later. But for a young graduate sitting in the quiet corner of a rented room in Hyderabad, those words do not land like an inquiry. They strike like a cold, unsparing audit. They measure four years of sacrificed sleep, family tuition money, late-night code debugging, and the heavy expectations of parents who spent their lives believing that an engineering degree was an unbreakable shield against poverty and obscurity.",
      "He had entered university believing that if he worked hard enough, life would eventually meet him halfway. Throughout his school years, the marks had been there: ninety-five percent in SSC, nearly ninety-three in junior college. He chose Computer Science and genuinely fell in love with data—the quiet poetry hidden beneath messy rows of numbers, turning raw records into clean charts, translating patterns into business insights. He graduated with a 7.46 CGPA, a completed corporate internship under his belt, and a portfolio filled with analytics projects.",
      "Yet the real world outside the classroom proved entirely indifferent to how hard he had tried."
    ],
    image: {
      src: "/images/hero_window.jpg",
      alt: "Rain-streaked window in a dark Hyderabad room with amber city reflections and a glowing laptop",
      caption: "3:00 AM in Hyderabad. The silence between desperate effort and an answer that never comes."
    },
    readTime: "2 min read"
  },
  {
    id: "part-1",
    number: "Part I",
    title: "The Buried Playground: Dreams That Weren't Mine",
    subtitle: "The systematic murder of childhood under the banner of academic duty",
    pullQuote: "The deepest tragedy was that he gave up the only things he truly loved to become the studious son they wanted—only to find that academics never loved him back.",
    paragraphs: [
      "Before the job rejections, before the broken heart, and before the cold isolation of that rented room, there was an older theft that nobody ever acknowledged: the systematic murder of his childhood.",
      "When people talk about childhood dreams, they imagine a boy looking up at the sky, deciding who he wants to be. But in his world, dreams were never born from his own chest. They were drafted, negotiated, and decreed by his parents long before his voice had even deepened. To be raised by government teachers meant that life had only one permissible track, one currency, and one definition of human worth: textbooks, marks, and examinations.",
      "Yet inside him, there had once lived an entirely different boy—one full of natural energy, instinct, and raw talent. Out on the open ground, he was completely alive. When a cricket bat was in his hands, he understood timing, angles, and power without needing a manual. When he held a basketball, his footwork was sharp, his reflexes were quick, and his body moved with effortless freedom. On the court and on the pitch, he wasn't the hesitant student struggling to memorize lines; he was confident, capable, and genuinely happy.",
      "In his house, however, those talents were treated like dangerous distractions. The bat was taken away. The ball was locked out of reach. The court was declared enemy territory that wasted precious hours. Every single day was accompanied by the same relentless, grinding lecture: “Sports will give you nothing. Play won’t build your life. Study. Just study. If you don’t read, you will amount to nothing.”",
      "He was dragged away from the sun, locked inside a room, and forced to stare at printed pages that felt completely foreign to his spirit. Every evening echoed with the same unyielding demand: Study, study, study.",
      "The deepest tragedy was that he gave up the only things he truly loved to become the studious son they wanted—only to find that academics never loved him back. He was an average student who had to break his back for every single percentage point. He poured his sweat and sleepless nights into books, only for the exam papers to return with numbers that never matched the effort.",
      "The hardest part was never anger. Shouting could be answered with defiance. What quietly gutted him from the inside was the silent, aching sorrow on his parents' faces—the heavy sigh of teacher-parents looking at their own child, wondering why he struggled with what they taught effortlessly to strangers every day. That quiet disappointment settled into his bones early, tattooing a cruel verdict across his heart: no matter how much you bleed, it will never be enough."
    ],
    image: {
      src: "/images/playground_lost.jpg",
      alt: "Abandoned cricket bat and basketball near a fence at sunset while a boy walks away with a school bag",
      caption: "The playground left behind. Dragged away from the sun into a room of unloving textbooks."
    },
    readTime: "3 min read"
  },
  {
    id: "part-2",
    number: "Part II",
    title: "The Sunlight and the Fracture",
    subtitle: "A brief season of college warmth, followed by unspoken heartbreak",
    pullQuote: "The warmth of college suddenly had a bitter edge to it, reminding him of a recurring pattern: The things you want the most are the very things that will slip through your fingers.",
    paragraphs: [
      "When he entered his undergraduate engineering program, it seemed as though the universe had finally granted a temporary reprieve.",
      "For the first time, life felt bright and expansive. He was surrounded by friends who made the hours fly by. College canteens, shared plates of food, teasing over back-bench lectures, and loud laughter in campus corridors transformed him into one of the happiest, most vibrant people around. He genuinely believed that the heavy shadows of his school years had been outrun.",
      "In that burst of confidence, his heart opened completely. He fell in love with a classmate with an intensity that caught him off guard. It was an unspoken, one-sided devotion that quietly reshaped his daily routine—looking forward to seeing her, finding excuses to sit nearby, and believing that perhaps life had saved its kindest chapter for him.",
      "When he finally gathered the courage to confess his feelings and propose, the world stopped for a second, then snapped back with brutal finality. The rejection was polite, distant, and total. She walked away, leaving an ache in his chest that refused to heal. The warmth of college suddenly had a bitter edge to it, reminding him of a recurring pattern: The things you want the most are the very things that will slip through your fingers.",
      "He swallowed the grief, pulled his hood up, and buried himself in technical preparation for the final year."
    ],
    image: {
      src: "/images/college_canteen.jpg",
      alt: "College students sharing chai and snacks in a warm sunlit campus canteen",
      caption: "Canteen laughter and shared cutting chai. A brief golden reprieve before the cold fracture."
    },
    readTime: "2 min read"
  },
  {
    id: "part-3",
    number: "Part III",
    title: "The Race and the Cut",
    subtitle: "Mentoring peers across the finish line while watching the final doors slam shut",
    pullQuote: "Watching people who put in a fraction of the work walk away with secure futures, while his own sweat, preparation, and sleepless effort were repeatedly discarded, broke something deep within his understanding of fairness.",
    paragraphs: [
      "Placement season arrived with the tension of an elimination tournament.",
      "He didn't take shortcuts. He refined his resumes, built dashboards, practiced SQL queries, and solved algorithmic problems while the campus slept. Beside him were peers and friends who treated the process casually—skipping mock tests, passing time, and treating preparation like a game of chance. He didn't mock them; instead, he sat beside them for hours, explaining concepts, troubleshooting their code errors, and walking them through technical interview questions.",
      "Then came the cruelty of luck.",
      "Those very peers—the ones who had barely studied, who laughed off preparation and coasted on pure chance—walked into interview halls, received straightforward questions, and emerged with appointment letters. Meanwhile, he was tested relentlessly, clearing aptitude tests and technical panels, only to be turned away at the final round. Over and over again, the pattern repeated: make it to the last table, see the light, and watch the door slam shut.",
      "Watching people who put in a fraction of the work walk away with secure futures, while his own sweat, preparation, and sleepless effort were repeatedly discarded, broke something deep within his understanding of fairness. It felt as though misfortune had been written into his personal ledger."
    ],
    readTime: "2 min read"
  },
  {
    id: "part-4",
    number: "Part IV",
    title: "The Room and the Ceiling",
    subtitle: "Four bare walls, 500+ unread applications, and 3 AM weeping",
    pullQuote: "The worst part was never the automated rejection email; it was the deafening lack of any human response at all. Over five hundred times, a fragment of his hope dissolved into nothingness.",
    paragraphs: [
      "Graduation arrived, not as a celebration, but as an eviction from ordinary life.",
      "The friends he had cheered on and helped across the finish line packed their bags and relocated to corporate hubs. Their messaging groups went quiet; status updates shifted to corporate badges, team dinners, and welcome kits. The calls dried up into sporadic, polite pleasantries. He was left behind in a rented room in Hyderabad, facing four bare walls and an unrelenting silence.",
      "The search became an endurance test of the spirit. He woke up, opened his laptop, browsed job portals, tailored resumes to pass applicant tracking systems, submitted applications, and waited. Fifty turned into one hundred. One hundred passed three hundred. Eventually, the count crossed five hundred applications.",
      "The worst part was never the automated rejection email; it was the deafening lack of any human response at all. Over five hundred times, a fragment of his hope was submitted into an online form, and over five hundred times, it dissolved into nothingness.",
      "Soon, the battle migrated from his laptop directly into his nervous system. Sleep turned into an ordeal. Every time his head hit the pillow, the absolute stillness of the room amplified the pounding in his chest. His heart would race against his ribs as an unanswerable loop ran through his mind: Why was I the only one left behind? What did I do wrong? How will I face tomorrow?",
      "By two or three in the morning, the tension would shatter his composure, and the weeping would begin—silent, breathless tears pressed into a thin pillow so nobody beyond the wall would ever know how broken he felt.",
      "The insomnia extracted a steep physical toll. He skipped meals simply because food tasted like dust. His skin paled, deep dark hollows settled beneath his eyes, and a chronic, heavy exhaustion wrapped around his temples.",
      "Beneath the physical breakdown lay a suffocating guilt: money. At twenty-two years of age, holding an engineering degree, every rupee spent on rent, groceries, or drinking water felt like theft. Having to dial his parents’ number, hear the tired voices of two lifelong teachers, and ask for monthly expenses made his throat tighten with shame. The financial dependency was a lead weight on his chest.",
      "Then came the inquiries from relatives and neighbors—veiled interrogations disguised as family concern: “You’re twenty-two now. Still in that room? Both your parents are teachers. Everyone else has started earning. What happened to your placement?” Every question felt like an open strike against his dignity."
    ],
    image: {
      src: "/images/room_insomnia.jpg",
      alt: "Despairing graduate sitting on edge of thin bed in dark room holding head in hands with open laptop",
      caption: "Facing four bare walls in Hyderabad. When sleep turns into an ordeal of pounding ribs."
    },
    stat: {
      value: "500+",
      label: "Applications Sent",
      description: "Submitted into cold ATS algorithms with zero human replies."
    },
    readTime: "3 min read"
  },
  {
    id: "part-5",
    number: "Part V",
    title: "The Currency of Shame and the Road Not Taken",
    subtitle: "The burning guilt of chalk-dust money, and yearning for the open highway",
    pullQuote: "He wanted to walk through the front door of his home, hand his father an envelope with his first month’s salary, and say: “You don’t have to worry anymore. It’s my turn to take care of you.”",
    paragraphs: [
      "There is no humiliation quite like the guilt of a son who desperately loves his parents but believes he has brought them nothing but disgrace.",
      "He didn't want a crown. He didn't want applause from strangers. The core of his ambition had always been painfully humble: he wanted to walk through the front door of his home, hand his father an envelope with his first month’s salary, look into his mother’s tired eyes, and say, “You don’t have to worry anymore. It’s my turn to take care of you.” He wanted to give them the dignity of seeing their sacrifices validated—to let them stand before their colleagues and relatives with their heads held high, proud of the boy they had raised.",
      "Instead, the reality was a daily, knife-like humiliation. He was a grown engineering graduate, yet he was still surviving on their bank transfers. Every single rupee that hit his account felt like an indictment. When he bought a plate of food or paid for the room's rent, the food tasted like ash because he knew where that money had come from—from decades of his parents standing in government classrooms, chalk dust on their hands, sweating through long careers to build a future for him. Looking in the mirror, the word that screamed back at him was failure. A bad son. A burden that refused to lift. The realization that at twenty-two he was still taking rather than giving broke something in his chest, making him weep until his ribs ached in the dead of the night.",
      "Alongside that guilt lay the quiet graveyard of his own small, honest dreams.",
      "He didn't ask for luxury cars or lavish apartments. He had imagined something simple and human: to earn his own money, save up, buy a motorcycle of his own, feel the hum of the engine beneath him, and just ride. He dreamed of the open highway—the wind rushing against his helmet, the suffocating walls of the city disappearing behind him, going on a long drive where nobody could ask him about interviews or test scores, where for just a few hours he could feel truly free, untangled, and alive.",
      "Now, sitting in the shadows of that small room, even that modest dream felt like a distant, impossible fairy tale. He stared at his trembling hands and thought: Will I ever even reach that? Will I ever have a life of my own?",
      "Every single dream he had ever nurtured, from sports as a boy to a career in data, from love to a simple ride under the open sky, felt like it had been systematically crushed under an unbroken streak of terrible luck. It felt as though no matter how many hours he sat in front of the screen, no matter how many tears soaked his pillow, the universe had decided he was not allowed to have even an ordinary measure of happiness."
    ],
    image: {
      src: "/images/highway_motorcycle.jpg",
      alt: "Motorcycle parked on highway shoulder looking out towards misty twilight hills and open sky",
      caption: "The simple dream of an open road. A helmet, an engine hum, and an escape from suffocating walls."
    },
    readTime: "3 min read"
  },
  {
    id: "part-6",
    number: "Part VI",
    title: "The Phone Calls of Relatives and the Exiled Son",
    subtitle: "Celebrations that land like blows, and hiding behind bolted doors",
    pullQuote: "Hearing those words broke his spirit in half. He would bite his lip in the dark, clenching his jaw until his teeth ached, trying with all his might to keep his voice steady so they wouldn't hear him sobbing.",
    paragraphs: [
      "In an Indian household, bad news does not arrive quietly; it arrives disguised as the celebrations of other people.",
      "The sharpest cuts did not come from recruiters or strangers on the internet. They came through the family phone line. A relative would call—an aunt, an uncle, a distant cousin—ostensibly to exchange casual greetings, but with a thinly veiled intention to broadcast their triumph. “Our son just cleared an interview with an MNC.” “Our daughter received an offer letter today with a good package.”",
      "Every word of those calls landed like a physical blow on his parents’ chest. Sitting in that room hundreds of kilometers away, he could picture the scene at home with terrifying clarity: his father forcing a hollow, polite smile, congratulating a sibling or relative while his heart cracked in two; his mother holding the phone, her voice dropping into a quiet, painful silence, looking at the floor as the weight of comparison settled over the living room.",
      "And then, the inevitable follow-up call would come to his phone.",
      "His phone screen would light up with his parents' names. When he answered, the question was never asked with cruelty, but that made it infinitely worse. The trembling, hesitant inquiry in his mother’s voice: “What happened, son? Did you get any call today? Did anyone respond? Your cousin got an offer... their daughter is placed. Did you hear anything from anywhere?”",
      "Hearing those words broke his spirit in half. He would bite his lip in the dark, clenching his jaw until his teeth ached, trying with all his might to keep his voice steady so they wouldn't hear him sobbing. “No, Amma. Not yet. I am still applying.”",
      "The moment the call disconnected, the dam would collapse. He would throw the phone onto the bed, bury his face in his hands, and weep until he couldn't breathe. Why only me? he screamed silently into the dark walls. Why is it always me who has to carry the curse? He had sacrificed his childhood, abandoned his sports, spent nights bleeding over code, guided classmates across the finish line during campus drives—and yet every single relative’s child was celebrating while his parents had to hang their heads in sorrow. Seeing that grief in his parents' eyes, knowing that he was the reason they couldn't hold their heads high among their peers, felt like a slow, agonizing execution of his dignity.",
      "Society quickly became an open wound he could no longer bear to expose. Family gatherings, weddings, and functions became completely out of the question. He stopped going. He invented excuses, pleaded sickness, and stayed locked inside his room, choosing isolation over the public humiliation of facing the room.",
      "He knew what waited for him at any gathering. The casual smirk of an uncle sipping tea: “So, what are you doing now? Still searching? Haven't got anything yet?” And with that single question, his parents would be forced into an uncomfortable, apologizing silence, their eyes cast downward, humiliated because their educated son had no company name on his chest.",
      "He had become an exile—not by choice, but because the sight of his parents feeling small and embarrassed on his account was a torture he could not stomach. He stayed in the shadows, locked behind a bolted door, mourning the placements he missed by inches, drowning in the conviction that bad luck had branded his entire life, and asking the ceiling through breathless tears how a boy with so much love in his heart could end up feeling like the world's biggest burden."
    ],
    readTime: "4 min read"
  },
  {
    id: "part-7",
    number: "Part VII",
    title: "Seventeen Hours of Light and the Mask of Ash",
    subtitle: "Seventeen hours in front of glass, chronic blinding migraines, and fake smiles",
    pullQuote: "They had no idea. They couldn't see the silent tears falling onto the keyboard at 3 AM. They couldn't feel the iron vice crushing his temples.",
    paragraphs: [
      "The days had long collapsed into a singular, agonizing prison.",
      "Time was no longer measured by morning and evening; it was measured by the cold, unrelenting glare of a laptop screen. For seventeen hours every single day, he sat motionless, his fingers hovering over the keys, his bloodshot eyes fixed on application forms, code repositories, and job boards. Seventeen hours of refreshing inboxes that never answered. Seventeen hours of spiraling thoughts, overanalyzing every choice, dissecting every past interview, and silently begging the screen to produce a miracle that never arrived.",
      "For six continuous months, natural sleep had completely abandoned him. The silence of the night brought no rest—only an intensification of the nightmare. Every single day began not with the gentle return of morning, but with a dull, throbbing pressure behind his eyes that quickly expanded into a vicious, unyielding headache. From the moment he opened his eyes until the late, dark hours when exhaustion finally knocked him unconscious, his head felt like it was on the verge of detonating. The tension was constant, electric, and cruel. It was the physical manifest of months of bottled-up terror, unshed tears, and a nervous system that had been forced to run at maximum distress without a single second of peace.",
      "Around him, the emotional void was absolute. There was no true friend to message, no partner to confide in, nobody to whom he could say the simple truth: I am falling apart. He had to swallow every scream, lock every tear away, and seal the agony behind his teeth because there was no safe place to let it out.",
      "The cruelty peaked when he had to face his family. Whenever the phone rang or someone looked at him, he forced the most painful thing a human being can wear: a fake, hollow smile. He stretched his face into a performance of reassurance, pretending he was holding on, pretending he was fine, while inside his chest, his hope was completely turning to ash. He wanted so desperately to start something of his own—to build a business, to create a path with his own hands and stop begging an indifferent market for a chance—only to face the cold wall of reality: he had no assets, no capital, and no safety net to fall back on.",
      "When he reached his breaking point and begged for a pause—just a few days away, a brief journey, a trip to see the open sky and escape the suffocating walls that were killing his spirit—the response from home was another blow to his chest: “You are wasting time. You need to focus. You shouldn't be traveling when you don't have a job.”",
      "Those words felt like a stone dropped onto an already drowning man. They had no idea. They couldn't see the silent tears falling onto the keyboard at 3 AM. They couldn't feel the iron vice crushing his temples. They thought he was casually passing time, completely blind to the fact that he was fighting a desperate, quiet war just to keep his mind from snapping entirely. He was suffocating under the weight of their judgment, denied even the smallest mercy of a temporary breath of fresh air.",
      "He was trapped on every front: locked out of employment, unable to afford a new beginning, stripped of sleep, suffering through relentless headaches, and hiding a broken spirit behind a fabricated smile. He sat in the dark, weeping until his ribs ached, looking at his shaking hands and wondering what force was even keeping him breathing in an existence stripped of love, peace, and hope."
    ],
    image: {
      src: "/images/keyboard_chai_night.jpg",
      alt: "Hands on a laptop keyboard in a pitch-black room with cold tea and paper algorithm notes at 4 AM",
      caption: "Seventeen hours in front of glass. The physical manifest of an exhausted nervous system."
    },
    stat: {
      value: "17h",
      label: "Daily Screen Time",
      description: "Refreshing portals, debugging, and staring into algorithmic voids."
    },
    readTime: "4 min read"
  },
  {
    id: "part-8",
    number: "Part VIII",
    title: "Trembling Hands and the Stolen Sky",
    subtitle: "Panicking at ringtones, watching peers thrive, and holding on solely for family",
    pullQuote: "The only anchor that kept his feet tied to this earth was his family... Because of them, he stayed. Broken, weeping, but still choosing to stay.",
    paragraphs: [
      "The passage of time had lost all gentle meaning; it had become an erratic, terrifying blur.",
      "He looked at his hands resting on the edge of the desk. Whenever the phone screen lit up, those hands began to visibly shake. The vibration of a phone call was no longer a signal of connection; it was a trigger of pure panic. Was it another relative calling to boast? Was it his parents, asking the question he couldn't bear to answer? He stopped picking up. He watched the screen pulse silently against the wooden table, staring at the incoming names with paralyzed dread until the ringing stopped, leaving behind only the cold weight of guilt.",
      "Every day, the contrast between his existence and the rest of the world felt like a physical blow. When he looked outward, he saw people living the lives that had been completely denied to him. His college peers—the very ones he had once studied with and laughed beside—were not just working; they were making new circles, laughing at office dinners, packing bags for weekend getaways, and exploring the world. Others walked with their partners, holding hands under evening skies, sharing smiles that came effortlessly.",
      "Watching that from inside his isolation made his chest ache with a hollow, burning grief. What did I do to miss all of this? he thought through quiet tears. How did life flip from laughter to absolute ruin in just a matter of seconds? Graduation had not just concluded his studies; it had slammed the door on every single source of joy he had ever known.",
      "Day and night, he kept pushing himself. Even while drowning in exhaustion, he kept opening documentation, learning new frameworks, mastering tools, and submitting application after application. Yet every single morning and every single night delivered the same brutal feedback: automated rejection emails, empty inboxes, and deafening silence. It felt as though no amount of hard work could break through the curse of his misfortune. It made him feel as if his entire effort was being poured into a bottomless grave.",
      "He could feel his mind fraying at the edges. The relentless crying, the sleepless nights, the throbbing headaches, and the total lack of human warmth were pushing him dangerously close to a complete breakdown. He was desperate for a break—a long, quiet pause to simply breathe, walk under an open sky, and escape the four walls that felt like a cell. Yet there was no pause button, no trip, and no relief in sight.",
      "The only anchor that kept his feet tied to this earth was his family. Even when their expectations felt heavy, even when their questions broke his spirit, his love for them remained the single thread holding him back from vanishing into the dark. Because of them, he stayed. Because of them, he swallowed the screaming frustration of a life that felt entirely made of rejections.",
      "He sat in the quiet of midnight, his hands trembling, his vision blurred with tears, looking at a life that felt completely shattered by bad luck. And yet, amid the chaos and the heartbreak, that single anchor held: broken, weeping, but still choosing to stay."
    ],
    stat: {
      value: "6 Mos",
      label: "Chronic Insomnia",
      description: "Midnight panic, throbbing temples, and trembling hands."
    },
    readTime: "3 min read"
  },
  {
    id: "part-9",
    number: "Part IX",
    title: "Still Standing",
    subtitle: "The laptop never stayed closed. Bruised, exhausted, yet refusing to disappear",
    pullQuote: "The world may choose to judge him by a missing corporate badge, but the world does not see the war he fought simply to survive the night.",
    paragraphs: [
      "From the boy whose childhood games were locked away, to the student whose heart was broken, to the friend who was abandoned, to an isolated graduate sitting in the dark with a pounding head and shaking hands—the world had reduced his entire identity to a single binary status: unemployed.",
      "Yet, inside that dark room, beside the cold tea and the unopened job responses, there is a quiet truth that defies the tragedy.",
      "He never permanently closed the laptop.",
      "Even on nights when his vision was blurred by tears and his temples throbbed with pain, his hands still returned to the keyboard. When applications were rejected, he opened his code editors to debug broken dependencies. When the world refused to call, he learned new libraries, built interactive dashboards, and refined his technical portfolio.",
      "He is bruised, deeply tired, carrying the weight of unreturned love, vanished friendships, buried childhood passions, and the silence of an unforgiving job market. He has walked through months of profound loneliness and borne the searing guilt of being dependent on his parents.",
      "The story does not end with a miraculous offer letter or a tidy Hollywood conclusion, because real life does not resolve on cue. The job search is still happening. The silence has not completely lifted. But he woke up again today. He endured the panic, wiped his face, opened the terminal, and faced the screen once more.",
      "The world may choose to judge him by a missing corporate badge, but the world does not see the war he fought simply to survive the night. He is battered, exhausted, and carrying scars nobody can see.",
      "Yet, despite everything that tried to break him, he is still breathing.",
      "He is still standing."
    ],
    image: {
      src: "/images/still_standing_dawn.jpg",
      alt: "Man standing tall looking out at sunrise dawn over Hyderabad skyline",
      caption: "Dawn breaks over Hyderabad. Battered, exhausted, but still breathing. Still standing."
    },
    stat: {
      value: "0 Calls",
      label: "Still Enduring",
      description: "The terminal stayed open. He refused to disappear."
    },
    readTime: "2 min read"
  }
];

export const CRISIS_HELPLINES: HelplineResource[] = [
  {
    name: "Tele-MANAS (Govt. of India)",
    number: "14416 / 1800-891-4416",
    description: "24/7 Free Comprehensive Mental Health Tele-Helpline across all Indian languages.",
    available: "24 hours / 7 days a week, Toll-free",
    tel: "14416"
  },
  {
    name: "Vandrevala Foundation",
    number: "+91 9999 666 555",
    description: "24/7 Free, Confidential Professional Counseling & Crisis Support for distress and anxiety.",
    available: "24/7 Call & WhatsApp",
    tel: "+919999666555"
  },
  {
    name: "KIRAN Mental Health Helpline",
    number: "1800-599-0019",
    description: "Govt. of India helpline providing psychosocial support and anxiety management.",
    available: "24/7 Toll-free",
    tel: "18005990019"
  },
  {
    name: "AASRA Helpline",
    number: "+91 98204 66726",
    description: "Confidential emotional support and crisis intervention for individuals experiencing despair.",
    available: "24 hours a day",
    tel: "+919820466726"
  }
];
