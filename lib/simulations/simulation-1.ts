import type { SimulationData } from "./index"

export const simulation1: SimulationData = {
  id: 1,
  title: "Phishing dhe Email Security",
  description: "Mësoni të identifikoni emailet mashtruese dhe sulmet phishing",
  icon: "Mail",
  context: "Ju jeni teknik IT në laboratorin e shkollës dhe merrni emaile të ndryshme gjatë ditës.",
  steps: [
    {
      id: 1,
      type: "mesazh",
      location: "laborator",
      content:
        "Merrni një email nga 'admin@shkolle-elbasan.com' që kërkon të rivendosni fjalëkalimin duke klikuar një link. Adresa e vërtetë e shkollës është 'shkolla-elbasan.edu.al'. Entela Progri nga Server Room 1 ju njofton për këtë email të dyshimtë.",
      question: "Si do të veproni?",
      options: [
        { id: 1, text: "Klikoj linkun menjëherë", correct: false },
        { id: 2, text: "Ia dërgoj kolegëve për mendim", correct: false },
        { id: 3, text: "Kontrolloj adresën e dërguesit dhe e raportoj si phishing", correct: true },
        { id: 4, text: "Përgjigjem emailit për më shumë informacion", correct: false },
      ],
      explanation: "Adresa e dërguesit nuk përputhet me domenin zyrtar. Ky është një tentativë phishing.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      type: "situate",
      location: "security",
      content:
        "Bedri nga Security ju njofton se sistemi antivirus raporton një email me bashkëngjitje 'Raporti_Notave.pdf.exe' nga një adresë e panjohur. Alarmi tingëllon në zyrë.",
      question: "Çfarë veprimi merrni?",
      options: [
        { id: 1, text: "E karantinoj dhe e fshij emailin menjëherë", correct: true },
        { id: 2, text: "Hap bashkëngjitjen për të parë përmbajtjen", correct: false },
        { id: 3, text: "E ruaj në desktop për ta analizuar më vonë", correct: false },
        { id: 4, text: "E dërgoj tek administratori pa e karantinuar", correct: false },
      ],
      explanation: "Skedarët me zgjatje të dyfishtë (.pdf.exe) janë malware. Duhet të fshihen menjëherë.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      type: "tekst",
      location: "laborator",
      content:
        "Një nxënës ju tregon se ka marrë një SMS që thotë 'Llogaria juaj bankare është bllokuar. Klikoni këtu: bit.ly/xyz123'. Majlinda (Psikologe) vjen dhe sheh që nxënësi është i shqetësuar.",
      question: "Çfarë këshille i jepni nxënësit?",
      options: [
        { id: 1, text: "Ta klikojë linkun për të zhbllokuar llogarinë", correct: false },
        { id: 2, text: "Të përgjigjet SMS-it me fjalëkalimin e bankës", correct: false },
        { id: 3, text: "Të presë derisa të marrë email konfirmimi", correct: false },
        { id: 4, text: "Të telefonojë bankën në numrin zyrtar dhe të mos klikojë linkun", correct: true },
      ],
      explanation: "Bankat nuk kërkojnë informacion nëpërmjet SMS me linke të shkurtuara.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      type: "telefonata",
      location: "laborator",
      content:
        "Merrni një telefonatë nga dikush që pretendon të jetë nga 'Ministria e Arsimit' dhe kërkon qasje remote në server për 'përditësime të sistemit'. Drejtori Leonidha Haxhinikolla është në zyrën e tij.",
      question: "Si reagoni ndaj kësaj telefonata?",
      options: [
        { id: 1, text: "I jap qasje remote menjëherë", correct: false },
        { id: 2, text: "Mbyll telefonin dhe verifikoj me Ministrinë nëpërmjet kanaleve zyrtare", correct: true },
        { id: 3, text: "I jap fjalëkalimin e administratorit", correct: false },
        { id: 4, text: "E lidh me drejtorin pa verifikuar", correct: false },
      ],
      explanation: "Institucionet zyrtare nuk kërkojnë qasje remote nëpërmjet telefonatave të papritura.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      type: "ndodhi",
      location: "serveroom",
      content:
        "Gjatë inspektimit të serverit me Alda Jolldashi (Përgjegjëse Server Room 2), vëreni që është instaluar një program i panjohur 'RemoteAccess_v2.exe' pa autorizim. Dritat e serverit pulsojnë në mënyrë të çuditshme.",
      question: "Çfarë bëni menjëherë?",
      options: [
        { id: 1, text: "E lë programin sepse mund të jetë i dobishëm", correct: false },
        { id: 2, text: "E ristarton serverin dhe vazhdon punën", correct: false },
        { id: 3, text: "Shkëput serverin nga rrjeti, e skanoj dhe informoj administratorin", correct: true },
        { id: 4, text: "E fshij programin pa bërë backup", correct: false },
      ],
      explanation: "Programet e paautorizuara mund të jenë backdoors. Izolimi dhe skanimi janë hapat e parë.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      type: "mesazh",
      location: "laborator",
      content:
        "Merrni një email nga 'prize@google-winner.com' që thotë keni fituar 1 milion euro dhe duhet të dërgoni të dhënat e llogarisë bankare. Bukuroshe nga Financa ju pyet nëse duhet ta raportojë.",
      question: "Si veproni me këtë email?",
      options: [
        { id: 1, text: "E shënoj si spam dhe e fshij menjëherë", correct: true },
        { id: 2, text: "Dërgoj të dhënat për të marrë çmimin", correct: false },
        { id: 3, text: "Pyes kolegët nëse kanë fituar edhe ata", correct: false },
        { id: 4, text: "Klikoj linkun për të parë nëse është i vërtetë", correct: false },
      ],
      explanation: "Emailet që premtojnë çmime të mëdha pa pjesëmarrje janë gjithmonë mashtrime.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 7,
      type: "situate",
      location: "mikrotik",
      content:
        "Supervizori Juljan Kasapi ju thërret urgjent. Kontrolloni routerin MikroTik dhe vëreni që janë shtuar rregulla firewall të panjohura që lejojnë trafikun nga IP të huaja.",
      question: "Çfarë veprimi merrni?",
      options: [
        { id: 1, text: "I lë rregullat sepse mund të jenë nga ISP", correct: false },
        { id: 2, text: "Ristarton routerin dhe shpresoj që të zhduken", correct: false },
        { id: 3, text: "Pres derisa të ketë probleme me rrjetin", correct: false },
        { id: 4, text: "I fshij rregullat, ndërroj fjalëkalimin dhe kontrolloj logjet", correct: true },
      ],
      explanation: "Rregullat e paautorizuara tregojnë kompromitim. Ndërrimi i kredencialeve është i domosdoshëm.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 8,
      type: "pyetje",
      location: "security",
      content:
        "Xhet Kafexhiu (Menaxheri i Rrjeteve Sociale) ju pyet: 'A mund të përdor të njëjtin fjalëkalim për llogarinë e shkollës dhe llogarinë personale të Instagram?'",
      question: "Çfarë i përgjigjeni Xhetit?",
      options: [
        { id: 1, text: "Po, për ta mbajtur mend më lehtë", correct: false },
        { id: 2, text: "Jo, çdo llogari duhet të ketë fjalëkalim unik dhe të fortë", correct: true },
        { id: 3, text: "Po, por ta ndërrosh çdo javë", correct: false },
        { id: 4, text: "Varet nga sa e rëndësishme është llogaria", correct: false },
      ],
      explanation: "Ripërdorimi i fjalëkalimeve rrit rrezikun - nëse kompromutohet një llogari, rrezikohen të gjitha.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 9,
      type: "tekst",
      location: "ambjent",
      content:
        "Gjatë një prezantimi të Prof. Esmerald Suparaku, projektori shfaq një pop-up: 'Kompjuteri juaj ka 234 viruse! Klikoni këtu për të skanuar FALAS!' Alarmi i antivirusit fillon të tingëllojë.",
      question: "Çfarë bëni në këtë situatë?",
      options: [
        { id: 1, text: "Klikoj për të skanuar virusat", correct: false },
        { id: 2, text: "Shkëput kompjuterin nga rrjeti", correct: false },
        { id: 3, text: "Mbyll popup-in pa klikuar dhe skanoj me antivirusin e vërtetë", correct: true },
        { id: 4, text: "E ristarton kompjuterin", correct: false },
      ],
      explanation: "Popup-et scareware përdorin frikën për të mashtruar. Përdorni vetëm softuer antivirus legjitime.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 10,
      type: "ndodhi",
      location: "pajisje",
      content:
        "Entela Progri gjen një USB të panjohur në parkimin e shkollës me etiketën 'Nota_Finale_2024'. Ju e sjell për ta kontrolluar.",
      question: "Çfarë bëni me USB-në?",
      options: [
        { id: 1, text: "E dorëzoj tek IT pa e futur në asnjë pajisje", correct: true },
        { id: 2, text: "E fut në kompjuter për të parë përmbajtjen", correct: false },
        { id: 3, text: "E fut në kompjuterin personal në shtëpi", correct: false },
        { id: 4, text: "E hedh në kosh sepse nuk është e imja", correct: false },
      ],
      explanation: "USB të panjohura mund të përmbajnë malware. Mos i futni kurrë në pajisje pa skanim të izoluar.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ],
  testQuestions: [
    {
      id: 1,
      question: "Cili është treguesi kryesor i një emaili phishing?",
      options: [
        { id: 1, text: "Email i dërguar gjatë orarit të punës", correct: false },
        { id: 2, text: "Email me tekst të gjatë", correct: false },
        { id: 3, text: "Adresë dërguesi që nuk përputhet me organizatën që pretendon", correct: true },
        { id: 4, text: "Email pa bashkëngjitje", correct: false },
      ],
    },
    {
      id: 2,
      question: "Çfarë duhet të bëni kur merrni email me linkun 'Klikoni këtu për të verifikuar llogarinë'?",
      options: [
        { id: 1, text: "Klikoni linkun për të verifikuar", correct: false },
        { id: 2, text: "Përgjigjeni emailit duke pyetur nëse është i vërtetë", correct: false },
        { id: 3, text: "Dërgojeni emailin te miqtë për mendim", correct: false },
        { id: 4, text: "Shkoni drejtpërdrejt në website-in zyrtar pa përdorur linkun", correct: true },
      ],
    },
    {
      id: 3,
      question: "Pse janë të rrezikshme skedarët me zgjatje '.exe'?",
      options: [
        { id: 1, text: "Sepse janë skedarë të ekzekutueshëm që mund të përmbajnë malware", correct: true },
        { id: 2, text: "Sepse janë skedarë teksti", correct: false },
        { id: 3, text: "Sepse janë skedarë foto", correct: false },
        { id: 4, text: "Sepse janë skedarë muzike", correct: false },
      ],
    },
    {
      id: 4,
      question: "Çfarë është 'spear phishing'?",
      options: [
        { id: 1, text: "Phishing i përgjithshëm për të gjithë", correct: false },
        { id: 2, text: "Sulm phishing i personalizuar që synon individë specifike", correct: true },
        { id: 3, text: "Email spam i zakonshëm", correct: false },
        { id: 4, text: "Virus kompjuterik", correct: false },
      ],
    },
    {
      id: 5,
      question: "Si mund të verifikoni nëse një website është i sigurt?",
      options: [
        { id: 1, text: "Duke parë nëse ka foto të bukura", correct: false },
        { id: 2, text: "Duke parë nëse ngarkohet shpejt", correct: false },
        { id: 3, text: "Duke kontrolluar nëse URL fillon me 'https://' dhe ka certifikatë valide", correct: true },
        { id: 4, text: "Duke kontrolluar nëse ka reklama", correct: false },
      ],
    },
    {
      id: 6,
      question: "Çfarë duhet të bëni me emailet suspicious nga banka?",
      options: [
        { id: 1, text: "Fshijeni dhe telefononi bankën në numrin zyrtar", correct: true },
        { id: 2, text: "Përgjigjeni me të dhënat e llogarisë", correct: false },
        { id: 3, text: "Klikoni linkun për të verifikuar", correct: false },
        { id: 4, text: "Dërgojeni te miqtë", correct: false },
      ],
    },
    {
      id: 7,
      question: "Pse nuk duhet të hapni bashkëngjitje nga dërgues të panjohur?",
      options: [
        { id: 1, text: "Sepse janë skedarë të mëdhenj", correct: false },
        { id: 2, text: "Sepse marrin shumë kohë për tu shkarkuar", correct: false },
        { id: 3, text: "Sepse janë në format të gabuar", correct: false },
        { id: 4, text: "Sepse mund të përmbajnë malware ose viruse", correct: true },
      ],
    },
    {
      id: 8,
      question: "Çfarë është 'social engineering'?",
      options: [
        { id: 1, text: "Programim kompjuteri", correct: false },
        { id: 2, text: "Dizajn i rrjeteve sociale", correct: false },
        {
          id: 3,
          text: "Manipulim psikologjik për të bindur njerëzit të zbulojnë informacion konfidencial",
          correct: true,
        },
        { id: 4, text: "Instalim i softuerit", correct: false },
      ],
    },
    {
      id: 9,
      question: "Si duhet të raportoni një tentativë phishing?",
      options: [
        { id: 1, text: "Duke e injoruar", correct: false },
        { id: 2, text: "Duke informuar departamentin IT dhe duke shënuar emailin si phishing", correct: true },
        { id: 3, text: "Duke ia dërguar kolegëve", correct: false },
        { id: 4, text: "Duke u përgjigjur dërguesit", correct: false },
      ],
    },
    {
      id: 10,
      question: "Cila është mënyra më e sigurt për të qasur llogaritë online?",
      options: [
        { id: 1, text: "Duke klikuar linke në email", correct: false },
        { id: 2, text: "Duke përdorur bookmarks nga emailet", correct: false },
        { id: 3, text: "Duke përdorur kërkimin në Google", correct: false },
        { id: 4, text: "Duke shkruar drejtpërdrejt URL-në në browser", correct: true },
      ],
    },
  ],
  elaborationQuestion: {
    question:
      "Shpjegoni hapat që do të ndërmerni nëse dyshoni se keni rënë viktimë e një sulmi phishing. Përshkruani veprimet konkrete për të minimizuar dëmin.",
    keywords: [
      "fjalëkalim",
      "ndërro",
      "raportoj",
      "IT",
      "antivirus",
      "skanim",
      "llogari",
      "verifikim",
      "email",
      "link",
      "phishing",
      "izolim",
      "backup",
      "konfidencial",
      "bank",
    ],
  },
}
